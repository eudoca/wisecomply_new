import React from 'react';
import { UsersIcon, CheckCircleIcon, BarChartIcon, TrendingUpIcon } from 'lucide-react'; // Updated icons

const MembershipStats: React.FC = () => {
  // Sample data - replace with actual API data
  const totalMembers = 60;
  const activeMembers = 53;
  const changeSinceLastMonth = 3;
  const duesCollected = 1275;
  const totalDues = 1500; // Example total possible dues

  const activePercentage = totalMembers > 0 ? ((activeMembers / totalMembers) * 100).toFixed(0) : 0;
  const duesPercentage = totalDues > 0 ? ((duesCollected / totalDues) * 100).toFixed(0) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Members Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Members</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">{totalMembers}</p>
            <div className="flex items-center mt-2">
               <TrendingUpIcon className={`w-4 h-4 mr-1 ${changeSinceLastMonth >= 0 ? 'text-green-500' : 'text-red-500'}`} /> 
               <span className={`text-sm font-medium ${changeSinceLastMonth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                 {changeSinceLastMonth >= 0 ? `+${changeSinceLastMonth}` : changeSinceLastMonth}
              </span>
              <span className="text-gray-500 text-sm ml-1">
                since last month
              </span>
            </div>
          </div>
           <div className="bg-blue-100 rounded-md p-2">
             <UsersIcon className="w-5 h-5 text-blue-600" />
           </div>
        </div>
      </div>

      {/* Active Members Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Members</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">{activeMembers}</p>
             <p className="text-gray-500 text-sm mt-2">
              {activePercentage}% of total membership
            </p>
          </div>
           <div className="bg-green-100 rounded-md p-2">
             <CheckCircleIcon className="w-5 h-5 text-green-600" />
           </div>
        </div>
      </div>

      {/* Dues Collection Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">Annual Dues Collection</p>
            <p className="text-3xl font-semibold text-gray-900 mt-1">${duesCollected.toLocaleString()}</p>
             <p className="text-gray-500 text-sm mt-2">
              {duesPercentage}% collected
            </p>
          </div>
           <div className="bg-purple-100 rounded-md p-2">
             <BarChartIcon className="w-5 h-5 text-purple-600" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStats; 