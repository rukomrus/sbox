import React, { useState, useEffect, FormEvent } from 'react';
import { Idea, BlockType } from '../types';
import { Icons, ACCENT_BG_COLOR } from '../constants.tsx';

interface IdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Idea, 'id' | 'createdAt' | 'updatedAt' | 'currentBlock' | 'interest' | 'value' | 'engagement' | 'links' | 'notes'> & Partial<Pick<Idea, 'interest' | 'value' | 'engagement' | 'links' | 'notes'>>, id?: string) => void;
  ideaToEdit?: Idea;
  targetBlock?: BlockType; // For "Add" mode
}

export const IdeaModal: React.FC<IdeaModalProps> = ({ isOpen, onClose, onSubmit, ideaToEdit, targetBlock }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // Specific fields for editing
  const [interest, setInterest] = useState(0);
  const [value, setValue] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [links, setLinks] = useState(''); // Comma-separated for input
  const [notes, setNotes] = useState(''); // Comma-separated for input (or use textarea)

  useEffect(() => {
    if (ideaToEdit) {
      setTitle(ideaToEdit.title);
      setDescription(ideaToEdit.description);
      setInterest(ideaToEdit.interest || 0);
      setValue(ideaToEdit.value || 0);
      setEngagement(ideaToEdit.engagement || 0);
      setLinks((ideaToEdit.links || []).join(', '));
      setNotes((ideaToEdit.notes || []).join('\\n')); // Use newline for notes textarea
    } else {
      setTitle('');
      setDescription('');
      setInterest(0);
      setValue(0);
      setEngagement(0);
      setLinks('');
      setNotes('');
    }
  }, [ideaToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const parsedLinks = links.split(',').map(l => l.trim()).filter(l => l);
    // For notes, it's a single string for description-like notes, or split if it's meant to be a list
    const parsedNotes = notes.split('\\n').map(n => n.trim()).filter(n => n);


    const baseData = { title, description };
    if (ideaToEdit) {
        onSubmit({ ...baseData, interest, value, engagement, links: parsedLinks, notes: parsedNotes }, ideaToEdit.id);
    } else {
        onSubmit({ ...baseData, interest, value, engagement, links: parsedLinks, notes: parsedNotes });
    }
    onClose(); // Close modal after submit
  };
  
  const isEditingAccelerator = ideaToEdit?.currentBlock === BlockType.ACCELERATOR;
  const isEditingIncubator = ideaToEdit?.currentBlock === BlockType.INCUBATOR;
  const isEditingSandbox = ideaToEdit?.currentBlock === BlockType.SANDBOX;


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {ideaToEdit ? 'Edit Idea' : `Add Idea to ${targetBlock || 'Block'}`}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              required
            />
          </div>

          {(isEditingIncubator || isEditingAccelerator) && (
            <>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700">Interest ({interest}%)</label>
                <input type="range" id="interest" min="0" max="100" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
              </div>
              <div>
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">Value ({value}%)</label>
                <input type="range" id="value" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
              </div>
            </>
          )}
          
          {isEditingAccelerator && (
            <>
              <div>
                <label htmlFor="links" className="block text-sm font-medium text-gray-700">Links (comma-separated)</label>
                <input type="text" id="links" value={links} onChange={(e) => setLinks(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (one per line)</label>
                <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm" />
              </div>
            </>
          )}

          {isEditingSandbox && (
            <div>
              <label htmlFor="engagement" className="block text-sm font-medium text-gray-700">Engagement ({engagement}%)</label>
              <input type="range" id="engagement" min="0" max="100" value={engagement} onChange={(e) => setEngagement(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
            </div>
          )}


          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white ${ACCENT_BG_COLOR} rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {ideaToEdit ? 'Save Changes' : 'Add Idea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
