import React from 'react';
import { HomeIcon, BookOpenIcon, AlertCircleIcon, FileTextIcon, SettingsIcon, HelpCircleIcon } from 'lucide-react';

// Note: Renamed from default export to named export
export const AdviceNavigation = () => { // Renamed component to avoid conflict
  const menuItems = [{
    icon: HomeIcon,
    label: 'Dashboard' // This seems redundant if Dashboard is removed? Keep for now.
  }, {
    icon: BookOpenIcon,
    label: 'Knowledge Base'
  }, {
    icon: AlertCircleIcon,
    label: 'Compliance'
  }, {
    icon: FileTextIcon,
    label: 'Documents'
  }, {
    icon: SettingsIcon,
    label: 'Settings'
  }, {
    icon: HelpCircleIcon,
    label: 'Help'
  }];
  return <nav className="w-64 border-r border-gray-200 bg-white">
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
          const Icon = item.icon;
          return <li key={index}>
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-purple-50 hover:text-purple-800 rounded-lg">
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>;
        })}
        </ul>
      </div>
    </nav>;
};
// export default Navigation; // Removed default export 