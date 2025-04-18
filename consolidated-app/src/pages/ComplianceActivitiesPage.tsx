import React, { useState } from 'react';
import SocietyDetails from '../components/compliance/SocietyDetails';
import DashboardMetrics from '../components/compliance/DashboardMetrics';
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
      {/* Removed commented out header */}
      
      {/* Content from source App.tsx structure */}
      <SocietyDetails />
      <DashboardMetrics />
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