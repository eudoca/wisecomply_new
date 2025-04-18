import React, { useState } from 'react';
import ActivityLog from './ActivityLog'; // Import from same directory
import { Button } from '../ui/Button'; // Import shared Button

// Simple toggle component (copied from NotificationsTab, consider extracting to ui/)
const ToggleSwitch: React.FC<{ label: string; description: string; defaultChecked?: boolean }> = (
   { label, description, defaultChecked = false }
 ) => {
   const [isChecked, setIsChecked] = useState(defaultChecked);
 
   return (
     <div className="flex items-center justify-between py-4">
       <div className="flex flex-col">
         <label htmlFor={label} className="block text-sm font-medium text-gray-900 cursor-pointer">
           {label}
         </label>
         <p className="text-sm text-gray-500">
           {description}
         </p>
       </div>
       <label className="relative inline-flex items-center cursor-pointer ml-4 flex-shrink-0">
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


const SecurityTab = () => {
   // Placeholder handlers
   const handleChangePassword = () => {
     alert('Change Password functionality not implemented.');
   };
   
   const handleSaveSecuritySettings = () => {
      alert('Security settings saved (simulated).');
   };

  return (
    <div className="space-y-8">
      {/* Security Settings Section */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-6">
          Security Settings
        </h2>
        <div className="space-y-6">
          <Button variant="outline" onClick={handleChangePassword} className="w-full justify-start">
              Change Password
          </Button>
          
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <ToggleSwitch
                 label="Two-Factor Authentication (2FA)"
                 description="Add an extra layer of security to your account."
                 defaultChecked={false} // Default to off for example
               />
          </div>
        </div>
         <div className="mt-8 pt-5 border-t border-gray-200 flex justify-end">
           <Button onClick={handleSaveSecuritySettings}>
             Save Security Settings
           </Button>
         </div>
      </div>

      {/* Activity Log Section */}
      <div className="pt-8 border-t border-gray-200">
        <ActivityLog />
      </div>
    </div>
  );
};

export default SecurityTab; 