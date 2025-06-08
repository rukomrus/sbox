
import React from 'react';
import { Idea, BlockType, SandboxLaneId, IdeasState } from '../types';
import { IdeaCard } from './IdeaCard';

interface AcceleratorContentProps {
  ideas: Idea[]; // These are ideas explicitly in 'Accelerator' block type
  allIdeas: IdeasState; // To access Incubator ideas if needed
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (id: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
  onUpdateIdea: (ideaId: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => void;
}

export const AcceleratorContent: React.FC<AcceleratorContentProps> = ({ ideas, onEditIdea, onDeleteIdea, onMoveIdea, onUpdateIdea }) => {
   // According to the brief, Accelerator is for collecting info on Incubator ideas.
   // An idea is in both. For this UI, we show ideas marked as 'Accelerator'.
   // A more complex model might show Incubator ideas here with specific Accelerator UI.

  if (ideas.length === 0) {
    return <p className="text-gray-500 italic">No ideas actively in acceleration. Move an Incubator idea here to add links/notes.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {ideas.map(idea => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onEdit={onEditIdea} 
          onDelete={onDeleteIdea}
          onMove={onMoveIdea}
          showBlockSpecifics={true} // Shows Interest/Value from its underlying Incubator nature
          customActions={
            <div className="mt-2 space-y-1 text-xs">
              {idea.links.length > 0 && <div><strong>Links:</strong> {idea.links.join(', ')}</div>}
              {idea.notes.length > 0 && <div><strong>Notes:</strong> {idea.notes.join('; ')}</div>}
              {(idea.links.length === 0 && idea.notes.length === 0) && <p className="text-gray-400">Edit to add links/notes.</p>}
            </div>
          }
        />
      ))}
    </div>
  );
};
    