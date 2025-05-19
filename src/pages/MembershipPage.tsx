import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Standardized path
import { DownloadIcon, UserPlusIcon, CheckCircleIcon, UsersIcon, ToggleLeftIcon } from 'lucide-react'; // Added ToggleLeftIcon
import MemberDirectorySimple from '../components/membership/MemberDirectorySimple'; // Changed import
import { Tabs, Tab } from '../components/ui/Tabs';

// Renamed component
export const MembershipPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all-members');
  const [manageMembership, setManageMembership] = useState(true);

  // Define tabs for membership page
  const tabs: Tab[] = [
    { id: 'all-members', label: 'All Members' },
    { id: 'active-members', label: 'Active Members' },
    { id: 'inactive-members', label: 'Inactive Members' },
    { id: 'categories', label: 'Member Categories' },
  ];
  
  // Placeholder handlers
  const handleExportMembers = () => {
    console.log('Exporting members...');
    alert('Export functionality not implemented yet.');
  };

  const handleAddMember = () => {
    console.log('Adding new member...');
    alert('Add member functionality not implemented yet.');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Members and Membership Management
          </h1>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Button 
             variant="outline" 
             size="sm" 
             onClick={handleExportMembers}
             leftIcon={<DownloadIcon className="h-4 w-4" />}
           >
            Export Members
          </Button>
          <Button 
             size="sm" 
             onClick={handleAddMember}
             leftIcon={<UserPlusIcon className="h-4 w-4" />}
           >
             Add Member
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
            This page helps you manage and maintain a register of members.
          </p>
        </div>
      </div>
      
      {/* Membership Management Toggle */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">I want WiseComply to manage members</h3>
            <p className="text-sm text-gray-500">Enable this option to use WiseComply for member registration and tracking</p>
          </div>
          <div className="relative">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={manageMembership}
                onChange={() => setManageMembership(!manageMembership)} 
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
                peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border 
                after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
            </label>
          </div>
        </div>
        
        {manageMembership && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Membership management is enabled. You can add, edit, and track your members in WiseComply.
            </p>
          </div>
        )}
      </div>
      
      {/* Tabs and Content Area - Only display if membership management is enabled */}
      {manageMembership && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center">
            <Tabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
            />
          </div>
          
          <div className="p-6">
            {activeTab === 'all-members' && <MemberDirectorySimple statusFilter="all" />}
            {activeTab === 'active-members' && <MemberDirectorySimple statusFilter="active" />}
            {activeTab === 'inactive-members' && <MemberDirectorySimple statusFilter="inactive" />}
            {activeTab === 'categories' && (
              <div className="text-gray-500 text-center py-8">
                <p>Member categories management coming soon.</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Display when membership management is disabled */}
      {!manageMembership && (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
          <div className="flex justify-center">
            <ToggleLeftIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Membership Management Disabled</h3>
          <p className="mt-1 text-sm text-gray-500">
            You've chosen not to use WiseComply for member management. <br />
            Toggle the switch above to enable this feature.
          </p>
        </div>
      )}
    </div>
  );
};

// export default MembershipPage; // Optional default export 