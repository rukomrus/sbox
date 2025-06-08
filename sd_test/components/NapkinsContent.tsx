
import React from 'react';
import { Idea, BlockType, SandboxLaneId } from '../types';
import { IdeaCard } from './IdeaCard';

interface NapkinsContentProps {
  ideas: Idea[];
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (id: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
}

export const NapkinsContent: React.FC<NapkinsContentProps> = ({ ideas, onEditIdea, onDeleteIdea, onMoveIdea }) => {
  if (ideas.length === 0) {
    return <p className="text-gray-500 italic">No ideas jotted down yet. Click the "+" button on this block to add one!</p>;
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
          backgroundColor="bg-yellow-50 border-yellow-200" // Napkin-like color
        />
      ))}
    </div>
  );
};
    