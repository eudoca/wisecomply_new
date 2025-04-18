import React from 'react';
import { AlertCircleIcon, CheckCircleIcon, ClockIcon } from 'lucide-react';
import { Button } from '../ui/Button'; // Import shared button
import { cn } from '../../utils/cn'; // Corrected path

interface ComplianceActivity {
  id: string;
  title: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
}

// Sample data - replace with actual data fetching later
const activities: ComplianceActivity[] = [
  {
    id: '1',
    title: 'Annual Officer Declaration Collection',
    dueDate: '2024-02-15',
    status: 'pending',
  },
  {
    id: '2',
    title: 'Committee Meeting Minutes Filing',
    dueDate: '2024-01-30',
    status: 'completed',
  },
  {
    id: '3',
    title: 'Officer Contact Details Update',
    dueDate: '2024-01-10',
    status: 'overdue',
  },
];

const ComplianceActivities: React.FC = () => {
  const getStatusIcon = (status: ComplianceActivity['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" aria-hidden="true" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" aria-hidden="true" />;
      case 'overdue':
        return <AlertCircleIcon className="w-5 h-5 text-red-500" aria-hidden="true" />;
    }
  };

  const getStatusStyle = (status: ComplianceActivity['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-800 bg-green-100';
      case 'pending':
        return 'text-yellow-800 bg-yellow-100';
      case 'overdue':
        return 'text-red-800 bg-red-100';
    }
  };
  
   const handleViewAll = () => {
    // Navigate to the full compliance activities page
    // This component might just show a summary
    console.log('Navigate to /compliance');
    // Example using react-router-dom (needs useNavigate hook):
    // navigate('/compliance'); 
    alert('Navigating to full compliance list...');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Upcoming Compliance Activities
        </h2>
         <Button variant="ghost" size="sm" onClick={handleViewAll}>
           View All
         </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div key={activity.id} className="border border-gray-100 rounded-lg p-4 flex items-start space-x-3 hover:shadow-md transition-shadow duration-150">
            <div className="flex-shrink-0 mt-1">
              {getStatusIcon(activity.status)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <div className="mt-1 flex items-center flex-wrap gap-x-2">
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    getStatusStyle(activity.status)
                  )}
                >
                  {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                </span>
                <span className="text-xs text-gray-500">
                  Due: {new Date(activity.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceActivities; 