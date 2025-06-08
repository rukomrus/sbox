import React from 'react';
import { Idea, SandboxLane, SandboxLaneId, BlockType, IdeasState, SandboxState } from '../types';
import { IdeaCard } from './IdeaCard';
import { Icons, SANDBOX_LANES_CONFIG } from '../constants.tsx';

interface SandboxContentProps {
  sandboxLanes: SandboxState;
  allIdeas: IdeasState;
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (ideaId: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
  onUpdateIdea: (ideaId: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => void;
}

export const SandboxContent: React.FC<SandboxContentProps> = ({ sandboxLanes, allIdeas, onEditIdea, onDeleteIdea, onMoveIdea, onUpdateIdea }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, ideaId: string) => {
    e.dataTransfer.setData("ideaId", ideaId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetLaneId: SandboxLaneId) => {
    e.preventDefault();
    const ideaId = e.dataTransfer.getData("ideaId");
    const idea = allIdeas[ideaId];
    if (idea && idea.sandboxLaneId !== targetLaneId) {
      onMoveIdea(ideaId, BlockType.SANDBOX, targetLaneId);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };
  
  const totalIdeasInSandbox = Object.values(sandboxLanes).reduce((sum, lane) => sum + lane.ideaIds.length, 0);
  if (totalIdeasInSandbox === 0) {
      return <p className="text-gray-500 italic">Sandbox is empty. Move ideas from the Backlog to start working on them.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {SANDBOX_LANES_CONFIG.map(laneConfig => {
        const lane = sandboxLanes[laneConfig.id];
        if (!lane) return null; // Should not happen with current setup

        const ideasInLane = lane.ideaIds.map(id => allIdeas[id]).filter(Boolean);
        
        return (
          <div 
            key={lane.id} 
            className="bg-gray-100 rounded-lg p-4 min-h-[300px] flex flex-col"
            onDrop={(e) => handleDrop(e, lane.id)}
            onDragOver={handleDragOver}
          >
            <h4 className="text-lg font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-300">{lane.title} ({ideasInLane.length})</h4>
            <div className="space-y-4 flex-grow">
              {ideasInLane.map(idea => (
                <div key={idea.id} draggable onDragStart={(e) => handleDragStart(e, idea.id)}>
                  <IdeaCard
                    idea={idea}
                    onEdit={onEditIdea}
                    onDelete={onDeleteIdea}
                    // onMove is handled by D&D or specific actions if needed
                    showBlockSpecifics={true}
                    customActions={
                      lane.id === SandboxLaneId.PLAYING_WITH && idea.id &&
                      <button 
                        onClick={() => onMoveIdea(idea.id, BlockType.PROJECTS)} 
                        className="mt-2 w-full text-sm flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md shadow-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Move to Projects {Icons.ARROW_RIGHT("ml-1 w-4 h-4")}
                      </button>
                    }
                  />
                </div>
              ))}
              {ideasInLane.length === 0 && <p className="text-sm text-gray-400 italic text-center pt-10">Drag ideas here</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
