import React from 'react';
import { Info } from 'lucide-react'; // Use lucide icon

interface InfoBoxProps {
  title?: string;
  message: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, message }) => {
  return (
    <div className="flex items-start gap-3 p-4 mt-3 bg-blue-50 rounded-md border-l-4 border-blue-500">
      <div className="text-blue-500 shrink-0 mt-0.5">
        <Info className="w-5 h-5" />
      </div>
      <div>
        {title && <h4 className="text-sm font-semibold mb-1 text-blue-800">{title}</h4>}
        <p className="text-sm m-0 text-blue-700">{message}</p>
      </div>
    </div>
  );
}; 