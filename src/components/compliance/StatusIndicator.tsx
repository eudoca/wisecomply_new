import React from 'react';
import { CheckIcon } from 'lucide-react';

type Status = 'completed' | 'in-progress' | 'upcoming';

interface StatusIndicatorProps {
  status: Status;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  size = 'sm',
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const getStatusClasses = () => {
    switch (status) {
      case 'completed':
        return 'bg-purple-600 text-white';
      case 'in-progress':
        return 'border-2 border-purple-600 bg-white';
      case 'upcoming':
        return 'bg-gray-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'upcoming':
        return 'Upcoming';
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} rounded-full ${getStatusClasses()} flex items-center justify-center`}>
        {status === 'completed' && <CheckIcon className="w-3 h-3" />}
      </div>
      {showLabel && <span className="text-sm text-gray-600">{getStatusLabel()}</span>}
    </div>
  );
};

export default StatusIndicator; 