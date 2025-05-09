import React from 'react';
import { Button } from '@/components/ui/button'; // Standardized path
import StatusBadge from './StatusBadge'; // Import StatusBadge from the same directory
import { FileCheckIcon, FileEditIcon, AlertTriangleIcon, DownloadIcon, CheckCircleIcon } from 'lucide-react';

const ConstitutionStatus: React.FC = () => {
  // Placeholder for actual data
  const lastUpdated = 'January 15, 2025';
  const isCompliant = false;
  const constitutionUrl = '/path/to/your/constitution.pdf'; // Replace with actual URL or download logic

  const handleDownload = () => {
    // Implement download logic or link click
    window.open(constitutionUrl, '_blank');
    console.log('Downloading constitution...');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          Constitution Status
        </h2>
        <div className="flex justify-between items-start mb-6 gap-4 flex-wrap">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Current Constitution
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Last updated: {lastUpdated}
            </p>
          </div>
          <Button 
             variant="outline" 
             size="sm" 
             onClick={handleDownload}
             leftIcon={<DownloadIcon className="h-4 w-4" />}
           >
            Download PDF
          </Button>
        </div>
        
        {isCompliant ? (
          <div className="bg-green-50 border border-green-100 rounded-lg p-4">
            <div className="flex">
              <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-base font-medium text-green-800">
                  Compliant with 2022 Act
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  Your constitution meets all requirements of the Incorporated Societies Act 2022.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="flex">
              <AlertTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-base font-medium text-red-800">
                  Not currently compliant with 2022 Act
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  Your constitution does not currently meet the requirements of the Incorporated Societies Act 2022.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConstitutionStatus; 