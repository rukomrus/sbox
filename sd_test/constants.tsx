
import React from 'react';
import { BlockType, SandboxLaneId, AppBlock } from './types';

export const APP_TITLE = "_startsdash";
export const ACCENT_COLOR = "text-red-600"; // Example: creactivitat red
export const ACCENT_BG_COLOR = "bg-red-600";
export const ACCENT_BORDER_COLOR = "border-red-600";

export const INITIAL_BLOCKS: AppBlock[] = [
  { id: BlockType.NAPKINS, title: 'Napkins', allowsAddingIdeas: true },
  { id: BlockType.INCUBATOR, title: 'Incubator', allowsAddingIdeas: false },
  { id: BlockType.ACCELERATOR, title: 'Accelerator', allowsAddingIdeas: false },
  { id: BlockType.BACKLOG, title: 'Backlog', allowsAddingIdeas: false },
  { id: BlockType.SANDBOX, title: 'Sandbox', allowsAddingIdeas: false },
  { id: BlockType.PROJECTS, title: 'Projects', allowsAddingIdeas: false },
];

export const SANDBOX_LANES_CONFIG: { id: SandboxLaneId, title: string }[] = [
    { id: SandboxLaneId.TO_PLAY_WITH, title: 'To Play With' },
    { id: SandboxLaneId.PLAYING_WITH, title: 'Playing With' },
    { id: SandboxLaneId.IN_PROJECT, title: 'In Project' },
];

// Placeholder for icons (SVG paths)
export const Icons = {
  PLUS: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path fillRule="evenodd" d="M10 3.5a.75.75 0 01.75.75v5h5a.75.75 0 010 1.5h-5v5a.75.75 0 01-1.5 0v-5h-5a.75.75 0 010-1.5h5v-5A.75.75 0 0110 3.5z" clipRule="evenodd" /></svg>,
  EDIT: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>,
  TRASH: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.19-2.34.336a.75.75 0 00-.5.694v1.293c-.789.954-1.158 2.144-1.158 3.482V15.5A2.5 2.5 0 004.5 18h11a2.5 2.5 0 002.5-2.5V10c0-1.338-.369-2.528-1.158-3.482V5.223a.75.75 0 00-.5-.694 48.883 48.883 0 00-2.34-.336V3.75A2.75 2.75 0 0011.25 1h-2.5zM7.5 3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25v.5H7.5v-.5zm-1.43 2.296C6.625 6.017 7.26 6 8 6h4c.74 0 1.374.017 1.93.046a.75.75 0 00.57-.73V4.25H7.5v1.316a.75.75 0 00.57.73zM15.5 10v5.5a1 1 0 01-1 1h-11a1 1 0 01-1-1V10c0-.987.316-1.927.87-2.676h11.26c.554.749.87 1.689.87 2.676z" clipRule="evenodd" /></svg>,
  CHEVRON_DOWN: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>,
  ARROW_RIGHT: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>,
  DOTS_VERTICAL: (className?: string) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}><path d="M10 3.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM10 8.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM10 13.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" /></svg>,
  LOGO: (className?: string) => <svg className={className || "w-8 h-8"} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="10"/><path d="M30 70L50 30L70 70" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};
