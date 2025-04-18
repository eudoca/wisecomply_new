import React, { useState } from 'react';
import GovernanceTabs from '../components/officers/GovernanceTabs'; // Adjusted path
import OfficerList from '../components/officers/OfficerList'; // Adjusted path
import ComplianceActivities from '../components/officers/ComplianceActivities'; // Adjusted path

// Renamed component
export const OfficersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('officers'); // Default to officers tab

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Officer & Governance Management
        </h1>
        <p className="mt-1 text-gray-600">
          Manage your organisation's officers, committees, and governance requirements
        </p>
      </div>
      
      {/* Render compliance activities at the top or within a tab if preferred */}
      <ComplianceActivities />

      <div className="mt-6"> {/* Added margin for spacing */}
        <GovernanceTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="mt-6">
          {activeTab === 'officers' && <OfficerList />}
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
    </div>
  );
};

// export default OfficersPage; // Optional default export 