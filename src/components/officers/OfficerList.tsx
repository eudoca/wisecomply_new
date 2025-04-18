import React from 'react';
import QualificationStatus from './QualificationStatus'; // Import from same directory
import { Button } from '../ui/Button'; // Use shared Button

interface OfficerQualification {
  status: 'verified' | 'warning';
  text: string;
  warning?: string;
}

interface Officer {
  id: string;
  name: string;
  role: string;
  term: string;
  qualifications: OfficerQualification[];
}

// Sample data - replace with actual data fetching later
const officers: Officer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Chairperson',
    term: '15/09/2023 - 15/09/2025',
    qualifications: [
      { status: 'verified', text: 'Not disqualified under section 53' },
      { status: 'verified', text: '18 years or older' },
      { status: 'verified', text: 'Not bankrupt' },
      { status: 'verified', text: 'No conflict of interest declared' },
    ],
  },
  {
    id: '2',
    name: 'David Wong',
    role: 'Treasurer',
    term: '15/09/2023 - 15/09/2025',
    qualifications: [
      { status: 'verified', text: 'Not disqualified under section 53' },
      { status: 'verified', text: '18 years or older' },
      { status: 'verified', text: 'Not bankrupt' },
      { status: 'warning', text: 'Annual declaration due in 15 days', warning: 'No conflict of interest' },
    ],
  },
];

const OfficerList: React.FC = () => {
  const handleViewDetails = (officerId: string) => {
     console.log('View details for officer:', officerId);
     alert(`Viewing details for officer ${officerId}`);
  };
  
  const handleEdit = (officerId: string) => {
     console.log('Edit officer:', officerId);
     alert(`Editing officer ${officerId}`);
  };
  
  return (
    <div className="space-y-6">
      {/* Optional: Add a header or Add Officer button here */}
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Current Officers</h2>
        <Button size="sm">Add Officer</Button>
      </div> */} 
      
      <div className="space-y-6">
        {officers.map((officer) => (
          <div key={officer.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {officer.name}
                </h3>
                <p className="text-sm text-gray-500">{officer.role}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Term: {officer.term}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                 <Button variant="outline" size="sm" onClick={() => handleViewDetails(officer.id)}>
                  View Details
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(officer.id)}>
                  Edit
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Qualification Status
              </h4>
              <QualificationStatus items={officer.qualifications} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerList; 