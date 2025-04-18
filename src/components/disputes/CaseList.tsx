import React, { useMemo } from 'react';
import { AlertCircleIcon, ChevronRightIcon } from 'lucide-react';
import StatusBadge from './StatusBadge'; // Import from same directory

interface Case {
  id: string;
  title: string;
  type: 'complaint' | 'dispute';
  priority: 'high' | 'medium' | 'low';
  status: 'investigation' | 'pending' | 'resolved';
  submittedBy: string;
  submittedAgainst: string;
  openedDate: string;
}

interface CaseListProps {
  onSelectCase: (caseId: string) => void;
  filterTab: string; // Added filterTab prop
  searchQuery: string; // Added searchQuery prop
}

// Sample data - replace with actual data fetching later
const cases: readonly Case[] = [
  {
    id: '1',
    title: 'Committee Election Process Complaint',
    type: 'complaint',
    priority: 'high',
    status: 'investigation',
    submittedBy: 'Robert Chen',
    submittedAgainst: 'Executive Committee',
    openedDate: '10/03/2025',
  },
  {
    id: '2',
    title: 'Membership Fee Dispute',
    type: 'dispute',
    priority: 'medium',
    status: 'pending',
    submittedBy: 'Sarah Johnson',
    submittedAgainst: 'Treasury Department',
    openedDate: '08/03/2025',
  },
  {
    id: '3',
    title: 'Meeting Minutes Accuracy Complaint',
    type: 'complaint',
    priority: 'low',
    status: 'resolved',
    submittedBy: 'Michael Davis',
    submittedAgainst: 'Secretary',
    openedDate: '01/03/2025',
  },
];

const CaseList: React.FC<CaseListProps> = ({ onSelectCase, filterTab, searchQuery }) => {

  const filteredCases = useMemo(() => {
    return cases.filter(case_ => {
      // Filter by Tab
      let matchesTab = false;
      if (filterTab === 'all-cases') {
        matchesTab = true;
      } else if (filterTab === 'complaints') {
        matchesTab = case_.type === 'complaint';
      } else if (filterTab === 'disputes') {
        matchesTab = case_.type === 'dispute';
      } else {
        // Assume tab ID matches status (e.g., 'pending', 'resolved')
        matchesTab = case_.status === filterTab;
      }

      // Filter by Search Query
      const lowerCaseQuery = searchQuery.toLowerCase();
      const matchesSearch = 
        case_.title.toLowerCase().includes(lowerCaseQuery) ||
        case_.submittedBy.toLowerCase().includes(lowerCaseQuery) ||
        case_.submittedAgainst.toLowerCase().includes(lowerCaseQuery);

      return matchesTab && matchesSearch;
    });
  }, [cases, filterTab, searchQuery]);

  return (
    <div className="divide-y divide-gray-200">
      {filteredCases.length > 0 ? (
        filteredCases.map((case_) => (
          <div
            key={case_.id}
            className="p-6 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            onClick={() => onSelectCase(case_.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectCase(case_.id)}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {case_.title}
                  </h3>
                  {case_.priority === 'high' && (
                    <span className="text-red-600 flex items-center text-xs font-medium">
                       <AlertCircleIcon className="w-4 h-4 mr-1" /> High Priority
                    </span>
                   )}
                </div>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500 flex-wrap">
                  <span>Submitted by {case_.submittedBy}</span>
                  <span>Opened {case_.openedDate}</span>
                   <span className="capitalize">Type: {case_.type}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
                <StatusBadge status={case_.status} />
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 p-8">No cases found matching your criteria.</p>
      )}
    </div>
  );
};

export default CaseList; 