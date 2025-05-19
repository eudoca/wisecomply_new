import React from 'react';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { FileCheckIcon, FileEditIcon, AlertTriangleIcon, DownloadIcon, CheckCircleIcon, BarChart3Icon, ArrowRightIcon } from 'lucide-react';

// Add a new interface for the completion statistics
interface ConstitutionStatusProps {
  completionStats?: {
    totalSectionsCompleted: number;
    totalSections: number;
    completedCompulsorySections: number;
    totalCompulsorySections: number;
    overallPercentage: number;
  };
  onActionClick?: (action: 'start' | 'continue' | 'download') => void;
}

const ConstitutionStatus: React.FC<ConstitutionStatusProps> = ({ completionStats, onActionClick }) => {
  // Placeholder for actual data
  const lastUpdated = 'January 15, 2025';
  const isCompliant = false;
  const constitutionUrl = '/path/to/your/constitution.pdf'; // Replace with actual URL or download logic

  // Default stats if props not provided
  const stats = completionStats || {
    totalSectionsCompleted: 0,
    totalSections: 53, // Sum of all sub-sections (9+8+5+7+4+9+1+3+1+3+1+2)
    completedCompulsorySections: 0,
    totalCompulsorySections: 18, // Total mandatory fields from all blocks
    overallPercentage: 0
  };

  const handleDownload = () => {
    // Implement download logic or link click
    if (onActionClick) {
      onActionClick('download');
    } else {
      window.open(constitutionUrl, '_blank');
      console.log('Downloading constitution...');
    }
  };

  // Determine the status message and action based on completion
  const getStatusInfo = () => {
    if (stats.overallPercentage === 100 && isCompliant) {
      return {
        icon: <CheckCircleIcon className="h-5 w-5 text-green-500" />,
        color: 'text-green-800',
        label: 'Complete & Compliant',
        message: 'Your constitution meets all requirements and is ready to use.',
        actionLabel: 'Download Final PDF',
        actionIcon: <DownloadIcon className="h-4 w-4" />,
        actionVariant: 'default',
        actionHandler: handleDownload
      };
    } else if (stats.overallPercentage >= 75) {
      return {
        icon: <FileEditIcon className="h-5 w-5 text-amber-500" />,
        color: 'text-amber-800',
        label: 'Almost Complete',
        message: `You're nearly there! Complete the remaining ${stats.totalCompulsorySections - stats.completedCompulsorySections} required fields.`,
        actionLabel: 'Continue Editing',
        actionIcon: <ArrowRightIcon className="h-4 w-4" />,
        actionVariant: 'outline' as const,
        actionHandler: () => onActionClick ? onActionClick('continue') : console.log('Continue editing')
      };
    } else if (stats.overallPercentage > 0) {
      return {
        icon: <FileEditIcon className="h-5 w-5 text-purple-500" />,
        color: 'text-purple-800',
        label: 'In Progress',
        message: 'Continue completing sections to build your constitution.',
        actionLabel: 'Continue Editing',
        actionIcon: <ArrowRightIcon className="h-4 w-4" />,
        actionVariant: 'outline' as const,
        actionHandler: () => onActionClick ? onActionClick('continue') : console.log('Continue editing')
      };
    } else {
      return {
        icon: <AlertTriangleIcon className="h-5 w-5 text-gray-500" />,
        color: 'text-gray-800',
        label: 'Not Started',
        message: 'Begin building your constitution by completing the sections below.',
        actionLabel: 'Start Now',
        actionIcon: <ArrowRightIcon className="h-4 w-4" />,
        actionVariant: 'default' as const,
        actionHandler: () => onActionClick ? onActionClick('start') : console.log('Start building')
      };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Constitution Status
            </h2>
            <p className="text-sm text-gray-500">
              Last updated: {lastUpdated}
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
            className="flex items-center gap-1 self-start"
          >
            <DownloadIcon className="h-4 w-4" />
            Download Current Draft
          </Button>
        </div>
        
        {/* Progress Bar with Percentage */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-semibold text-gray-900">{stats.overallPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-in-out ${
                stats.overallPercentage >= 100 ? 'bg-green-500' :
                stats.overallPercentage >= 75 ? 'bg-amber-500' :
                stats.overallPercentage > 0 ? 'bg-purple-600' : 'bg-gray-400'
              }`} 
              style={{ width: `${stats.overallPercentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* Completion Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Sections Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Sections</h3>
              <span className="text-lg font-semibold text-gray-900">{stats.totalSectionsCompleted}/{stats.totalSections}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500"
                style={{ width: `${(stats.totalSectionsCompleted / stats.totalSections) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Complete all sections for a comprehensive constitution
            </p>
          </div>
          
          {/* Required Fields Card */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Required Fields</h3>
              <span className="text-lg font-semibold text-gray-900">{stats.completedCompulsorySections}/{stats.totalCompulsorySections}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500"
                style={{ width: `${(stats.completedCompulsorySections / stats.totalCompulsorySections) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              All required fields must be completed for compliance
            </p>
          </div>
        </div>
        
        {/* Status Banner */}
        <div className={`rounded-lg p-4 flex items-start ${
          isCompliant ? "bg-green-50 border border-green-200" :
          stats.overallPercentage >= 75 ? "bg-amber-50 border border-amber-200" :
          stats.overallPercentage > 0 ? "bg-purple-50 border border-purple-200" :
          "bg-gray-50 border border-gray-200"
        }`}>
          <div className="mt-0.5 mr-3 flex-shrink-0">
            {statusInfo.icon}
          </div>
          <div className="flex-1">
            <h3 className={`text-base font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </h3>
            <p className="mt-1 text-sm text-gray-700">
              {statusInfo.message}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <Button 
              variant={statusInfo.actionVariant}
              size="sm"
              onClick={statusInfo.actionHandler}
              className="flex items-center gap-1"
            >
              {statusInfo.actionIcon}
              {statusInfo.actionLabel}
            </Button>
          </div>
        </div>
        
        {/* Compliance Status - only show if not already shown in status banner */}
        {!isCompliant && stats.overallPercentage === 100 && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-4">
            <div className="flex">
              <AlertTriangleIcon className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-base font-medium text-red-800">
                  Not Compliant with 2022 Act
                </h3>
                <p className="mt-1 text-sm text-red-700">
                  Your constitution does not currently meet all requirements of the Incorporated Societies Act 2022. Please review the highlighted sections.
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