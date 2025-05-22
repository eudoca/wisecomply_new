import React, { useState } from 'react';
import OfficerList from '../components/officers/OfficerList'; // Adjusted path
import ComplianceActivities from '../components/officers/ComplianceActivities'; // Adjusted path
import { Button } from '@/components/ui/button.tsx'; // Added .tsx extension
import AddOfficerForm from '../components/officers/AddOfficerForm'; // Adjusted path
import ViewOfficerDetailsModal from '../components/officers/ViewOfficerDetailsModal'; // Import the new modal
import ViewConsentFormModal from '../components/officers/ViewConsentFormModal'; // Import the consent form modal
import PreviewConsentFormModal from '../components/officers/PreviewConsentFormModal'; // Import the preview modal
import AddInterestForm from '../components/officers/AddInterestForm'; // Import the interest form
import InterestsRegister from '../components/officers/InterestsRegister'; // Import the new component
import { Officer } from '../types/officer'; // Assuming a type definition exists or will be created
import { ClipboardIcon, UserCog } from 'lucide-react';
import { Tabs, Tab } from '../components/ui/Tabs';
import { ActivityDashboard } from '../components/officers/compliance/ActivityDashboard';

// Sample data moved here from OfficerList for state management
const initialOfficers: Officer[] = [
  {
    id: '1',
    fullName: 'Sarah Johnson',
    position: 'Chairperson',
    dateElectedAppointed: '2023-09-15',
    termEndDate: '2025-09-14',
    email: 'sarah.j@example.com',
    phone: '555-1234',
    address: '123 Main St, Anytown',
    isEligible: true,
    hasConsented: true,
    consentDate: '2023-09-10',
  },
  {
    id: '2',
    fullName: 'David Wong',
    position: 'Treasurer',
    dateElectedAppointed: '2023-09-15',
    termEndDate: '2025-09-14',
    email: 'david.wong@example.com',
    phone: '555-5678',
    address: null,
    isEligible: true,
    hasConsented: false,
    consentDate: null,
  },
];

// Add interface for interest disclosures
interface InterestDisclosure {
  id: string;
  officerName: string;
  position: string;
  natureOfInterest: string;
  extentOfInterest: string;
  monetaryValue: string;
  dateOfAwareness: string;
  additionalNotes: string;
  confirmationAccuracy: boolean;
  disclosureDate: string; // Date when form was submitted
}

// Sample initial interests data
const initialInterests: InterestDisclosure[] = [
  {
    id: '1',
    officerName: 'Sarah Johnson',
    position: 'Chairperson',
    natureOfInterest: 'financial',
    extentOfInterest: 'Owns 15% share in XYZ Technologies Ltd, a potential IT vendor for the organization.',
    monetaryValue: '25000',
    dateOfAwareness: '2023-10-05',
    additionalNotes: 'This interest has been noted by the board and Sarah will recuse herself from any procurement decisions involving XYZ Technologies.',
    confirmationAccuracy: true,
    disclosureDate: '2023-10-10'
  },
  {
    id: '2',
    officerName: 'David Wong',
    position: 'Treasurer',
    natureOfInterest: 'family',
    extentOfInterest: 'Brother-in-law is CEO of Green Valley Grants, a funding organization we may apply to.',
    monetaryValue: '',
    dateOfAwareness: '2023-11-12',
    additionalNotes: 'David will exclude himself from grant application processes involving Green Valley Grants.',
    confirmationAccuracy: true,
    disclosureDate: '2023-11-15'
  },
  {
    id: '3',
    officerName: 'David Wong',
    position: 'Treasurer',
    natureOfInterest: 'property',
    extentOfInterest: 'Owns commercial property adjacent to the proposed community center location.',
    monetaryValue: '450000',
    dateOfAwareness: '2024-01-20',
    additionalNotes: 'Property value may be affected by our development plans.',
    confirmationAccuracy: true,
    disclosureDate: '2024-01-25'
  },
  {
    id: '4',
    officerName: 'Michael Chen',
    position: 'Board Member',
    natureOfInterest: 'business',
    extentOfInterest: 'Provides consulting services to Community First, one of our community partners.',
    monetaryValue: '8000',
    dateOfAwareness: '2024-02-03',
    additionalNotes: 'Annual consulting contract for strategic planning services.',
    confirmationAccuracy: true,
    disclosureDate: '2024-02-10'
  },
  {
    id: '5',
    officerName: 'Emily Davis',
    position: 'Secretary',
    natureOfInterest: 'gift',
    extentOfInterest: 'Received honorarium for speaking at industry conference hosted by potential sponsor.',
    monetaryValue: '1500',
    dateOfAwareness: '2024-03-15',
    additionalNotes: 'One-time speaking engagement at annual nonprofit leadership conference.',
    confirmationAccuracy: true,
    disclosureDate: '2024-03-18'
  }
];

