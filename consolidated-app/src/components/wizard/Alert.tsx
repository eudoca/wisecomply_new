import React from 'react';
import { AlertTriangle, Info, XCircle } from 'lucide-react'; // Use lucide icons

interface AlertProps {
  type: 'warning' | 'error' | 'info';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const types = {
    warning: {
      classes: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700',
      icon: <AlertTriangle className="text-yellow-500 w-5 h-5" />,
    },
    error: {
      classes: 'bg-red-50 border-l-4 border-red-500 text-red-700',
      icon: <XCircle className="text-red-500 w-5 h-5" />,
    },
    info: {
      classes: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
      icon: <Info className="text-blue-500 w-5 h-5" />,
    }
  };

  const alertConfig = types[type];

  return (
    <div className={`flex items-start gap-3 p-3 rounded-md mt-2 ${alertConfig.classes}`}>
      <span className="mt-0.5 shrink-0">{alertConfig.icon}</span>
      <p className="text-sm m-0">{message}</p>
    </div>
  );
}; 