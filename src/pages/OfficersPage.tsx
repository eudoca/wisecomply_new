import React, { useState } from 'react';
import GovernanceTabs from '../components/officers/GovernanceTabs'; // Adjusted path
import OfficerList from '../components/officers/OfficerList'; // Adjusted path
import ComplianceActivities from '../components/officers/ComplianceActivities'; // Adjusted path
import { Button } from '@/components/ui/button'; // Standardized path
import AddOfficerForm from '../components/officers/AddOfficerForm'; // Adjusted path
import ViewOfficerDetailsModal from '../components/officers/ViewOfficerDetailsModal'; // Import the new modal
import { Officer } from '../types/officer'; // Assuming a type definition exists or will be created
import { UserPlusIcon } from 'lucide-react';

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

// Renamed component
export const OfficersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('officers'); // Default to officers tab
  const [isAddOfficerModalOpen, setIsAddOfficerModalOpen] = useState(false);
  const [officers, setOfficers] = useState<Officer[]>(initialOfficers); // Use initial data
  const [selectedOfficerForEdit, setSelectedOfficerForEdit] = useState<Officer | null>(null); // State for officer being edited
  
  // State for View Details Modal
  const [isViewDetailsModalOpen, setIsViewDetailsModalOpen] = useState(false);
  const [selectedOfficerForDetails, setSelectedOfficerForDetails] = useState<Officer | null>(null);

  const handleAddOfficerClick = () => {
    setSelectedOfficerForEdit(null); // Clear edit state when adding
    setIsAddOfficerModalOpen(true);
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
    // console.log('Edit officer requested:', officerId);
    // alert(`Editing officer ${officerId} - Functionality not yet implemented.`);
  };

  const handleCloseViewDetailsModal = () => {
    setIsViewDetailsModalOpen(false);
    setSelectedOfficerForDetails(null); // Clear selected officer on close
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6 flex justify-between items-center"> {/* Use flex to align title and button */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Officer Management 
          </h1>
          <p className="mt-1 text-gray-600">
            Manage your incorporated society's officers
          </p>
        </div>
        {/* Add Officer Button */}
        <Button onClick={handleAddOfficerClick}>Add Officer</Button>
      </div>
      
      {/* Render compliance activities - pass officer count */}
      <ComplianceActivities officerCount={officers.length} />

      <div className="mt-6"> {/* Added margin for spacing */}
        <GovernanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {/* Pass officers and handlers down to OfficerList */}
          {activeTab === 'officers' && 
            <OfficerList 
              officers={officers} 
              onViewDetailsClick={handleViewDetailsClick}
              onEditClick={handleEditClick}
            />}
          {activeTab === 'committees' && (
            <div className="text-gray-500 text-center py-12 bg-white rounded-b-lg border border-t-0 border-gray-200">
              <p>Committee management features coming soon.</p>
            </div>
          )}
          {activeTab === 'governance-tasks' && (
            <div className="text-gray-500 text-center py-12 bg-white rounded-b-lg border border-t-0 border-gray-200">
              <p>Governance tasks features coming soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Render the Add Officer Modal - also used for editing */}
      <AddOfficerForm
        isOpen={isAddOfficerModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveOfficer}
        initialData={selectedOfficerForEdit} // Pass selected officer for editing
      />

      {/* Render the View Details Modal */} 
      <ViewOfficerDetailsModal 
        isOpen={isViewDetailsModalOpen} 
        onClose={handleCloseViewDetailsModal} 
        officer={selectedOfficerForDetails} 
      />
    </div>
  );
};

// export default OfficersPage; // Optional default export 