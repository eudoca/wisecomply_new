import React from 'react';
import DocumentList from '../components/documents/DocumentList'; // Adjusted import path
import SearchBar from '../components/documents/SearchBar'; // Adjusted import path

// Renamed component
export const DocumentsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Document Management
        </h1>
        <p className="mt-1 text-gray-600">
          Create, store, and manage all your organisation's documents in one place
        </p>
      </div>
      <div className="space-y-6">
        <SearchBar />
        <DocumentList />
      </div>
    </div>
  );
};

// Optional default export if needed later
// export default DocumentsPage; 