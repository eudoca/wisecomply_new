import React from 'react';
import { DocumentActivityDashboard } from '@/components/documents/DocumentActivityDashboard';
import DocumentList from '@/components/documents/DocumentList';
import SearchBar from '@/components/documents/SearchBar';
import { HomeIcon, ChevronRightIcon, Archive } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumb navigation */}
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="/" className="inline-flex items-center text-gray-500 hover:text-gray-700">
              <HomeIcon className="w-4 h-4 mr-2" />
              Dashboard
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-gray-600 md:ml-2 font-medium">Records and Documents</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Archive className="h-6 w-6 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-600">
            Records and Documents
          </h1>
        </div>
        <p className="text-base text-gray-600">
          Manage your society's statutory records and ensure compliance with the Incorporated Societies Act 2022.
        </p>
      </div>

      {/* Information box */}
      <div className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-200">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-900">Important Information</h3>
            <div className="mt-2 text-sm text-blue-800">
              <ul className="list-disc pl-5 space-y-1">
                <li>Keep your statutory records up to date and easily accessible</li>
                <li>Ensure timely submission of required documents and reports</li>
                <li>Maintain proper documentation of all society activities</li>
                <li>Process information requests from members promptly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Dashboard */}
      <div className="mb-8">
        <DocumentActivityDashboard />
      </div>

      {/* Document List Section */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Society Documents</h2>
        <div className="space-y-6">
          <SearchBar />
          <DocumentList />
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 