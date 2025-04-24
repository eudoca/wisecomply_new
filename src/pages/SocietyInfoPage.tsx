import React from 'react';

export const SocietyInfoPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Society Information</h1>
      </div>
      
      {/* Blue information box */}
      <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100 flex">
        <div className="flex-shrink-0 mr-3">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-sm text-blue-700">
          <p>
            This page contains essential information about your society:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Basic details including your society's legal name, registration number, and date of establishment</li>
            <li>Contact information for official correspondence</li>
            <li>Your society's purpose and objectives as registered</li>
            <li>Physical location and operating address</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-10 text-center mt-6">
        <div className="py-8">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Society Information Page</h3>
          <p className="mt-1 text-sm text-gray-500">
            This is a placeholder for the Society Information page.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Content for this page is yet to be designed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocietyInfoPage; 