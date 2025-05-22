import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookIcon, 
  FileTextIcon, 
  UsersIcon, 
  UserCogIcon, 
  MessageSquareIcon, 
  CalendarIcon, 
  ClipboardListIcon, 
  BuildingIcon,
  Users2Icon,
  BarChart4Icon,
  ArchiveIcon,
  Bot,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface NavItem {
  id: string;
  title: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'compliance',
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />
  },
  {
    id: 'society-info',
    title: 'Society Information',
    path: '/society-info',
    icon: <BuildingIcon className="w-5 h-5" />
  },
  {
    id: 'officers',
    title: 'Officers and Committees',
    path: '/officers',
    icon: <UserCogIcon className="w-5 h-5" />
  },
  {
    id: 'meetings',
    title: 'Meetings',
    path: '/meetings',
    icon: <MessageSquareIcon className="w-5 h-5" />
  },
  {
    id: 'membership',
    title: 'Membership',
    path: '/membership',
    icon: <UsersIcon className="w-5 h-5" />
  },
  {
    id: 'disputes',
    title: 'Disputes',
    path: '/disputes',
    icon: <MessageSquareIcon className="w-5 h-5" />
  },
  {
    id: 'finances',
    title: 'Finances',
    path: '/finances',
    icon: <BarChart4Icon className="w-5 h-5" />
  },
  {
    id: 'constitution',
    title: 'Constitution',
    path: '/constitution',
    icon: <BookIcon className="w-5 h-5" />
  },
  {
    id: 'documents',
    title: 'Records',
    path: '/documents',
    icon: <ArchiveIcon className="w-5 h-5" />
  },
  {
    id: 'calendar',
    title: 'Society Calendar',
    path: '/calendar',
    icon: <CalendarIcon className="w-5 h-5" />
  },
  {
    id: 'advice',
    title: 'Ask WiseComply Ai',
    path: '/advice',
    icon: <Bot className="w-5 h-5" />
  }
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="bg-brand-primary border-b border-brand-dark h-16 flex items-center justify-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/wisecomply-logo.png" 
            alt="WiseComply Logo" 
            className="h-12 w-auto" 
          />
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
    </nav>
  );
};