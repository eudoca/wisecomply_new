import React from 'react';
import { cn } from '../../utils/cn'; // Corrected path
import { Button } from '@/components/ui/button'; // Standardized path
import { CheckCircleIcon, ClockIcon, AlertCircleIcon } from 'lucide-react'; // Icons for status
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card'; // Adjust path as needed
import { UserIcon, MailIcon, PhoneIcon, Trash2Icon, EditIcon } from 'lucide-react';

interface MemberCardProps {
  initials: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  duesPaid: boolean;
  lastActivity: string;
}

const MemberCard: React.FC<MemberCardProps> = ({
  initials,
  name,
  email,
  phone,
  status,
  joinDate,
  duesPaid,
  lastActivity,
}) => {
  const getStatusInfo = (status: MemberCardProps['status']) => {
    switch (status) {
      case 'active':
        return { color: 'green', Icon: CheckCircleIcon, label: 'Active' };
      case 'inactive':
        return { color: 'gray', Icon: ClockIcon, label: 'Inactive' };
      case 'pending':
        return { color: 'yellow', Icon: AlertCircleIcon, label: 'Pending' };
      default:
        return { color: 'gray', Icon: ClockIcon, label: 'Unknown' };
    }
  };

  const { color, Icon, label } = getStatusInfo(status);

  const handleViewProfile = () => alert(`Viewing profile for ${name}`);
  const handleEdit = () => alert(`Editing ${name}`);

  return (
    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-150 bg-white">
      <div className="flex items-center space-x-4 flex-1 min-w-0">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 font-medium text-sm">{initials}</span>
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-gray-500">
            <span className="truncate" title={email}>{email}</span>
            <span className="hidden sm:inline">•</span>
            <span>{phone}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 ml-4 flex-shrink-0">
        <div className="hidden lg:flex items-center space-x-2">
          <span
            className={cn(
              `px-2 py-0.5 text-xs font-medium rounded-full`,
              `bg-${color}-100 text-${color}-800` // Dynamic color based on status
            )}
          >
             <Icon className={`w-3 h-3 mr-1 inline`} /> {label}
          </span>
           <span className="text-sm text-gray-500">Joined {joinDate}</span>
        </div>
         <div className="hidden xl:flex items-center space-x-2">
          <span className={cn("text-sm", duesPaid ? 'text-green-600' : 'text-gray-500')}>
             {duesPaid ? 'Dues Paid' : 'Dues Pending'}
          </span>
           <span className="text-sm text-gray-500">Last Seen: {lastActivity}</span>
         </div>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" onClick={handleViewProfile}>
            View
          </Button>
           <Button variant="ghost" size="sm" onClick={handleEdit}>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard; 