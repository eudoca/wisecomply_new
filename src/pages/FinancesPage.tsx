import React, { useState } from 'react';
import { CheckCircleIcon, ToggleLeftIcon } from 'lucide-react';

export const FinancesPage: React.FC = () => {
  const [manageFinances, setManageFinances] = useState(true);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Finances</h1>
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
            This page helps you manage and track your society's financial activities:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Track income, expenses, and financial transactions</li>
            <li>Maintain budget plans and monitor actual spending</li>
            <li>Generate financial reports for meetings and regulatory requirements</li>
          </ul>
        </div>
      </div>
      
      {/* Finances Management Toggle */}
      <div className="mb-6 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-medium text-gray-900">I want WiseComply to manage finances</h3>
            <p className="text-sm text-gray-500">Enable this option to use WiseComply for financial tracking and reporting</p>
          </div>
          <div className="relative">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={manageFinances}
                onChange={() => setManageFinances(!manageFinances)} 
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 
                peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] 
                after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border 
                after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
              </div>
            </label>
          </div>
        </div>
        
        {manageFinances && (
          <div className="mt-3 p-3 bg-blue-50 rounded-md border border-blue-100 flex items-start">
            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-blue-700">
              Financial management is enabled. You can track, manage, and report on finances in WiseComply.
            </p>
          </div>
        )}
      </div>

      {/* Content Area - Only display if finances management is enabled */}
      {manageFinances ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Financial Management Dashboard</h2>
            <p className="text-gray-600">Full financial management features coming soon.</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center mt-6">
          <div className="flex justify-center">
            <ToggleLeftIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Financial Management Disabled</h3>
          <p className="mt-1 text-sm text-gray-500">
            You've chosen not to use WiseComply for financial management. <br />
            Toggle the switch above to enable this feature.
          </p>
        </div>
      )}
    </div>
  );
};

export default FinancesPage; 