
import React from 'react';
import { Idea, BlockType, SandboxLaneId } from '../types';
import { IdeaCard } from './IdeaCard';

interface BacklogContentProps {
  ideas: Idea[];
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (id: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
}

export const BacklogContent: React.FC<BacklogContentProps> = ({ ideas, onEditIdea, onDeleteIdea, onMoveIdea }) => {
  if (ideas.length === 0) {
    return <p className="text-gray-500 italic">Backlog is empty. Mature ideas from the Incubator will appear here.</p>;
  }
  return (
    <div className="space-y-4">
      {ideas.map(idea => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onEdit={onEditIdea} 
          onDelete={onDeleteIdea}
          onMove={onMoveIdea}
          showBlockSpecifics={false} // Or specific backlog display
          backgroundColor="bg-blue-50 border-blue-200"
        />
      ))}
    </div>
  );
};
    