import React from 'react';
import { Link } from 'react-router-dom';
import { LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  // In a real app, this would come from your auth context
  const user = {
    name: "John Doe",
    organization: "Acme Organisation"
  };
  
  const handleLogout = () => {
    // In a real app, this would handle logout logic
    console.log('Logging out...');
    window.location.href = '/';
  };
  
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center">
            <span className="text-brand-primary font-medium text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.organization}</p>
        </div>
        <Link 
          to="/settings/profile" 
          className="text-sm text-brand-primary hover:text-brand-dark ml-2"
        >
          Edit Profile
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
          >
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2"
        >
          <LogOutIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}; 