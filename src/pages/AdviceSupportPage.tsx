import React from 'react';
import { KnowledgeBase } from '../components/advice/KnowledgeBase';
import { AdviceNavigation } from '../components/advice/Navigation';

export const AdviceSupportPage: React.FC = () => {
  // Replicate the layout structure from the original advice and support/src/App.tsx
  return (
    <div className="flex flex-col h-full">
      {/* 
        No specific header was in the original App.tsx for advice, 
        assuming header comes from DashboardLayout. 
        If a specific header is needed, it can be added here. 
      */}
      <div className="flex-1 flex overflow-hidden">
        {/* 
          Render the specific AdviceNavigation if needed, or remove if 
          the main DashboardLayout navigation is sufficient. 
          For now, let's assume we want its specific menu.
        */}
        {/* <AdviceNavigation /> */}{/* Commenting out for now, might be redundant */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {/* Render the main content component */}
          <KnowledgeBase />
        </main>
      </div>
    </div>
  );
}; 