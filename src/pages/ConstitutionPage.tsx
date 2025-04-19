import React from 'react';
import ConstitutionStatus from '../components/constitution/ConstitutionStatus'; // Adjusted path
// Removed ComplianceChecks import
// import ComplianceChecks from '../components/constitution/ComplianceChecks'; // Adjusted path
import ConstitutionWizard from '../components/constitution/ConstitutionWizard'; // Added Wizard import

// Renamed component
export const ConstitutionPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Constitution Management
        </h1>
        <p className="mt-1 text-gray-600">
          Manage your organisation's constitution and ensure compliance with the Incorporated Societies Act 2022
        </p>
      </div>
      <div className="space-y-6">
        <ConstitutionStatus />
        {/* Replaced ComplianceChecks with ConstitutionWizard */}
        <ConstitutionWizard /> 
      </div>
    </div>
  );
};

// export default ConstitutionPage; // Optional default export 