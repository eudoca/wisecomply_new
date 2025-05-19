import React from 'react';
import { CheckCircleIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/cn'; // Corrected path

interface QualificationItem {
  status: 'verified' | 'warning';
  text: string;
  warning?: string;
}

interface QualificationStatusProps {
  items: QualificationItem[];
}

const QualificationStatus: React.FC<QualificationStatusProps> = ({ items }) => {
  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="flex-shrink-0">
          {item.status === 'verified' ? (
            <CheckCircleIcon className="w-4 h-4 text-green-500" aria-hidden="true" />
          ) : (
            <AlertCircleIcon className="w-4 h-4 text-yellow-500" aria-hidden="true" />
          )}
          </span>
          <span className="text-sm text-gray-600">
            <span className="font-medium">
              {item.status === 'verified' ? 'Verified' : 'Warning'}: 
            </span>
            {item.text}
          </span>
          {item.warning && <span className="text-sm text-yellow-700">({item.warning})</span>} 
        </div>
      ))}
    </div>
  );
};

export default QualificationStatus; 