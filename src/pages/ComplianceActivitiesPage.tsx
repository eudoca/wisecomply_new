import React, { useState } from 'react';
import SocietyDetails from '../components/compliance/SocietyDetails';
import TimelineSummary from '../components/compliance/TimelineSummary';
import TabNavigation from '../components/compliance/TabNavigation';
import ComplianceActivities from '../components/compliance/ComplianceActivities';
import ComplianceObligations from '../components/compliance/ComplianceObligations';

export const ComplianceActivitiesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('activities');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'activities':
        return <ComplianceActivities />;
      case 'obligations':
        return <ComplianceObligations />;
      case 'wizard':
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              Wizard Configuration
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              This section will allow you to update your previous wizard answers.
            </p>
          </div>
        );
      default:
        return <ComplianceActivities />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Compliance Activities</h1>
      </div>
      
      {/* Blue information box */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex mb-6">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p>
            This page helps you track and manage your compliance responsibilities:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>View upcoming compliance tasks and deadlines</li>
            <li>Track your society's progress toward full compliance with the Incorporated Societies Act 2022</li>
            <li>Complete required activities based on your specific society type</li>
          </ul>
        </div>
      </div>
      
      <SocietyDetails />
      <TimelineSummary />
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};