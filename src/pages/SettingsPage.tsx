import React, { useState } from 'react';
import ProfileTab from '../components/settings/ProfileTab'; // Adjusted path
import NotificationsTab from '../components/settings/NotificationsTab'; // Adjusted path
import SecurityTab from '../components/settings/SecurityTab'; // Adjusted path
import { cn } from '../utils/cn'; // Import cn utility

// Renamed component
export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Default to profile

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Account Settings
        </h1>
        <p className="mt-1 text-gray-600">
          Manage your personal details, notification preferences, and security settings
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        {/* Updated Tab Navigation */}
         <div className="px-4 py-3 border-b border-gray-200">
           <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs">
             {tabs.map((tab) => (
               <button
                 key={tab.id}
                 onClick={() => setActiveTab(tab.id)}
                 className={cn(
                   'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
                   activeTab === tab.id
                     ? 'bg-brand-light text-brand-primary'
                     : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                 )}
                 aria-current={activeTab === tab.id ? 'page' : undefined}
               >
                 {tab.label}
               </button>
             ))}
           </nav>
         </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
        </div>
      </div>
    </div>
  );
};

// export default SettingsPage; // Optional default export 