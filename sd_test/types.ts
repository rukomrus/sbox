
export enum BlockType {
  NAPKINS = 'Napkins',
  INCUBATOR = 'Incubator',
  ACCELERATOR = 'Accelerator',
  BACKLOG = 'Backlog',
  SANDBOX = 'Sandbox',
  PROJECTS = 'Projects',
}

export enum SandboxLaneId {
  TO_PLAY_WITH = 'toPlayWith',
  PLAYING_WITH = 'playingWith',
  IN_PROJECT = 'inProject',
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  currentBlock: BlockType;
  
  // Incubator specific
  interest: number; // 0-100
  value: number; // 0-100

  // Accelerator specific (stores links & notes for Incubator ideas)
  links: string[];
  notes: string[];
  
  // Sandbox specific
  engagement: number; // 0-100
  sandboxLaneId?: SandboxLaneId;

  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface SandboxLane {
  id: SandboxLaneId;
  title: string;
  ideaIds: string[];
}

export interface AppBlock {
  id: BlockType; // Using BlockType as ID for predefined blocks
  title: string;
  allowsAddingIdeas: boolean;
}

export type IdeasState = Record<string, Idea>;
export type SandboxState = Record<SandboxLaneId, SandboxLane>;

    