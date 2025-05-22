import React from 'react';
import { ActivityGroup as ActivityGroupType } from '@/data/officerActivities';
import { ActivityItem } from './ActivityItem';
import { cn } from '@/lib/utils';
import { 
  ClipboardList, 
  Users, 
  Settings, 
  FileText,
  ClipboardCheck
} from 'lucide-react';

interface ActivityGroupProps {
  group: ActivityGroupType;
  className?: string;
  showCompleted?: boolean;
}

const groupIcons = {
  'records': ClipboardList,
  'members': Users,
  'management': Settings,
  'compliance': FileText,
  'tasks': ClipboardCheck,
};

export const ActivityGroup: React.FC<ActivityGroupProps> = ({ 
  group, 
  className,
  showCompleted = false
}) => {
  const IconComponent = groupIcons[group.id as keyof typeof groupIcons] || ClipboardList;

  return (
    <div className={cn('bg-gray-50/80 rounded-lg border border-gray-200', className)}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-gray-500" />
          <h3 className="text-base font-medium text-gray-900">{group.title}</h3>
        </div>
      </div>
      
      {/* Activities List */}
      <div className="divide-y divide-gray-200">
        {group.activities.map((activity) => (
          <ActivityItem 
            key={`${activity.id}-${activity.title}`}
            activity={activity}
            isCompleted={activity.status === 'completed' && !showCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityGroup; 