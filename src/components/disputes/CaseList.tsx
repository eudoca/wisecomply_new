import React, { useMemo } from 'react';
import type { DisputeCase, CaseStatus, CaseType } from '@/types/dispute'; // Adjust path if needed
import { cn } from '@/utils/cn'; // Adjust path if needed
import { Badge } from '@/components/ui/Badge'; // Corrected casing based on linter error

interface CaseListProps {
  cases: DisputeCase[];
  onSelectCase: (caseId: string) => void;
  filterTab: string; // Add filterTab prop
  searchQuery: string; // Add searchQuery prop
}

const CaseList: React.FC<CaseListProps> = ({ cases, onSelectCase, filterTab, searchQuery }) => {

  const filteredCases = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    
    return cases.filter(caseItem => {
      // Filter by Tab
      let matchesTab = false;
      if (filterTab === 'all-cases') {
        matchesTab = true;
      } else if (filterTab === 'disputes') {
        // Map 'disputes' tab to relevant caseType(s)
        matchesTab = caseItem.caseType === 'dispute_complaint'; 
      } else if (filterTab === 'complaints') {
        // Map 'complaints' tab to relevant caseType(s)
        matchesTab = caseItem.caseType === 'misconduct_allegation';
      } else if (filterTab === 'resolved') {
        // Map 'resolved' tab to relevant status(es)
        matchesTab = caseItem.status === 'closed'; // Example: map resolved to closed
      } else {
        // Assume other tab IDs match status directly (e.g., 'pending', 'lodged')
        matchesTab = caseItem.status === filterTab;
      }
      
      // Filter by Search Query (if tab matches)
      if (!matchesTab) return false;
      if (!lowerCaseQuery) return true; // No search query, just return tab match
      
      const matchesSearch = 
        caseItem.id.toLowerCase().includes(lowerCaseQuery) ||
        caseItem.summary.toLowerCase().includes(lowerCaseQuery) ||
        caseItem.complainants.some(c => c.toLowerCase().includes(lowerCaseQuery)) ||
        caseItem.respondents.some(r => r.toLowerCase().includes(lowerCaseQuery)) ||
        caseItem.status.replace('_', ' ').toLowerCase().includes(lowerCaseQuery) || 
        caseItem.caseType.replace('_', ' ').toLowerCase().includes(lowerCaseQuery);
        
      return matchesSearch;
    });
  }, [cases, filterTab, searchQuery]);

  if (!filteredCases || filteredCases.length === 0) {
    return <div className="p-6 text-center text-gray-500">No cases found matching your criteria.</div>;
  }

  // Helper to format arrays for display
  const formatArray = (arr: string[]) => arr.join(', ');

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Lodged</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complainant(s)</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Respondent(s)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredCases.map((caseItem) => (
            <tr 
              key={caseItem.id}
              onClick={() => onSelectCase(caseItem.id)}
              className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{caseItem.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 capitalize">
                {caseItem.caseType.replace('_', ' ')}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {/* Use a supported Badge variant (e.g., outline) for closed status */}
                <Badge variant={caseItem.status === 'closed' ? 'outline' : 'default'} className="capitalize">
                  {caseItem.status.replace('_', ' ')}
                </Badge>
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {/* Consider formatting the date string nicer if needed */}
                {caseItem.dateLodged}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" title={formatArray(caseItem.complainants)}>
                {formatArray(caseItem.complainants)}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs" title={formatArray(caseItem.respondents)}>
                {formatArray(caseItem.respondents)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CaseList; 