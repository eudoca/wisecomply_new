import React from 'react';
import { ClipboardListIcon, BookOpenIcon, WandIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  { id: 'activities', label: 'Compliance Activities', icon: ClipboardListIcon },
  { id: 'obligations', label: 'Compliance Obligations', icon: BookOpenIcon },
  { id: 'wizard', label: 'Change my wizard answers', icon: WandIcon },
];

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="px-4 py-3 border-b border-gray-200">
      <nav className="flex space-x-2 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-brand-primary',
                activeTab === tab.id
                  ? 'bg-brand-light text-brand-primary'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              )}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              leftIcon={<Icon className="w-4 h-4" />}
            >
              {tab.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default TabNavigation; 