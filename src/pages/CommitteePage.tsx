import React from 'react';

export const CommitteePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Committee</h1>
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
            This page helps you manage your society's committees and working groups:
          </p>
          <ul className="mt-2 list-disc pl-5 space-y-1">
            <li>Create and track various committees (e.g., Finance, Governance, Events)</li>
            <li>Assign officers and members to committees with specific roles</li>
            <li>Set committee terms, meeting schedules, and objectives</li>
            <li>Maintain committee minutes and decision records</li>
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Committee Page</h3>
          <p className="mt-1 text-sm text-gray-500">
            This is a placeholder for the Committee page.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Content for this page is yet to be designed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommitteePage; 