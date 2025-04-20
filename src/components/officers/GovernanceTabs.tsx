import React from 'react';
import { cn } from '../../utils/cn'; // Ensure correct path

interface Tab {
  id: string;
  label: string;
}

interface GovernanceTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

// Updated tabs array to remove Committees and Governance Tasks
const tabs: Tab[] = [
  { id: 'officers', label: 'Officers' },
  // { id: 'committees', label: 'Committees' },
  // { id: 'governance-tasks', label: 'Governance Tasks' },
];

const GovernanceTabs: React.FC<GovernanceTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="px-4 py-3">
      <nav className="flex space-x-2" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-3 py-1.5 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-purple-500',
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