// Add interface for officer invite requests
interface OfficerInviteRequest {
  fullName: string;
  email: string;
  message: string;
}

// Add interface for disclosure requests
interface DisclosureRequest {
  officerName: string;
  officerEmail: string;
  message: string;
}

// Renamed component
export const OfficersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('officer-register'); // Default to officer register tab
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers); // Use initial data
  const [selectedOfficerForEdit, setSelectedOfficerForEdit] = useState<Officer | null>(null); // State for officer being edited
  
  // State for View Details Modal
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedOfficerForDetails, setSelectedOfficerForDetails] = useState<Officer | null>(null);
  
  // State for View Consent Form Modal
  const [isViewConsentFormModalOpen, setIsViewConsentFormModalOpen] = useState(false);
  const [selectedOfficerForConsent, setSelectedOfficerForConsent] = useState<Officer | null>(null);

  // State for Preview Consent Form Modal
  const [isPreviewConsentFormModalOpen, setIsPreviewConsentFormModalOpen] = useState(false);
  
  // State for Add Interest Form Modal
  const [isAddInterestModalOpen, setIsAddInterestModalOpen] = useState(false);
  const [interests, setInterests] = useState<InterestDisclosure[]>(initialInterests);
  
  // State for tracking pending invites
  const [pendingOfficerInvites, setPendingOfficerInvites] = useState<OfficerInviteRequest[]>([]);
  const [pendingDisclosureRequests, setPendingDisclosureRequests] = useState<DisclosureRequest[]>([]);

  // Define tabs for the Officers page
  const tabs: Tab[] = [
    { id: 'officer-register', label: '1. Officer Register' },
    { id: 'interests-register', label: '2. Interests Register' },
  ];

  const handleAddOfficerClick = () => {
    setSelectedOfficerForEdit(null); // Clear edit state when adding
    setIsAddOfficerModalOpen(true);
  };

  const handlePreviewConsentFormClick = () => {
    setIsPreviewConsentFormModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddOfficerModalOpen(false);
    setSelectedOfficerForEdit(null); // Clear edit state on close
  };

  const handleSaveOfficer = (officerData: Officer) => {
    if (selectedOfficerForEdit) {
      // Editing existing officer
      setOfficers(prevOfficers => 
        prevOfficers.map(o => o.id === selectedOfficerForEdit.id ? { ...o, ...officerData } : o)
      );
      console.log('Updating officer:', officerData);
    } else {
      // Adding new officer (generate ID if not provided by form, though form does now)
      const newOfficer = { ...officerData, id: officerData.id || Date.now().toString() }; 
      setOfficers(prevOfficers => [...prevOfficers, newOfficer]);
      console.log('Saving new officer:', newOfficer);
    }
    setIsAddOfficerModalOpen(false); // Close modal
    setSelectedOfficerForEdit(null); // Clear edit state
  };
  
  const handleSendOfficerInvite = (inviteData: OfficerInviteRequest) => {
    // In a real application, you would send an email with a link here
    console.log('Sending officer invite to:', inviteData.email);
    
    // Add to pending invites
    setPendingOfficerInvites(prev => [...prev, inviteData]);
    
    // Show success notification (in a real app)
    alert(`Invitation sent to ${inviteData.fullName} at ${inviteData.email}`);
  };
  
  const handleSendDisclosureRequest = (request: DisclosureRequest) => {
    // In a real application, you would send an email with a link here
    console.log('Sending disclosure request to:', request.officerEmail);
    
    // Add to pending requests
    setPendingDisclosureRequests(prev => [...prev, request]);
    
    // Show success notification (in a real app)
    alert(`Disclosure request sent to ${request.officerName} at ${request.officerEmail}`);
  };

  // Handler for View Details click (passed to OfficerList)
  const handleViewDetailsClick = (officerId: string) => {
    const officer = officers.find(o => o.id === officerId);
    if (officer) {
      setSelectedOfficerForDetails(officer);
      setIsViewDetailsModalOpen(true);
    }
  };

   // Handler for Edit click (passed to OfficerList)
   const handleEditClick = (officerId: string) => {
    const officerToEdit = officers.find(o => o.id === officerId);
    if (officerToEdit) {
        setSelectedOfficerForEdit(officerToEdit);
        setIsAddOfficerModalOpen(true); // Open the same modal used for adding
    } else {
        console.error("Officer not found for editing:", officerId);
    }
  };

  // Handler for View Consent Form click
  const handleViewConsentFormClick = (officerId: string) => {
    const officer = officers.find(o => o.id === officerId);
    if (officer) {
      setSelectedOfficerForConsent(officer);
      setIsViewConsentFormModalOpen(true);
    }
  };

  const handleCloseViewDetailsModal = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedOfficerForDetails(null); // Clear selected officer on close
  };

  const handleCloseConsentFormModal = () => {
    setIsViewConsentFormModalOpen(false);
    setSelectedOfficerForConsent(null);
  };

  const handleClosePreviewConsentFormModal = () => {
    setIsPreviewConsentFormModalOpen(false);
  };

  const handleAddInterestClick = () => {
    setIsAddInterestModalOpen(true);
  };

  const handleCloseAddInterestModal = () => {
    setIsAddInterestModalOpen(false);
  };

  const handleSaveInterest = (interest: Omit<InterestDisclosure, 'id' | 'disclosureDate'>) => {
    const newInterest: InterestDisclosure = {
      ...interest,
      id: Date.now().toString(),
      disclosureDate: new Date().toISOString().split('T')[0]
    };
    
    setInterests(prev => [...prev, newInterest]);
    setIsAddInterestModalOpen(false);
  };

  const handleDeleteOfficer = (officerId: string) => {
    setOfficers(prev => prev.filter(o => o.id !== officerId));
    setInterests(prev => prev.filter(i => i.officerName !== officers.find(o=>o.id === officerId)?.fullName)); // Also remove related interests
  };

  const handleDeleteInterest = (interestId: string) => {
    setInterests(prev => prev.filter(i => i.id !== interestId));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2">
          <UserCog className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-semibold text-purple-600">Officers and Committees</h1>
        </div>
        <Button onClick={handleAddOfficerClick} leftIcon={<ClipboardIcon className="h-4 w-4" />}>
          Add Officer
        </Button>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              This page helps you manage your society's officers and committees. You can:
            </p>
            <ul className="mt-2 list-disc list-inside text-sm text-blue-700 space-y-1">
              <li>Add and manage officers</li>
              <li>Track officer compliance requirements</li>
              <li>Manage committee structures</li>
              <li>Record and monitor conflicts of interest</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Activity Dashboard */}
      <div className="mb-8">
        <ActivityDashboard />
      </div>

      {/* Tabs and Content */}
      <div className="bg-white rounded-lg shadow">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />
        
        <div className="p-6">
          {activeTab === 'officer-register' && 
            <OfficerList 
              officers={officers} 
              onViewDetailsClick={handleViewDetailsClick}
              onEditClick={handleEditClick}
              onViewConsentFormClick={handleViewConsentFormClick}
              onDelete={handleDeleteOfficer}
            />}
          {activeTab === 'interests-register' && (
            <InterestsRegister interests={interests} onDelete={handleDeleteInterest} />
          )}
        </div>
      </div>

      {/* Modals */}
      <AddOfficerForm
        isOpen={isAddOfficerModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveOfficer}
        onSendInvite={handleSendOfficerInvite}
        initialData={selectedOfficerForEdit}
      />

      <ViewOfficerDetailsModal 
        isOpen={isViewDetailsModalOpen} 
        onClose={handleCloseViewDetailsModal} 
        officer={selectedOfficerForDetails} 
      />

      <ViewConsentFormModal
        isOpen={isViewConsentFormModalOpen}
        onClose={handleCloseConsentFormModal}
        officer={selectedOfficerForConsent}
      />

      <PreviewConsentFormModal
        isOpen={isPreviewConsentFormModalOpen}
        onClose={handleClosePreviewConsentFormModal}
      />

      <AddInterestForm
        isOpen={isAddInterestModalOpen}
        onClose={handleCloseAddInterestModal}
        onSave={handleSaveInterest}
        officers={officers}
        onSendDisclosureRequest={handleSendDisclosureRequest}
      />
    </div>
  );
};

export default OfficersPage; 