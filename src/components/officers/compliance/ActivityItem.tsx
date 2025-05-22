import React from 'react';
import { ActivityItem as ActivityItemType } from '@/data/officerActivities';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  activity: ActivityItemType;
  className?: string;
  isCompleted?: boolean;
}

const actionStyles = {
  'view': 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
  'continue': 'bg-blue-500 text-white hover:bg-blue-600',
  'start': 'bg-blue-500 text-white hover:bg-blue-600',
  'monitor': 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
  'manage': 'bg-blue-500 text-white hover:bg-blue-600',
  'update': 'bg-blue-500 text-white hover:bg-blue-600',
};

export const ActivityItem: React.FC<ActivityItemProps> = ({ 
  activity, 
  className,
  isCompleted = false
}) => {
  return (
    <div 
      className={cn(
        'py-2.5 px-4 flex justify-between items-center hover:bg-gray-50 transition-colors',
        isCompleted && 'completed hidden',
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">{activity.title}</h4>
          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
            {activity.id}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{activity.description}</p>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <StatusBadge status={activity.status} />
        <Button 
          size="sm"
          variant="outline"
          className={cn(
            'text-xs px-3 py-1 h-7',
            actionStyles[activity.action as keyof typeof actionStyles]
          )}
        >
          {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
        </Button>
      </div>
    </div>
  );
};

export default ActivityItem; 