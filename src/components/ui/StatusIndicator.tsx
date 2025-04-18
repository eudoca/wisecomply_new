import React from 'react';
import { cn } from '../../utils/cn';

type StatusType = 'completed' | 'in-progress' | 'upcoming' | 'overdue' | 'pending' | 'approved' | 'rejected';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const statusConfig: Record<StatusType, { color: string, label: string }> = {
  'completed': { color: 'bg-green-500', label: 'Completed' },
  'in-progress': { color: 'bg-blue-500', label: 'In Progress' },
  'upcoming': { color: 'bg-purple-500', label: 'Upcoming' },
  'overdue': { color: 'bg-red-500', label: 'Overdue' },
  'pending': { color: 'bg-yellow-500', label: 'Pending' },
  'approved': { color: 'bg-green-500', label: 'Approved' },
  'rejected': { color: 'bg-red-500', label: 'Rejected' }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'md',
  showLabel = false,
  className
}) => {
  const { color, label } = statusConfig[status];
  
  const sizeStyles = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  return (
    <div className={cn("flex items-center", className)}>
      <div className={cn(
        'rounded-full',
        color,
        sizeStyles[size]
      )} />
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">{label}</span>
      )}
    </div>
  );
};

export default StatusIndicator;