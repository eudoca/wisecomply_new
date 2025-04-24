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
            Here you can view the sections of your constitution and make any changes that are relevant to your Society.
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <ConstitutionStatus />
        {/* Wrap ConstitutionWizard in a styled div and add consistent padding */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm p-6">
          <ConstitutionWizard /> 
        </div>
      </div>
    </div>
  );
};

// export default ConstitutionPage; // Optional default export 