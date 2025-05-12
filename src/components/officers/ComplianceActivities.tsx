import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '../../utils/cn';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; // Import Accordion components
import { ChevronDownIcon, AlertTriangleIcon, ClockIcon, CheckCircleIcon, CheckIcon } from 'lucide-react'; // Added icons for status and CheckIcon for Complete

interface ComplianceActivity {
  id: string;
  title: string;
  description: string; 
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  isComplete?: boolean; // Added for completion status
}

// No props needed for this component anymore
interface ComplianceActivitiesProps {}

// Initial data - this will be the initial state
const initialActivitiesData: ComplianceActivity[] = [
  {
    id: '1',
    title: 'Annual Officer Declaration Collection',
    description: 'Ensure all registered officers submit their annual declarations. Review submitted forms for completeness and accuracy. Follow up on any missing or incomplete submissions. Archive declarations securely.',
    priority: 'High',
    dueDate: '2024-12-15',
    isComplete: false,
  },
  {
    id: '2',
    title: 'Review Conflict of Interest Policy',
    description: 'Conduct a thorough review of the current Conflict of Interest policy. Check for alignment with the latest legislative changes and best practices. Propose any necessary amendments to the committee.',
    priority: 'Medium',
    dueDate: '2024-07-25', // Adjusted for 'Impending' test (assuming today is around July 19-25)
    isComplete: false,
  },
  {
    id: '3',
    title: 'Schedule Q1 Committee Meeting',
    description: 'Organize and send out invites for the first quarter committee meeting. Prepare and distribute the agenda and any relevant pre-reading materials. Book venue or set up virtual meeting.',
    priority: 'Low',
    dueDate: '2025-01-10',
    isComplete: false,
  },
  {
    id: '4',
    title: 'Update Member Register for AGM',
    description: 'Review and update the member register to ensure all details are current ahead of the Annual General Meeting. Process any new membership applications or resignations.',
    priority: 'Medium',
    dueDate: '2024-05-20', 
    isComplete: true, // Completed example
  },
  {
    id: '5',
    title: 'File Annual Financial Statements',
    description: 'Prepare and file the annual financial statements with the relevant authorities as per regulatory deadlines.',
    priority: 'High',
    dueDate: '2023-11-30', // Overdue example
    isComplete: false, 
  },
  {
    id: '6',
    title: 'Conduct Officer Training Session',
    description: 'Organize and conduct a training session for new and existing officers on their roles, responsibilities, and compliance duties.',
    priority: 'Low',
    dueDate: '2024-09-15',
    isComplete: true, // Completed example
  },
];

const getPriorityTextColor = (priority: ComplianceActivity['priority']): string => {
  switch (priority) {
    case 'High': return 'text-red-700'; // Dark Red
    case 'Medium': return 'text-orange-600'; // Dark Orange
    case 'Low': return 'text-green-700'; // Forest Green
    default: return 'text-gray-700';
  }
};

interface ActivityStatusDisplay {
  text: 'Complete' | 'Overdue' | 'Impending' | 'Not yet due';
  badgeStyle: string;
  icon: JSX.Element;
}

const getActivityStatusDisplay = (activity: ComplianceActivity): ActivityStatusDisplay => {
  if (activity.isComplete) {
    return {
      text: 'Complete',
      badgeStyle: 'bg-gray-100 text-gray-700 border-gray-300',
      icon: <CheckIcon className="w-3.5 h-3.5 mr-1" />
    };
  }

  const dueDate = new Date(activity.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dueDate.setHours(0,0,0,0);
  const sevenDaysFromToday = new Date(today);
  sevenDaysFromToday.setDate(today.getDate() + 7);

  if (dueDate < today) {
    return { 
      text: 'Overdue', 
      badgeStyle: 'bg-red-100 text-red-700 border-red-300', 
      icon: <AlertTriangleIcon className="w-3.5 h-3.5 mr-1" /> 
    };
  } else if (dueDate <= sevenDaysFromToday) {
    return { 
      text: 'Impending', 
      badgeStyle: 'bg-orange-100 text-orange-600 border-orange-300', 
      icon: <ClockIcon className="w-3.5 h-3.5 mr-1" /> 
    };
  } else {
    return { 
      text: 'Not yet due', 
      badgeStyle: 'bg-green-100 text-green-700 border-green-300', 
      icon: <CheckCircleIcon className="w-3.5 h-3.5 mr-1" /> 
    };
    }
  };

const ComplianceActivities: React.FC<ComplianceActivitiesProps> = () => {
  const [activities, setActivities] = useState<ComplianceActivity[]>(initialActivitiesData);
  
   const handleViewAll = () => {
    console.log('Navigate to /compliance');
    alert('Navigating to full compliance list... (placeholder)');
  };

  const handleMarkComplete = (activityId: string) => {
    setActivities(prevActivities => 
      prevActivities.map(act => 
        act.id === activityId ? { ...act, isComplete: true } : act
      )
    );
  };

  // Sort activities: incomplete first, then by due date; then completed, then by due date
  const sortedActivities = [...activities].sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    // If both have the same completion status, sort by due date (earliest first)
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Upcoming Compliance Activities
        </h2>
        <Button variant="link" onClick={handleViewAll} className="text-sm">
          View All
        </Button>
      </div>
      
      {sortedActivities.length === 0 ? (
        <p className="text-sm text-gray-500">No upcoming compliance activities.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full space-y-2">
          {sortedActivities.map((activity) => {
            const statusDisplay = getActivityStatusDisplay(activity);
            const priorityBadgeClasses = getPriorityTextColor(activity.priority);
            
            return (
              <AccordionItem 
                value={activity.id} 
                key={activity.id} 
                className={cn(
                  "border rounded-md hover:shadow-sm transition-shadow duration-150",
                  activity.isComplete ? "bg-gray-200" : "bg-white" // Darker grey for completed, removed opacity
                )}
              >
                <AccordionTrigger 
                  className={cn(
                    "p-3 text-left hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-1 rounded-md", // Reduced padding from p-4 to p-3
                    activity.isComplete ? "text-gray-700" : "text-gray-800" // Adjusted completed trigger text for darker bg
                  )}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-4">
                    <span className="text-sm font-semibold flex-1 truncate" title={activity.title}>{activity.title}</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-x-3 gap-y-1 text-xs whitespace-nowrap flex-shrink-0">
                      {/* Priority Badge */}
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                          priorityBadgeClasses
                        )}
                      >
                        {activity.priority} Priority
                      </span>
                      {/* Status Badge */}
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border',
                          statusDisplay.badgeStyle
                        )}
                      >
                        {statusDisplay.icon}
                        {statusDisplay.text}
                </span>
                      <span className={activity.isComplete ? "text-gray-600" : "text-gray-600"}>
                  Due: {new Date(activity.dueDate).toLocaleDateString()}
                </span>
              </div>
            </div>
                </AccordionTrigger>
                <AccordionContent className="p-4 pt-2 text-sm text-gray-700">
                  <p className="mb-3">{activity.description}</p>
                  {!activity.isComplete && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        handleMarkComplete(activity.id);
                      }}
                      className="mt-2 border-green-600 text-green-700 hover:bg-green-50 hover:text-green-800"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-2" />
                      Mark as Complete
                    </Button>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default ComplianceActivities; 