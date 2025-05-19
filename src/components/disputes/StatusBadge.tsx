import React from 'react';
import { cn } from '@/utils/cn'; // Use path alias

interface StatusBadgeProps {
  status: string; // Use a broader type or refine based on actual statuses
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusStyles = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'investigation':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Capitalize first letter for display
  const displayStatus = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        getStatusStyles(status)
      )}
    >
      {displayStatus}
    </span>
  );
};

export default StatusBadge; 