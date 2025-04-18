import React from 'react';
import { Link } from 'react-router-dom';
import { LogOutIcon, SettingsIcon } from 'lucide-react';
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
    <header className="bg-brand-primary border-b border-brand-dark h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        {/* Left side - empty or could contain page title or breadcrumbs */}
      </div>
      
      <div className="flex items-center space-x-4">
        <Link to="/settings">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-white hover:text-white hover:bg-brand-dark flex items-center gap-2"
          >
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </Link>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleLogout}
          className="text-white hover:text-white hover:bg-brand-dark flex items-center gap-2"
        >
          <LogOutIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
        
        <div className="flex items-center space-x-3 pl-3 border-l border-brand-dark">
          <div>
            <p className="text-sm font-medium text-white text-right">{user.name}</p>
            <p className="text-xs text-white text-right opacity-80">{user.organization}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="text-brand-primary font-medium text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}; 