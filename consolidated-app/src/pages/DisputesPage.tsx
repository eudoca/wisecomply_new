import React, { useState } from 'react';
import { SearchIcon, FilterIcon, PlusCircleIcon } from 'lucide-react';
import CaseList from '../components/disputes/CaseList';
import CaseDetails from '../components/disputes/CaseDetails';
import { Button } from '../components/ui/Button';
import { cn } from '../utils/cn';

export const DisputesPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all-cases');
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all-cases', label: 'All Cases' },
    { id: 'disputes', label: 'Disputes' },
    { id: 'complaints', label: 'Complaints' },
    { id: 'pending', label: 'Pending' },
    { id: 'resolved', label: 'Resolved' },
  ];

  const handleAddCase = () => alert('Add New Case functionality not implemented yet.');
  const handleFilter = () => alert('Filter functionality not implemented yet.');

  return (
    <div className="max-w-7xl mx-auto">
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
          <Button 
             variant="outline" 
             size="sm" 
             onClick={handleFilter}
             leftIcon={<FilterIcon className="h-4 w-4" />}
          >
            Filter
          </Button>
           <Button 
             size="sm" 
             onClick={handleAddCase}
             leftIcon={<PlusCircleIcon className="h-4 w-4" />}
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
          <CaseDetails caseId={selectedCase} onBack={() => setSelectedCase(null)} />
        ) : (
          <CaseList onSelectCase={setSelectedCase} filterTab={selectedTab} searchQuery={searchQuery} />
        )}
      </div>
    </div>
  );
}; 