
import React from 'react';
import { Idea, BlockType } from '../types';
import { IdeaCard } from './IdeaCard';

interface ProjectsContentProps {
  ideas: Idea[];
  onEditIdea: (id: string) => void;
  onDeleteIdea: (id: string) => void;
  onMoveIdea: (id: string, targetBlock: BlockType) => void;
}

export const ProjectsContent: React.FC<ProjectsContentProps> = ({ ideas, onEditIdea, onDeleteIdea, onMoveIdea }) => {
  if (ideas.length === 0) {
    return <p className="text-gray-500 italic">No completed projects yet. Finish ideas in the Sandbox to see them here.</p>;
  }
  return (
    <div className="space-y-4">
      {ideas.map(idea => (
        <IdeaCard 
          key={idea.id} 
          idea={idea} 
          onEdit={onEditIdea} 
          onDelete={onDeleteIdea}
          // No onMove from Projects in this version
          showBlockSpecifics={false}
          backgroundColor="bg-purple-50 border-purple-200"
        />
      ))}
    </div>
  );
};
    