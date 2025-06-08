
import React from 'react';
import { Idea, BlockType, SandboxLaneId } from '../types';
import { IdeaCard } from './IdeaCard';

interface IncubatorContentProps {
  ideas: Idea[];
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (id: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
  onUpdateIdea: (ideaId: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => void;
}

export const IncubatorContent: React.FC<IncubatorContentProps> = ({ ideas, onEditIdea, onDeleteIdea, onMoveIdea, onUpdateIdea }) => {
  if (ideas.length === 0) {
    return <p className="text-gray-500 italic">No ideas in the incubator. Move some from "Napkins" or create ideas that start here.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.map(idea => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onEdit={onEditIdea} 
          onDelete={onDeleteIdea}
          onMove={onMoveIdea}
          showBlockSpecifics={true}
        />
      ))}
    </div>
  );
};
    