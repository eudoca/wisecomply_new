import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, PlusIcon, CheckCircleIcon, ToggleLeftIcon, AlertTriangle, FileText, MessageSquare } from 'lucide-react';
import CaseList from '../components/disputes/CaseList';
import CaseDetails from '../components/disputes/CaseDetails';
import { Button } from '@/components/ui/button';
import { cn } from '../utils/cn';
import { DisputeCase } from '../types/dispute';
import AddDisputeForm from '../components/disputes/AddDisputeForm';
import { Tabs, Tab } from '../components/ui/Tabs';
import { DisputeActivityDashboard } from '../components/disputes/DisputeActivityDashboard';

// --- Child Component Placeholders ---
// Removed ViewManageDisputeModal placeholder definition
// --- End Placeholders ---

export const DisputesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all-cases');
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [disputes, setDisputes] = useState<DisputeCase[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [manageDisputes, setManageDisputes] = useState(true);
  // Removed isViewManageModalOpen state

  const tabs: Tab[] = [
    { id: 'all-cases', label: 'All Cases' },
    { id: 'disputes', label: 'Disputes' },
    { id: 'complaints', label: 'Complaints' },
    { id: 'pending', label: 'Pending' }, // Assumes a 'pending' status exists
    { id: 'resolved', label: 'Resolved' }, // Assumes mapped to 'closed' status
  ];

  // Removed handleAddCase and handleFilter placeholders (were just alerts)

  useEffect(() => {
    const loadedDisputes = localStorage.getItem('disputeCases');
    if (loadedDisputes) {
        setDisputes(JSON.parse(loadedDisputes));
    }
  }, []);

  // Handlers for Add modal
  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  // Renamed handler for selecting a case from the list
  const handleSelectCase = (caseId: string) => {
    const selected = disputes.find(c => c.id === caseId);
    if (selected) {
        setSelectedCase(selected);
    } else {
        console.error(`Case with ID ${caseId} not found.`);
        // Optionally show an error message to the user
    }
  };
  // Removed handleCloseViewManageModal

  const handleSaveNewCase = (newCase: DisputeCase) => {
    console.log('Saving new case:', newCase);
    const updatedDisputes = [...disputes, newCase];
    setDisputes(updatedDisputes);
    localStorage.setItem('disputeCases', JSON.stringify(updatedDisputes));
    handleCloseAddModal();
  };
  
  const handleUpdateCase = (update: Partial<DisputeCase>) => {
    // Runtime check for ID
    if (!update.id) {
      console.error("Update attempt failed: Missing case ID in partial update.");
      return;
    }
    console.log("Attempting to update case:", update);
    // We know update.id exists here due to the check above
    const caseIdToUpdate = update.id; 
    const updatedDisputes = disputes.map(c => 
      c.id === caseIdToUpdate ? { ...c, ...update } : c
    );
    setDisputes(updatedDisputes);
    localStorage.setItem('disputeCases', JSON.stringify(updatedDisputes));
    console.log("Dispute case updated in state:", updatedDisputes.find(c => c.id === caseIdToUpdate));
    // If updating status, also update the selectedCase state if it matches
    if (selectedCase?.id === caseIdToUpdate) {
      setSelectedCase(prev => (prev ? { ...prev, ...update } : null));
    }
  };

  // Placeholder handlers
  const handleNewDispute = () => {
    console.log('Creating new dispute...');
    alert('New dispute functionality not implemented yet.');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-purple-600">Disputes</h1>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button 
            size="sm" 
            onClick={handleNewDispute}
            leftIcon={<AlertTriangle className="h-4 w-4" />}
          >
            New Dispute
          </Button>
        </div>
      </div>
      
      {/* Blue information box */}
      <div className="mt-6 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p>
            This page helps you manage and track dispute resolution processes within your society.
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Process and track formal complaints</li>
            <li>Document dispute resolution outcomes</li>
            <li>Maintain records of all disputes and resolutions</li>
          </ul>
        </div>
      </div>

      {/* Dispute Activity Dashboard */}
      <div className="mb-6">
        <DisputeActivityDashboard />
      </div>

      {/* Disputes Management Toggle */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">I want WiseComply to manage disputes & complaints</h3>
            <p className="text-sm text-gray-500">Enable this option to use WiseComply for disputes and complaints tracking</p>
          </div>
          <div className="relative">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={manageDisputes}
                onChange={() => setManageDisputes(!manageDisputes)} 
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
                peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border 
                after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
            </label>
          </div>
        </div>
        
        {manageDisputes && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Disputes & complaints management is enabled. You can add, track, and resolve cases in WiseComply.
            </p>
          </div>
        )}
      </div>

      {/* Search and action buttons - only displayed if management is enabled */}
      {manageDisputes && (
        <div className="flex justify-end mb-4 gap-2">
          <div className="relative">
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              placeholder="Search cases..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
            />
          </div>
          <Button 
             variant="outline" 
             size="sm" 
             onClick={() => alert('Filter functionality not implemented yet.')}
             leftIcon={<FilterIcon className="h-4 w-4" />}
          >
            Filter
          </Button>
           <Button 
             size="sm" 
             onClick={handleOpenAddModal}
             leftIcon={<PlusIcon className="h-4 w-4" />}
           >
             Add Case
           </Button>
        </div>
      )}

      {/* Tabs and Content Area - Only display if disputes management is enabled */}
      {manageDisputes && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center">
            <Tabs
              activeTab={selectedTab}
              onTabChange={setSelectedTab}
              tabs={tabs}
            />
      </div>

        {selectedCase ? (
          <CaseDetails 
            caseId={selectedCase.id} 
            onBack={() => setSelectedCase(null)} 
            onUpdateCase={handleUpdateCase} 
          />
        ) : (
            <div className="p-6">
          <CaseList 
            cases={disputes} 
            onSelectCase={handleSelectCase} // Use the renamed handler
            filterTab={selectedTab} 
            searchQuery={searchQuery} 
          />
            </div>
        )}
      </div>
      )}

      {/* Display when disputes management is disabled */}
      {!manageDisputes && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <div className="flex justify-center">
            <ToggleLeftIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Disputes & Complaints Management Disabled</h3>
          <p className="mt-1 text-sm text-gray-500">
            You've chosen not to use WiseComply for disputes & complaints management. <br />
            Toggle the switch above to enable this feature.
          </p>
        </div>
      )}

      {/* Only Add Modal remains */}
      <AddDisputeForm isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSave={handleSaveNewCase} />
      {/* Removed ViewManageDisputeModal rendering */}

      {/* Disclaimers/Info Boxes - Always shown regardless of toggle state */}
      <div className="mt-8 p-4 border-l-4 border-yellow-400 bg-yellow-50">
        <h4 className="font-bold text-yellow-800">Important Considerations:</h4>
        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
            <li>Ensure you follow the principles of natural justice (fair hearing, impartiality).</li>
            <li>Handle all information confidentially and in accordance with the Privacy Act 2020.</li>
            <li>This tool helps record your process; it does not provide legal advice. Seek professional advice if needed.</li>
        </ul>
      </div>
    </div>
  );
};