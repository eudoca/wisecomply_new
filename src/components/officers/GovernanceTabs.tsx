import React from 'react';
import { cn } from '../../utils/cn'; // Ensure correct path

interface Tab {
  id: string;
  label: string;
}

interface GovernanceTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  tabs?: Tab[];
}

// Default tabs array with numbered labels
const defaultTabs: Tab[] = [
  { id: 'officer-register', label: '1. Officer Register' },
  { id: 'interests-register', label: '2. Interests Register' },
  // { id: 'committees', label: 'Committees' },
  // { id: 'governance-tasks', label: 'Governance Tasks' },
];

const GovernanceTabs: React.FC<GovernanceTabsProps> = ({ activeTab, onTabChange, className, tabs }) => {
  const tabItems = tabs || defaultTabs;
  
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", className)}>
      <nav className="flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {tabItems.map((tab: Tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
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
  );
};

export default GovernanceTabs; 