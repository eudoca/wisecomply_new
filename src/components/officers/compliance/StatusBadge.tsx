import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { ActivityStatus } from '@/data/officerActivities';

interface StatusBadgeProps {
  status: ActivityStatus;
  className?: string;
}

const statusConfig = {
  'completed': {
    icon: CheckCircle,
    text: 'Completed',
    className: 'bg-green-50 text-green-700 border-green-200'
  },
  'action-required': {
    icon: AlertCircle,
    text: 'Action Required',
    className: 'bg-red-50 text-red-700 border-red-200'
  },
  'ongoing': {
    icon: Activity,
    text: 'Ongoing',
    className: 'bg-blue-50 text-blue-700 border-blue-200'
  }
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium',
        config.className,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 mr-1" />
      <span>{config.text}</span>
    </div>
  );
};

export default StatusBadge; 