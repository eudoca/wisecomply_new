import React from 'react';
import StatusIndicator from './StatusIndicator';
import { FlagIcon } from 'lucide-react';

// Updated timeline data structure
const timelineItems = [
  {
    id: 'step1', type: 'step', title: 'Planning', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step2', type: 'step', title: 'Committee Setup', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step3', type: 'step', title: 'Contact Person', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step4', type: 'step', title: 'Membership', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step5', type: 'step', title: 'Registers', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step6', type: 'step', title: 'Constitution Dev', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'step7', type: 'step', title: 'Member Approval', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'agm', type: 'deadline', title: 'AGM Deadline', status: 'deadline', date: 'TBC' // Inserted AGM Deadline
  },
  {
    id: 'step8', type: 'step', title: 'Final Details', status: 'upcoming', date: 'TBC'
  },
  {
    id: 'submission', type: 'deadline', title: 'Submission Deadline', status: 'deadline', date: 'TBC' // Added Submission Deadline
  }
];

const TimelineSummary: React.FC = () => {
  const totalItems = timelineItems.length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-sm font-medium text-gray-500 mb-6">
        Compliance Journey Progress
      </h2>
      <div className="relative pt-6"> {/* Added padding top for dates */}
        {/* Connection line - Adjust width dynamically based on item count */}
        <div className="absolute top-10 left-0 right-0 h-0.5 bg-gray-200" style={{ width: `${( (totalItems - 1) / totalItems ) * 100}%` }} /> 
        
        {/* Timeline items container */}
        <div className="relative flex justify-between">
          {timelineItems.map((item, index) => {
            const isDeadline = item.type === 'deadline';
            const stepNumber = timelineItems.slice(0, index + 1).filter(i => i.type === 'step').length; // Calculate step number dynamically
            
            return (
              <div 
                key={item.id} 
                className="flex flex-col items-center relative text-center" 
                style={{ width: `${100 / totalItems}%` }} // Distribute width evenly
              >
                {/* Date */}
                <div className="text-xs text-gray-500 mb-2">
                  {item.date}
                </div>
                {/* Status Indicator or Deadline Icon */}
                <div className="mb-2 h-6 w-6 flex items-center justify-center"> {/* Ensure consistent height */}
                  {isDeadline ? (
                    <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-white flex items-center justify-center">
                      <FlagIcon className="w-3 h-3 text-red-500" />
                    </div>
                  ) : (
                    <StatusIndicator status={item.status as any} size="md" />
                  )}
                </div>
                {/* Title and Number (if applicable) */}
                <div className="text-center">
                  {!isDeadline && (
                    <div className="font-medium text-sm text-gray-900">
                      {stepNumber} {/* Display dynamic step number */}
                    </div>
                  )}
                  <div className={`text-xs mt-1 whitespace-nowrap ${isDeadline ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineSummary; 