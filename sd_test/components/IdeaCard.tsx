import React, { useState, ReactNode } from 'react';
import { Idea, BlockType, SandboxLaneId } from '../types';
import { Icons, ACCENT_COLOR } from '../constants.tsx';

interface IdeaCardProps {
  idea: Idea;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMove?: (id: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => void;
  customActions?: ReactNode;
  showBlockSpecifics?: boolean;
  backgroundColor?: string;
}

const ProgressBar: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs text-gray-600 mb-0.5">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="bg-gray-200 rounded-full h-2.5">
      <div 
        className="bg-green-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onEdit, onDelete, onMove, customActions, showBlockSpecifics = true, backgroundColor = 'bg-white' }) => {
  const [optionsOpen, setOptionsOpen] = useState(false);

  const getMaturityColor = (interest: number, value: number): string => {
    const maturity = (interest + value) / 2;
    if (maturity < 34) return 'bg-gray-100 border-gray-300'; // Light Gray
    if (maturity < 67) return 'bg-green-100 border-green-300'; // Light Green
    return 'bg-green-200 border-green-400'; // Bright Green
  };

  const getEngagementColor = (engagement: number): string => {
    if (engagement > 75) return 'bg-red-200 border-red-400'; // Bright Red
    if (engagement > 25) return 'bg-orange-100 border-orange-300'; // Pink/Orange
    return 'bg-green-200 border-green-400'; // Bright Green (default for low engagement)
  };
  
  let cardBgColor = backgroundColor;
  if (showBlockSpecifics) {
    if (idea.currentBlock === BlockType.INCUBATOR || idea.currentBlock === BlockType.ACCELERATOR) {
        cardBgColor = getMaturityColor(idea.interest, idea.value);
    } else if (idea.currentBlock === BlockType.SANDBOX && idea.sandboxLaneId === SandboxLaneId.PLAYING_WITH) {
        cardBgColor = getEngagementColor(idea.engagement);
    } else if (idea.currentBlock === BlockType.BACKLOG) {
        cardBgColor = 'bg-blue-100 border-blue-300'; // Differentiate Backlog
    } else if (idea.currentBlock === BlockType.PROJECTS) {
        cardBgColor = 'bg-purple-100 border-purple-300'; // Differentiate Projects
    }
  }


  return (
    <div className={`p-4 rounded-md shadow-md border ${cardBgColor} transition-colors duration-300`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{idea.title}</h3>
        <div className="relative">
          <button onClick={() => setOptionsOpen(!optionsOpen)} className="text-gray-500 hover:text-gray-700 p-1">
            {Icons.DOTS_VERTICAL()}
          </button>
          {optionsOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <ul className="py-1">
                <li><button onClick={() => { onEdit(idea.id); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">{Icons.EDIT("w-4 h-4 mr-2")} Edit</button></li>
                <li><button onClick={() => { onDelete(idea.id); setOptionsOpen(false); }} className={`w-full text-left px-4 py-2 text-sm ${ACCENT_COLOR} hover:bg-red-50 flex items-center`}>{Icons.TRASH("w-4 h-4 mr-2")} Delete</button></li>
                 {/* Simplified Move actions for demo */}
                {onMove && idea.currentBlock === BlockType.NAPKINS && (
                  <li><button onClick={() => { onMove(idea.id, BlockType.INCUBATOR); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Move to Incubator</button></li>
                )}
                {onMove && idea.currentBlock === BlockType.INCUBATOR && (
                  <>
                    <li><button onClick={() => { onMove(idea.id, BlockType.ACCELERATOR); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Work in Accelerator</button></li>
                    {idea.interest >= 67 && idea.value >= 67 && <li><button onClick={() => { onMove(idea.id, BlockType.BACKLOG); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Move to Backlog (Mature)</button></li>}
                  </>
                )}
                 {onMove && idea.currentBlock === BlockType.ACCELERATOR && (
                  <li><button onClick={() => { onMove(idea.id, BlockType.INCUBATOR); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Back to Incubator View</button></li>
                )}
                {onMove && idea.currentBlock === BlockType.BACKLOG && (
                  <li><button onClick={() => { onMove(idea.id, BlockType.SANDBOX, SandboxLaneId.TO_PLAY_WITH); setOptionsOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Move to Sandbox</button></li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-3 break-words whitespace-pre-line">{idea.description}</p>
      
      {showBlockSpecifics && (idea.currentBlock === BlockType.INCUBATOR || idea.currentBlock === BlockType.ACCELERATOR) && (
        <div className="space-y-2 mb-3">
          <ProgressBar value={idea.interest} label="Interest" />
          <ProgressBar value={idea.value} label="Value" />
        </div>
      )}

      {showBlockSpecifics && idea.currentBlock === BlockType.SANDBOX && (
         <div className="space-y-2 mb-3">
            <ProgressBar value={idea.engagement} label="Engagement" />
            <p className="text-xs text-gray-500">Lane: {idea.sandboxLaneId}</p>
         </div>
      )}

      {customActions && <div className="mt-3 pt-3 border-t border-gray-200">{customActions}</div>}

      <div className="text-xs text-gray-400 mt-2">
        Updated: {new Date(idea.updatedAt).toLocaleDateString()}
      </div>
    </div>
  );
};
