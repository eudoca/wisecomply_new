import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, PlusIcon } from 'lucide-react';
import CaseList from '../components/disputes/CaseList';
import CaseDetails from '../components/disputes/CaseDetails';
import { Button } from '@/components/ui/button';
import { cn } from '../utils/cn';
import { DisputeCase } from '../types/dispute';
import AddDisputeForm from '../components/disputes/AddDisputeForm';

// --- Child Component Placeholders ---
// Removed ViewManageDisputeModal placeholder definition
// --- End Placeholders ---

export const DisputesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all-cases');
  const [selectedCase, setSelectedCase] = useState<DisputeCase | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [disputes, setDisputes] = useState<DisputeCase[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // Removed isViewManageModalOpen state

  const tabs = [
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

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dispute & Complaints Management
          </h1>
          <p className="mt-1 text-gray-600">
            Manage, track, and resolve disputes and complaints within your organisation
          </p>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
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
          {/* Filter button currently doesn't do anything */}
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
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
                  selectedTab === tab.id
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                )}
                aria-current={selectedTab === tab.id ? 'page' : undefined}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        {selectedCase ? (
          <CaseDetails 
            caseId={selectedCase.id} 
            onBack={() => setSelectedCase(null)} 
            onUpdateCase={handleUpdateCase} 
          />
        ) : (
          <CaseList 
            cases={disputes} 
            onSelectCase={handleSelectCase} // Use the renamed handler
            filterTab={selectedTab} 
            searchQuery={searchQuery} 
          />
        )}
      </div>

      {/* Only Add Modal remains */}
      <AddDisputeForm isOpen={isAddModalOpen} onClose={handleCloseAddModal} onSave={handleSaveNewCase} />
      {/* Removed ViewManageDisputeModal rendering */}

      {/* Disclaimers/Info Boxes */}
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