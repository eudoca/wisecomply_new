import React, { useState } from 'react';
import { Button } from '../ui/Button'; // Import shared Button

// Simple toggle component (could be extracted to ui/)
const ToggleSwitch: React.FC<{ label: string; description: string; defaultChecked?: boolean }> = (
   { label, description, defaultChecked = false }
 ) => {
   const [isChecked, setIsChecked] = useState(defaultChecked);
 
   return (
     <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
       <div>
         <label htmlFor={label} className="block text-sm font-medium text-gray-900 cursor-pointer">
           {label}
         </label>
         <p className="text-sm text-gray-500">
           {description}
         </p>
       </div>
       <label className="relative inline-flex items-center cursor-pointer">
         <input 
           id={label}
           type="checkbox" 
           className="sr-only peer" 
           checked={isChecked} 
           onChange={() => setIsChecked(!isChecked)} 
         />
         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
       </label>
     </div>
   );
 };

const NotificationsTab = () => {
  // In a real app, fetch current settings and handle save
  const handleSaveChanges = () => {
    alert('Notification settings saved (simulated).');
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        Notification Preferences
      </h2>
      <div className="space-y-4">
        <ToggleSwitch
          label="Email Notifications"
          description="Receive updates about meetings, decisions, and compliance tasks."
          defaultChecked={true}
        />
        <ToggleSwitch
          label="New Member Alerts"
          description="Get notified when a new member registers."
          defaultChecked={false}
        />
         <ToggleSwitch
          label="Document Update Alerts"
          description="Get notified when important documents are updated or need review."
          defaultChecked={true}
        />
      </div>
      {/* Action Button */}
      <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
        <Button onClick={handleSaveChanges}>
          Save Notification Preferences
        </Button>
      </div>
    </div>
  );
};

export default NotificationsTab; 