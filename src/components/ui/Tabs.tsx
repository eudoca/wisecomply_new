import React from 'react';
import { cn } from '../../utils/cn';

export interface Tab {
  id: string;
  label: string;
}

export interface TabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: Tab[];
  className?: string;
  containerClassName?: string;
}

export const Tabs: React.FC<TabsProps> = ({ 
  activeTab, 
  onTabChange, 
  tabs, 
  className,
  containerClassName
}) => {
  return (
    <div className={cn("px-6 py-4 border-b border-gray-200", containerClassName)}>
      <nav className={cn("flex space-x-4 overflow-x-auto", className)} aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-5 py-2.5 rounded-md text-sm font-medium whitespace-nowrap transition-all',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset',
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