import React, { useState, useCallback, ReactNode } from 'react';
import { BlockType, Idea, IdeasState, AppBlock, SandboxState, SandboxLaneId, SandboxLane } from './types';
import { INITIAL_BLOCKS, APP_TITLE, Icons, SANDBOX_LANES_CONFIG, ACCENT_COLOR } from './constants.tsx';
import { Header } from './components/Header';
import { Block } from './components/Block';
import { NapkinsContent } from './components/NapkinsContent';
import { IncubatorContent } from './components/IncubatorContent';
import { AcceleratorContent } from './components/AcceleratorContent';
import { BacklogContent } from './components/BacklogContent';
import { SandboxContent } from './components/SandboxContent';
import { ProjectsContent } from './components/ProjectsContent';
import { IdeaModal } from './components/IdeaModal';

// Simple ID generator
const generateId = (): string => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [ideas, setIdeas] = useState<IdeasState>({
    // Sample ideas
    'idea1': { id: 'idea1', title: 'Sustainable packaging for e-commerce', description: 'Develop eco-friendly packaging solutions.', currentBlock: BlockType.NAPKINS, interest: 0, value: 0, links: [], notes: [], engagement: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    'idea2': { id: 'idea2', title: 'AI-powered language learning app', description: 'An app that uses AI to personalize language lessons.', currentBlock: BlockType.INCUBATOR, interest: 60, value: 70, links: ['http://example.com/ai-research'], notes: ['Focus on conversational AI'], engagement: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    'idea3': { id: 'idea3', title: 'Community garden network platform', description: 'Platform to connect local gardeners and share resources.', currentBlock: BlockType.ACCELERATOR, interest: 80, value: 75, links: [], notes: [], engagement: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }, // Also implicitly in Incubator
    'idea4': { id: 'idea4', title: 'Personalized news aggregator (Mature)', description: 'Aggregates news based on deep user preferences.', currentBlock: BlockType.BACKLOG, interest: 90, value: 85, links: [], notes: [], engagement: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    'idea5': { id: 'idea5', title: 'Trello Clone - MVP', description: 'Building a simple Kanban board.', currentBlock: BlockType.SANDBOX, sandboxLaneId: SandboxLaneId.TO_PLAY_WITH, interest: 0, value: 0, links: [], notes: [], engagement: 30, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  });

  const [sandboxLanes, setSandboxLanes] = useState<SandboxState>(() => {
    const initialLanes: Partial<SandboxState> = {};
    SANDBOX_LANES_CONFIG.forEach(laneConfig => {
        initialLanes[laneConfig.id] = { ...laneConfig, ideaIds: [] };
    });
    // Populate initial ideas into sandbox lanes
    Object.values(ideas).filter(idea => idea.currentBlock === BlockType.SANDBOX && idea.sandboxLaneId).forEach(idea => {
        if (initialLanes[idea.sandboxLaneId!]) {
            initialLanes[idea.sandboxLaneId!]!.ideaIds.push(idea.id);
        }
    });
    return initialLanes as SandboxState;
  });
  
  const [modalState, setModalState] = useState<{ type: 'add'; blockType: BlockType } | { type: 'edit'; ideaId: string } | null>(null);

  const getIdeasForBlock = useCallback((blockType: BlockType): Idea[] => {
    return Object.values(ideas).filter(idea => idea.currentBlock === blockType).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [ideas]);

  const handleAddIdea = (ideaData: Omit<Idea, 'id' | 'createdAt' | 'updatedAt' | 'currentBlock' | 'interest' | 'value' | 'engagement' | 'links' | 'notes'>, targetBlock: BlockType) => {
    const newId = generateId();
    const newIdea: Idea = {
      ...ideaData,
      id: newId,
      currentBlock: targetBlock,
      interest: 0,
      value: 0,
      links: [],
      notes: [],
      engagement: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setIdeas(prev => ({ ...prev, [newId]: newIdea }));
    setModalState(null);
  };

  const handleUpdateIdea = (ideaId: string, updates: Partial<Omit<Idea, 'id' | 'createdAt'>>) => {
    setIdeas(prev => ({
      ...prev,
      [ideaId]: { ...prev[ideaId], ...updates, updatedAt: new Date().toISOString() },
    }));
    setModalState(null);
  };

  const handleDeleteIdea = (ideaId: string) => {
    const { [ideaId]: _, ...rest } = ideas; // eslint-disable-line @typescript-eslint/no-unused-vars
    setIdeas(rest);
    // Also remove from sandbox lanes if present
    setSandboxLanes(prevLanes => {
        const newLanes = { ...prevLanes };
        for (const laneId in newLanes) {
            newLanes[laneId as SandboxLaneId] = {
                ...newLanes[laneId as SandboxLaneId],
                ideaIds: newLanes[laneId as SandboxLaneId].ideaIds.filter(id => id !== ideaId),
            };
        }
        return newLanes;
    });
  };
  
  const moveIdea = (ideaId: string, targetBlock: BlockType, targetSandboxLaneId?: SandboxLaneId) => {
    const idea = ideas[ideaId];
    if (!idea) return;

    const updates: Partial<Idea> = { currentBlock: targetBlock, updatedAt: new Date().toISOString() };
    let newSandboxLanes = { ...sandboxLanes };

    // Remove from old sandbox lane
    if (idea.currentBlock === BlockType.SANDBOX && idea.sandboxLaneId) {
        const currentLane = newSandboxLanes[idea.sandboxLaneId];
        if (currentLane) {
            newSandboxLanes[idea.sandboxLaneId] = {
                ...currentLane,
                ideaIds: currentLane.ideaIds.filter(id => id !== ideaId)
            };
        }
    }
    
    // Add to new sandbox lane
    if (targetBlock === BlockType.SANDBOX && targetSandboxLaneId) {
        updates.sandboxLaneId = targetSandboxLaneId;
        const targetLane = newSandboxLanes[targetSandboxLaneId];
        if (targetLane && !targetLane.ideaIds.includes(ideaId)) {
             newSandboxLanes[targetSandboxLaneId] = {
                ...targetLane,
                ideaIds: [...targetLane.ideaIds, ideaId]
            };
        }
    } else {
        updates.sandboxLaneId = undefined; // Clear sandboxLane if not moving to Sandbox
    }

    // Logic for Accelerator and Incubator interactions
    // If idea moves from Incubator to Backlog, it's "mature"
    if (idea.currentBlock === BlockType.INCUBATOR && targetBlock === BlockType.BACKLOG) {
        // Idea considered "graduated", effectively removed from Accelerator's scope
        // No explicit state change for Accelerator if it's just a view on Incubator ideas.
    }
    
    // An idea moving to Accelerator means it is primarily in Incubator but actively worked on in Accelerator
    // For simplicity, we'll mark it as Accelerator BlockType, but it's linked to Incubator logic
    if (targetBlock === BlockType.ACCELERATOR && idea.currentBlock !== BlockType.INCUBATOR) {
        // This move implies it should first be in Incubator conceptually
        // For this demo, let's assume it's moved from Incubator, or it's a special case
        // where Accelerator directly takes an idea (not per spec, but to make it appear in the block)
    }


    setIdeas(prev => ({ ...prev, [ideaId]: { ...prev[ideaId], ...updates } }));
    setSandboxLanes(newSandboxLanes);
  };


  const openModal = (type: 'add', blockType: BlockType) => setModalState({ type, blockType });
  const openEditModal = (ideaId: string) => setModalState({ type: 'edit', ideaId });
  const closeModal = () => setModalState(null);


  const renderBlockContent = (block: AppBlock): ReactNode => {
    const blockIdeas = getIdeasForBlock(block.id);
    const commonProps = { ideas: blockIdeas, onEditIdea: openEditModal, onDeleteIdea: handleDeleteIdea, onMoveIdea: moveIdea };

    switch (block.id) {
      case BlockType.NAPKINS:
        return <NapkinsContent {...commonProps} />;
      case BlockType.INCUBATOR:
        return <IncubatorContent {...commonProps} onUpdateIdea={handleUpdateIdea} />;
      case BlockType.ACCELERATOR:
        // Accelerator works on ideas that are conceptually in Incubator or directly assigned to Accelerator
        // For simplicity, showing ideas marked as 'Accelerator'. In a deeper model, it might filter Incubator ideas.
        return <AcceleratorContent {...commonProps} allIdeas={ideas} onUpdateIdea={handleUpdateIdea} />;
      case BlockType.BACKLOG:
        return <BacklogContent {...commonProps} />;
      case BlockType.SANDBOX:
        return <SandboxContent sandboxLanes={sandboxLanes} allIdeas={ideas} onEditIdea={openEditModal} onDeleteIdea={handleDeleteIdea} onMoveIdea={moveIdea} onUpdateIdea={handleUpdateIdea} />;
      case BlockType.PROJECTS:
        return <ProjectsContent {...commonProps} />;
      default:
        return <p>Unsupported block type.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0efe8]">
      <Header onAddIdea={() => openModal('add', BlockType.NAPKINS)} />
      
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {INITIAL_BLOCKS.map((block) => (
          <Block 
            key={block.id} 
            title={block.title} 
            showAddButton={block.allowsAddingIdeas}
            onAddClick={block.allowsAddingIdeas ? () => openModal('add', block.id) : undefined}
          >
            {renderBlockContent(block)}
          </Block>
        ))}
      </main>

      {modalState && (
        <IdeaModal
          isOpen={!!modalState}
          onClose={closeModal}
          onSubmit={modalState.type === 'add' ? (data) => handleAddIdea(data, modalState.blockType) : (data, id) => handleUpdateIdea(id!, data)}
          ideaToEdit={modalState.type === 'edit' ? ideas[modalState.ideaId] : undefined}
          targetBlock={modalState.type === 'add' ? modalState.blockType : undefined}
        />
      )}

      <footer className="text-center p-4 text-gray-500 text-sm border-t border-gray-300">
        <p>&copy; {new Date().getFullYear()} {APP_TITLE}. Inspired by creactivitat.com style.</p>
      </footer>
    </div>
  );
};

export default App;
