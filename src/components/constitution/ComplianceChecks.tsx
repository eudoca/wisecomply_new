import React from 'react';
import StatusBadge from './StatusBadge'; // Import from same directory
import { ChevronRightIcon } from 'lucide-react';
import { Button } from '../ui/Button'; // Import the main Button component

interface ComplianceCheck {
  requirement: string;
  status: 'compliant' | 'needs-attention' | 'non-compliant';
  section: string;
}

// Sample data - replace with actual data fetching later
const complianceChecks: ComplianceCheck[] = [
  {
    requirement: 'Officer Qualification Criteria',
    status: 'compliant',
    section: '5.3',
  },
  {
    requirement: 'Conflict of Interest Procedures',
    status: 'compliant',
    section: '6.2',
  },
  {
    requirement: 'Financial Reporting Standards',
    status: 'needs-attention',
    section: '8.4',
  },
  {
    requirement: 'Dispute Resolution Process',
    status: 'compliant',
    section: '9.1',
  },
  {
    requirement: 'Winding Up Provisions',
    status: 'compliant',
    section: '12.3',
  },
  {
    requirement: 'Member Voting Rights',
    status: 'compliant',
    section: '4.7',
  },
];

const ComplianceChecks: React.FC = () => {
  const handleReview = (requirement: string) => {
    // Implement navigation or modal logic for reviewing the requirement
    console.log(`Review/edit ${requirement}`);
    alert(`Reviewing: ${requirement}`);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Compliance Checks (Incorporated Societies Act 2022)
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requirement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Constitution Section
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complianceChecks.map((check) => (
                <tr key={check.requirement}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {check.requirement}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={check.status} />
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {check.section}
                  </td>
                  <td className="px-6 py-4 text-right">
                     <Button 
                       variant="outline" 
                       size="sm" 
                       onClick={() => handleReview(check.requirement)}
                       rightIcon={<ChevronRightIcon className="h-4 w-4" />}
                      >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplianceChecks; 