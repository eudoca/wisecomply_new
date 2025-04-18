import React from 'react';
import { FileTextIcon, EyeIcon, DownloadIcon } from 'lucide-react';
import { Button } from '../ui/Button';

// Define the Document interface directly here or import from a types file
interface Document {
  id: number;
  title: string;
  type: string;
  updatedAt: string;
  status: string;
}

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Current
          </span>
        );
      case 'needs-review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Needs Review
          </span>
        );
      // Add more statuses as needed (e.g., 'archived', 'draft')
      default:
        return null;
    }
  };

  // Placeholder actions - replace with actual functionality
  const handleView = () => console.log('View document:', document.id);
  const handleDownload = () => console.log('Download document:', document.id);

  return (
    <div className="flex items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
          <FileTextIcon className="h-5 w-5 text-purple-600" />
        </div>
      </div>
      <div className="ml-4 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {document.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
              <span>{document.type}</span>
              <span className="text-gray-300">•</span>
              <span>Updated {document.updatedAt}</span>
            </div>
          </div>
          <div className="ml-2 flex-shrink-0">
             {getStatusBadge(document.status)}
          </div>
        </div>
      </div>
      <div className="ml-4 flex items-center space-x-1 flex-shrink-0">
        <Button variant="ghost" onClick={handleView} aria-label="View document" className="p-2">
          <EyeIcon className="h-5 w-5 text-gray-500" />
        </Button>
        <Button variant="ghost" onClick={handleDownload} aria-label="Download document" className="p-2">
          <DownloadIcon className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard; 