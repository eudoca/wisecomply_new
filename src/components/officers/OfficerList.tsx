import React from 'react';
import { Button } from '@/components/ui/button'; // Standardized path
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card'; // Assuming these components exist
import { UserIcon, MailIcon, PhoneIcon, Trash2Icon, EditIcon, MoreVerticalIcon, ClipboardIcon, CheckCircle, XCircle } from 'lucide-react';
import QualificationStatus from './QualificationStatus'; // Import from same directory
import { Officer } from '../../types/officer'; // Import the correct Officer type

// Interface for qualifications (keep separate for now)
interface OfficerQualification {
  status: 'verified' | 'warning';
  text: string;
  warning?: string;
}

// Remove the old local Officer interface
// interface Officer {
//   id: string;
//   name: string;
//   role: string;
//   term: string;
//   qualifications: OfficerQualification[];
// }

// Sample data - updated to match the Officer type from ../../types/officer
const officers: Officer[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson', // Renamed from name
    position: 'Chairperson', // Renamed from role
    dateElectedAppointed: '2023-09-15', // Added
    termEndDate: '2025-09-14', // Added
    email: 'sarah.j@example.com', // Added
    phone: '555-1234', // Added (Optional)
    address: '123 Main St, Anytown', // Added (Optional)
    isEligible: true, // Added
    hasConsented: true, // Added
    consentDate: '2023-09-10', // Added (Optional)
    // qualifications array removed for now
  },
  {
    id: '2',
    fullName: 'David Wong', // Renamed from name
    position: 'Treasurer', // Renamed from role
    dateElectedAppointed: '2023-09-15', // Added
    termEndDate: '2025-09-14', // Added
    email: 'david.wong@example.com', // Added
    phone: '555-5678', // Added (Optional)
    address: null, // Added (Optional - example null)
    isEligible: true, // Added
    hasConsented: false, // Added - Example: Consent pending
    consentDate: null, // Added (Optional - example null)
     // qualifications array removed for now
  },
];

// Define props for OfficerList
interface OfficerListProps {
   officers: Officer[];
   onViewDetailsClick: (id: string) => void;
   onEditClick: (id: string) => void;
   onViewConsentFormClick: (id: string) => void;
   onDelete: (id: string) => void; // Added onDelete prop
}

const OfficerList: React.FC<OfficerListProps> = ({ 
  officers, 
  onViewDetailsClick, 
  onEditClick,
  onViewConsentFormClick,
  onDelete // Destructure onDelete
}) => {
  // Remove local handleViewDetails and handleEdit, use props instead
  // const handleViewDetails = (officerId: string) => { ... };
  // const handleEdit = (officerId: string) => { ... };
  
  return (
    <div className="space-y-6">
      {/* Optional: Add a header or Add Officer button here */}
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Current Officers</h2>
        <Button size="sm">Add Officer</Button>
      </div> */} 
      
      <div className="space-y-6">
        {/* Use officers from props */} 
        {officers.map((officer) => (
          <div key={officer.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {officer.fullName}
                </h3>
                <p className="text-sm font-medium text-gray-700">{officer.position}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Elected/Appointed: {officer.dateElectedAppointed}
                </p>
                {officer.termEndDate && (
                  <p className="text-sm text-gray-600 mt-1">
                      Term End: {officer.termEndDate}
                   </p>
                )}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onViewConsentFormClick(officer.id)}
                  className="flex items-center gap-1"
                >
                  <ClipboardIcon className="h-4 w-4" />
                  <span>View Consent Form</span>
                </Button>
                 <Button variant="outline" size="sm" onClick={() => onViewDetailsClick(officer.id)}>
                  View Details
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onEditClick(officer.id)}>
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDelete(officer.id)} 
                  className="flex items-center gap-1"
                >
                  <Trash2Icon className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="bg-gray-200 p-3 rounded-md space-y-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Consent Form Requested:
                    {officer.hasConsented !== null ? (
                      <span className="ml-2 flex items-center inline-flex">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="font-medium text-green-600">Yes</span>
                      </span>
                    ) : (
                      <span className="ml-2 flex items-center inline-flex">
                        <XCircle size={16} className="text-red-500 mr-1" />
                        <span className="font-medium text-red-600">No</span>
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">
                    Written Consent Held:
                    {officer.hasConsented ? (
                      <span className="ml-2 flex items-center inline-flex">
                        <CheckCircle size={16} className="text-green-500 mr-1" />
                        <span className="font-medium text-green-600">Yes</span>
                      </span>
                    ) : (
                      <span className="ml-2 flex items-center inline-flex">
                        <XCircle size={16} className="text-red-500 mr-1" />
                        <span className="font-medium text-red-600">No</span>
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfficerList; 