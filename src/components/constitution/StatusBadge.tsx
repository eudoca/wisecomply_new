import React from 'react';
import { cn } from '../../utils/cn'; // Corrected path

interface StatusBadgeProps {
  status: 'compliant' | 'needs-attention' | 'non-compliant';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles = {
    compliant: 'bg-green-100 text-green-800',
    'needs-attention': 'bg-yellow-100 text-yellow-800',
    'non-compliant': 'bg-red-100 text-red-800',
  };
  
  const labels = {
    compliant: 'Compliant',
    'needs-attention': 'Needs Attention',
    'non-compliant': 'Non-Compliant',
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', 
        styles[status]
      )}
    >
      {labels[status]}
    </span>
  );
};

export default StatusBadge; 