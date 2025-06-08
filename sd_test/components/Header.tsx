import React from 'react';
import { APP_TITLE, Icons, ACCENT_COLOR, ACCENT_BG_COLOR } from '../constants.tsx';

interface HeaderProps {
  onAddIdea: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddIdea }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className={`mr-2 ${ACCENT_COLOR}`}>
              {Icons.LOGO("w-10 h-10")}
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">{APP_TITLE}</h1>
          </div>
          <button
            onClick={onAddIdea}
            className={`flex items-center px-4 py-2 ${ACCENT_BG_COLOR} text-white font-medium rounded-md hover:opacity-90 transition-opacity duration-150 shadow-sm`}
          >
            {Icons.PLUS("w-5 h-5 mr-2")}
            Add Idea
          </button>
        </div>
      </div>
    </header>
  );
};
