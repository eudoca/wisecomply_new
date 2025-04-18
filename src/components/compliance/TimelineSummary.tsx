import React from 'react';
import StatusIndicator from './StatusIndicator'; // Path is now correct
import { FlagIcon } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Initial Assessment',
    status: 'completed',
    date: '15/06/2023'
  },
  {
    id: 2,
    title: 'Risk Analysis',
    status: 'completed',
    date: '30/07/2023'
  },
  {
    id: 3,
    title: 'Strategy Development',
    status: 'in-progress',
    date: '22/09/2023'
  },
  {
    id: 4,
    title: 'Implementation',
    status: 'upcoming',
    date: '15/11/2023'
  },
  {
    id: 5,
    title: 'Verification',
    status: 'upcoming',
    date: '10/01/2024'
  }
];

const TimelineSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-sm font-medium text-gray-500 mb-6">
        Compliance Journey Progress
      </h2>
      <div className="relative">
        {/* Connection lines */}
        <div className="absolute top-10 left-0 right-[8%] h-0.5 bg-gray-200" />
        <div className="absolute top-10 right-[8%] h-0.5 w-[8%] bg-gray-200 border-r-2 border-dashed border-gray-300" />
        
        {/* Timeline items */}
        <div className="relative flex">
          {/* Regular timeline items */}
          <div className="flex justify-between" style={{ width: '92%' }}>
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex flex-col items-center relative" style={{ width: `${100 / activities.length}%` }}>
                {/* Date */}
                <div className="text-xs text-gray-500 mb-2">
                  {activity.date}
                </div>
                {/* Status Indicator */}
                <div className="mb-2">
                  <StatusIndicator status={activity.status as any} size="md" />
                </div>
                {/* Title and Number */}
                <div className="text-center">
                  <div className="font-medium text-sm text-gray-900">
                    {index + 1}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 whitespace-nowrap">
                    {activity.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* AGM Deadline marker */}
          <div className="flex flex-col items-center relative" style={{ width: '8%' }}>
            <div className="text-xs text-gray-500 mb-2">15/03/2024</div>
            <div className="mb-2">
              <div className="w-6 h-6 rounded-full border-2 border-red-500 bg-white flex items-center justify-center">
                <FlagIcon className="w-3 h-3 text-red-500" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs font-medium text-red-500 whitespace-nowrap">
                AGM Deadline
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSummary; 