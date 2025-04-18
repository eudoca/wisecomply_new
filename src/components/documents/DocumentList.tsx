import React, { useState } from 'react';
import DocumentCard from './DocumentCard'; // Path will be correct within the same directory
import { cn } from '../../utils/cn'; // Ensure correct path

const tabs = [
  { id: 'all', label: 'All Documents' },
  { id: 'policies', label: 'Policies' },
  { id: 'governance', label: 'Governance' },
  { id: 'minutes', label: 'Minutes' },
  { id: 'needs-review', label: 'Needs Review' },
];

// Sample data - replace with actual data fetching later
const documents = [
  {
    id: 1,
    title: 'Constitution',
    type: 'Governance',
    updatedAt: '15 Jan 2025',
    status: 'current',
  },
  {
    id: 2,
    title: 'Health and Safety Policy',
    type: 'Policies',
    updatedAt: '30 Nov 2024',
    status: 'current',
  },
  {
    id: 3,
    title: 'Privacy Policy',
    type: 'Policies',
    updatedAt: '22 Oct 2024',
    status: 'needs-review',
  },
  {
    id: 4,
    title: 'Committee Meeting Minutes - March 2025',
    type: 'Minutes',
    updatedAt: '10 Mar 2025',
    status: 'current',
  },
];

const DocumentList: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Filter documents based on active tab (example)
  const filteredDocuments = documents.filter((doc) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'needs-review') return doc.status === 'needs-review';
    return doc.type.toLowerCase() === activeTab;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-200">
        <nav className="flex space-x-2" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
                activeTab === tab.id
                  ? 'bg-brand-light text-brand-primary' // Use brand colors from config
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredDocuments.length > 0 ? (
          filteredDocuments.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))
        ) : (
          <p className="text-center text-gray-500 p-6">No documents found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default DocumentList; 