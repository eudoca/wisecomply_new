import React from 'react';
import { LaptopIcon, SmartphoneIcon } from 'lucide-react'; // Import icons

const ActivityLog = () => {
  // Sample data - replace with actual data
  const activities = [
    {
      id: 1,
      date: '12 Apr 2024',
      time: '14:30',
      deviceType: 'desktop',
      device: 'Chrome on MacOS',
      location: 'Wellington, New Zealand',
    },
    {
      id: 2,
      date: '10 Apr 2024',
      time: '09:15',
      deviceType: 'mobile',
      device: 'Safari on iPhone',
      location: 'Wellington, New Zealand',
    },
     {
      id: 3,
      date: '08 Apr 2024',
      time: '17:55',
      deviceType: 'desktop',
      device: 'Firefox on Windows',
      location: 'Auckland, New Zealand',
    },
  ];

  const getDeviceIcon = (deviceType: string) => {
    if (deviceType === 'mobile') {
        return <SmartphoneIcon className="w-4 h-4 text-gray-500 mr-2" />;
    }
    return <LaptopIcon className="w-4 h-4 text-gray-500 mr-2" />;
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Recent Account Activity
      </h2>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
         <ul className="divide-y divide-gray-200">
           {activities.map((activity) => (
             <li key={activity.id} className="px-6 py-4">
               <div className="flex justify-between items-start flex-wrap gap-2">
                 <div className="min-w-0">
                   <p className="text-sm font-medium text-gray-900">
                     {activity.date} at {activity.time}
                   </p>
                   <p className="text-sm text-gray-500 mt-1 flex items-center">
                     {getDeviceIcon(activity.deviceType)} 
                     {activity.device}
                   </p>
                 </div>
                 <span className="text-sm text-gray-500 flex-shrink-0">{activity.location}</span>
               </div>
             </li>
           ))}
         </ul>
      </div>
      {/* Optional: Add Load More button or pagination */}
    </div>
  );
};

export default ActivityLog; 