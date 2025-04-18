import React from 'react';
import { BuildingIcon, HashIcon, CalendarIcon, CheckCircleIcon } from 'lucide-react';

const SocietyDetails: React.FC = () => {
  // Mock data - in a real app this would come from props or context
  const societyDetails = {
    name: 'Wellington Community Sports Club',
    registrationNumber: '1234567',
    status: 'Active',
    incorporationDate: '15/03/2010',
    renewalDate: '15/03/2024'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-start justify-between">
        {/* Society Name and Registration */}
        <div className="flex-1 min-w-0 mr-6">
          <div className="flex items-center">
            <BuildingIcon className="w-5 h-5 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {societyDetails.name}
            </h2>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <HashIcon className="w-4 h-4 mr-1" />
            <span>Registration: {societyDetails.registrationNumber}</span>
          </div>
        </div>
        {/* Status Badge */}
        <div className="flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 mb-4 sm:mb-0">
          <CheckCircleIcon className="w-4 h-4 mr-1" />
          <span className="text-sm font-medium">{societyDetails.status}</span>
        </div>
      </div>
      {/* Key Dates */}
      <div className="flex flex-wrap mt-4 gap-4">
        <div className="flex items-center min-w-0">
          <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
          <div className="text-sm">
            <span className="text-gray-500">Incorporated: </span>
            <span className="font-medium text-gray-900">
              {societyDetails.incorporationDate}
            </span>
          </div>
        </div>
        <div className="flex items-center min-w-0">
          <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
          <div className="text-sm">
            <span className="text-gray-500">Renewal Due: </span>
            <span className="font-medium text-gray-900">
              {societyDetails.renewalDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyDetails; 