import React, { useState, useRef } from 'react';
import ConstitutionStatus from '../components/constitution/ConstitutionStatus';
import ConstitutionWizard, { CompletionStats } from '../components/constitution/ConstitutionWizard';
import { InfoIcon, HomeIcon, ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ConstitutionPage: React.FC = () => {
  // Add state for completion statistics
  const [completionStats, setCompletionStats] = useState<CompletionStats>({
    totalSectionsCompleted: 0,
    totalSections: 53,
    completedCompulsorySections: 0,
    totalCompulsorySections: 18, 
    overallPercentage: 0
  });
  
  // Create a ref to access the ConstitutionWizard methods
  const wizardRef = useRef<{
    openBlock: (blockNumber: number) => void;
  } | null>(null);

  // Handler for when completion statistics change
  const handleCompletionStatsChange = (stats: CompletionStats) => {
    setCompletionStats(stats);
  };
  
  // Handler for actions from the status component
  const handleStatusAction = (action: 'start' | 'continue' | 'download') => {
    if (!wizardRef.current) return;
    
    if (action === 'start') {
      // Open the first section
      wizardRef.current.openBlock(1);
      
      // Scroll to the wizard
      setTimeout(() => {
        document.querySelector('.constitution-wizard-container')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    } 
    else if (action === 'continue') {
      // Find the first incomplete section and open it
      const nextBlock = determineNextBlock();
      wizardRef.current.openBlock(nextBlock);
      
      // Scroll to the wizard
      setTimeout(() => {
        document.querySelector('.constitution-wizard-container')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
    else if (action === 'download') {
      console.log('Downloading constitution...');
      // Implement actual download logic here
    }
  };
  
  // Helper to determine which block to open next based on completion status
  const determineNextBlock = (): number => {
    // This is a simple implementation - in a real app, you would use the actual
    // completion data to determine which section needs attention next
    if (completionStats.completedCompulsorySections < completionStats.totalCompulsorySections) {
      // Find the first block with incomplete required fields
      // For now, we'll just return 1 as a placeholder
      return 1;
    }
    return 1; // Default to first block
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700">
              <HomeIcon className="w-4 h-4 mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-gray-600 md:ml-2 font-medium">Constitution</span>
            </div>
          </li>
        </ol>
      </nav>
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Constitution Builder
        </h1>
        <p className="text-base text-gray-600">
          Build your society's constitution step-by-step with our guided process to ensure compliance with the Incorporated Societies Act 2022.
        </p>
      </div>
      
      {/* Information box with improved guidance */}
      <div className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-200 flex">
        <div className="flex-shrink-0 mr-4">
          <InfoIcon className="h-6 w-6 text-blue-500" />
        </div>
        <div className="text-sm text-blue-800">
          <h2 className="font-medium text-blue-900 mb-2">How to use this builder</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Work through each section, completing all required fields marked with an asterisk (*).</li>
            <li>Use the section navigation above to jump between different parts of your constitution.</li>
            <li>Your progress is saved automatically as you go.</li>
            <li>Once all required fields are complete, you can download your final constitution.</li>
          </ol>
          <p className="mt-2 font-medium">
            Need help? Click the floating help button at any time for guidance.
          </p>
        </div>
      </div>
      
      <div className="space-y-8">
        <ConstitutionStatus 
          completionStats={completionStats} 
          onActionClick={handleStatusAction}
        />
        
        {/* ConstitutionWizard with improved container styling */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm constitution-wizard-container">
          <ConstitutionWizard 
            ref={wizardRef}
            onCompletionStatsChange={handleCompletionStatsChange} 
          /> 
        </div>
      </div>
    </div>
  );
};

// export default ConstitutionPage; // Optional default export 