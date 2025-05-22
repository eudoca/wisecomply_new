import React, { useState } from 'react';
import { membershipActivities } from '@/data/membershipActivities';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlusCircle, MinusCircle, UserPlus, Users, FileText, Folder } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

interface StatBoxProps {
  value: number;
  label: string;
  className?: string;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full text-sm", className)}>
      <span className="font-medium">{value}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
};

interface ActivityItemProps {
  activity: {
    id: string;
    title: string;
    description: string;
    status: string;
    action: string;
    constitutionRef?: string;
  };
  isCompleted?: boolean;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isCompleted = false }) => {
  const actionStyles = {
    'view': 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
    'continue': 'bg-blue-500 text-white hover:bg-blue-600',
    'start': 'bg-blue-500 text-white hover:bg-blue-600',
    'monitor': 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
    'manage': 'bg-blue-500 text-white hover:bg-blue-600',
    'update': 'bg-blue-500 text-white hover:bg-blue-600',
    'process': 'bg-blue-500 text-white hover:bg-blue-600',
    'verify': 'bg-blue-500 text-white hover:bg-blue-600',
    'maintain': 'bg-blue-500 text-white hover:bg-blue-600'
  };

  const statusBadgeStyles = {
    'completed': 'bg-green-100 text-green-800',
    'action-required': 'bg-red-100 text-red-800',
    'ongoing': 'bg-blue-100 text-blue-800',
  };

  return (
    <div 
      className={cn(
        'py-2.5 px-4 flex justify-between items-start hover:bg-gray-50 transition-colors',
        isCompleted && 'completed hidden'
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-gray-900 truncate">{activity.title}</h4>
          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
            {activity.id}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{activity.description}</p>
        {activity.constitutionRef && (
          <p className="text-xs text-purple-600 mt-1">{activity.constitutionRef}</p>
        )}
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        <span className={cn(
          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
          statusBadgeStyles[activity.status as keyof typeof statusBadgeStyles]
        )}>
          {activity.status === 'action-required' ? 'Pending' : activity.status}
        </span>
        <button 
          className={cn(
            'text-xs px-3 py-1 rounded-md border transition-colors',
            actionStyles[activity.action as keyof typeof actionStyles]
          )}
        >
          {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
        </button>
      </div>
    </div>
  );
};

interface ActivityGroupProps {
  group: {
    id: string;
    title: string;
    icon: string;
    activities: any[];
  };
  showCompleted: boolean;
}

const ActivityGroup: React.FC<ActivityGroupProps> = ({ group, showCompleted }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'user-plus':
        return <UserPlus className="w-5 h-5 text-gray-500" />;
      case 'users':
        return <Users className="w-5 h-5 text-gray-500" />;
      case 'file-text':
        return <FileText className="w-5 h-5 text-gray-500" />;
      case 'folder':
        return <Folder className="w-5 h-5 text-gray-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="bg-gray-50/80 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2">
          {getIcon(group.icon)}
          <h3 className="text-base font-medium text-gray-900">{group.title}</h3>
        </div>
      </div>
      
      {/* Activities List */}
      <div className="divide-y divide-gray-200">
        {group.activities.map((activity) => (
          <ActivityItem 
            key={`${activity.id}-${activity.title}-${activity.description}`}
            activity={activity}
            isCompleted={activity.status === 'completed' && !showCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export const MembershipActivityDashboard: React.FC = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Calculate total stats
  const totalStats = membershipActivities.reduce(
    (acc, group) => ({
      completed: acc.completed + group.stats.completed,
      pending: acc.pending + group.stats.pending,
      ongoing: acc.ongoing + group.stats.ongoing,
    }),
    { completed: 0, pending: 0, ongoing: 0 }
  );

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="todos" className="w-full">
        <AccordionItem value="todos" className="border rounded-lg bg-white shadow-sm">
          <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
              className="flex flex-1 items-center px-6 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="flex items-center gap-3">
                {isOpen ? (
                  <MinusCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                ) : (
                  <PlusCircle className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:text-purple-600" />
                )}
                <h2 className="text-xl font-semibold text-gray-900">
                  Membership
                </h2>
              </div>
              <div className="flex items-center gap-3 ml-auto">
                <div className="flex gap-2">
                  <StatBox 
                    value={totalStats.completed} 
                    label="Completed"
                    className="bg-green-50 text-green-700"
                  />
                  <StatBox 
                    value={totalStats.pending} 
                    label="Action Required"
                    className="bg-red-50 text-red-700"
                  />
                  <StatBox 
                    value={totalStats.ongoing} 
                    label="Ongoing"
                    className="bg-blue-50 text-blue-700"
                  />
                </div>
                <div className="flex items-center gap-2 ml-6">
                  <Switch
                    id="show-completed"
                    checked={showCompleted}
                    onCheckedChange={setShowCompleted}
                  />
                  <Label htmlFor="show-completed" className="text-sm">Show completed</Label>
                </div>
              </div>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionContent className="px-6 pt-4 pb-6">
            <div className="space-y-4">
              {membershipActivities.map((group) => (
                <ActivityGroup
                  key={group.id}
                  group={group}
                  showCompleted={showCompleted}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}; 