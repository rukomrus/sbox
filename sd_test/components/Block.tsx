import React, { useState, ReactNode } from 'react';
import { Icons, ACCENT_COLOR } from '../constants.tsx';

interface BlockProps {
  title: string;
  children: ReactNode;
  showAddButton?: boolean;
  onAddClick?: () => void;
  defaultOpen?: boolean;
}

export const Block: React.FC<BlockProps> = ({ title, children, showAddButton, onAddClick, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="bg-white rounded-lg shadow-lg overflow-hidden">
      <header 
        className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
        <div className="flex items-center space-x-3">
          {showAddButton && onAddClick && (
            <button
              onClick={(e) => { e.stopPropagation(); onAddClick(); }}
              className={`p-1 rounded-full ${ACCENT_COLOR} hover:bg-red-100 transition-colors`}
              aria-label={`Add to ${title}`}
            >
              {Icons.PLUS("w-6 h-6")}
            </button>
          )}
          <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}>
            {Icons.CHEVRON_DOWN("w-7 h-7 text-gray-500")}
          </span>
        </div>
      </header>
      {isOpen && (
        <div className="p-4 sm:p-6">
          {children}
        </div>
      )}
    </section>
  );
};
