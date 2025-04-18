import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookIcon, FileTextIcon, UsersIcon, UserCogIcon, MessageSquareIcon, CalendarIcon, SettingsIcon, ClipboardListIcon, LayoutDashboardIcon, VoteIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   path: '/dashboard',
  //   icon: <LayoutDashboardIcon className="w-5 h-5" />
  // }, // Removed Dashboard Link
  {
    id: 'compliance',
    title: 'Compliance Activities',
    path: '/compliance',
    icon: <ClipboardListIcon className="w-5 h-5" />
  },
  {
    id: 'constitution',
    title: 'Constitution Management',
    path: '/constitution',
    icon: <BookIcon className="w-5 h-5" />
  },
  {
    id: 'documents',
    title: 'Document Management',
    path: '/documents',
    icon: <FileTextIcon className="w-5 h-5" />
  },
  {
    id: 'officers',
    title: 'Officer Management',
    path: '/officers',
    icon: <UserCogIcon className="w-5 h-5" />
  },
  {
    id: 'membership',
    title: 'Membership Management',
    path: '/membership',
    icon: <UsersIcon className="w-5 h-5" />
  },
  {
    id: 'disputes',
    title: 'Dispute Management',
    path: '/disputes',
    icon: <MessageSquareIcon className="w-5 h-5" />
  },
  {
    id: 'meetings',
    title: 'Meetings Management',
    path: '/meetings',
    icon: <VoteIcon className="w-5 h-5" />
  },
  {
    id: 'calendar',
    title: 'Calendar Management',
    path: '/calendar',
    icon: <CalendarIcon className="w-5 h-5" />
  },
  {
    id: 'advice',
    title: 'Advice and Support',
    path: '/advice',
    icon: <MessageSquareIcon className="w-5 h-5" />
  }
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 flex justify-center">
        <Link to="/" className="flex items-center">
          <img src="/wisecomply-logo.png" alt="WiseComply Logo" className="h-14 w-auto" />
        </Link>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 pt-8">
        <div className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2.5 mb-1 text-sm font-medium rounded-md transition-colors",
                currentPath === item.path
                  ? "bg-brand-light text-brand-primary"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <span className={cn(currentPath === item.path ? "text-brand-primary" : "text-gray-400")}>
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center">
              <span className="text-brand-primary font-medium text-sm">JD</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 truncate">Acme Organisation</p>
          </div>
          <Link to="/settings" className="p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <SettingsIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};