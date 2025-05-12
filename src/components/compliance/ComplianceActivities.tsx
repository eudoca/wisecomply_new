import React, { useState } from 'react';
// import StatusIndicator from './StatusIndicator'; // Removed unused import
import { CalendarIcon, ArrowRightIcon, FileTextIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Removed unused import
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge'; // Keep used Badge
import { Tooltip } from '../wizard/Tooltip';
import { cn } from '../../utils/cn';
// import Step1SocietyInfo from './activities/Step1SocietyInfo'; // Remove import
import Step2Committee from './activities/Step2Committee';
import Step3ContactPerson from './activities/Step3ContactPerson';
import Step4Membership from './activities/Step4Membership';
import Step5Registers from './activities/Step5Registers';
import Step6Constitution from './activities/Step6Constitution';
import Step7MemberApproval from './activities/Step7MemberApproval';
import Step8FinalDetails from './activities/Step8FinalDetails';

// Define the shape of a single activity item (for clarity)
interface ComplianceActivityItem {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
  actionLabel: string;
  actionType: string;
  info: string;
}

// No longer needs onViewDetail prop
// interface ComplianceActivitiesProps {
//   onViewDetail: (id: number) => void;
// }

// Corrected array definition with trailing commas
const complianceActivities: ComplianceActivityItem[] = [
  {
    id: 1,
    title: '1. Society Information',
    description: 'Confirm your organisation\'s intent to register and assign responsibilities with a target completion date.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'Start Task',
    actionType: 'details',
    info: 'Define the scope and timeline for your registration or re-registration process.',
  },
  {
    id: 2,
    title: 'Committee Establishment',
    description: 'Set up your governing committee and ensure all officers meet legal eligibility and consent requirements.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'A committee of at least 3 eligible officers is mandatory under the 2022 Act.',
  },
  {
    id: 3,
    title: 'Contact Person Nomination',
    description: 'Nominate one to three contact persons and ensure their details are correctly recorded.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Contact persons are the official communication channel with the Registrar.',
  },
  {
    id: 4,
    title: 'Membership Confirmation',
    description: 'Verify your society has at least 10 members and maintain a compliant membership register.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'The minimum membership requirement is 10 under the 2022 Act.',
  },
  {
    id: 5,
    title: 'Establish Required Registers',
    description: 'Set up registers for conflicts of interest and disputes, ensuring good governance practices.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'These registers help manage potential governance issues proactively.',
  },
  {
    id: 6,
    title: 'Constitution Development',
    description: 'Create or amend your constitution to meet all mandatory requirements under the 2022 Act.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Ensure your constitution includes all necessary clauses outlined in the Act.',
  },
  {
    id: 7,
    title: 'Member Approval Process',
    description: 'Hold a general meeting to approve the constitution and key operational decisions.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Member consent is crucial for adopting the new constitution and meeting requirements.',
  },
  {
    id: 8,
    title: 'Final Application Details',
    description: 'Confirm officer, contact, and society details to complete the registration application.',
    status: 'upcoming',
    dueDate: 'TBC',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Ensure all information provided for the application is accurate and up-to-date.',
  },
];

// Component no longer needs props
const ComplianceActivities: React.FC = () => {
  // State to track which activity accordion is open (null = none)
  const [openActivityId, setOpenActivityId] = useState<number | null>(null);

  // Function to toggle the accordion
  const toggleAccordion = (id: number) => {
    setOpenActivityId(prevId => (prevId === id ? null : id));
  };
  
  // Updated completion handler (could be more specific later)
   const handleCompleteStep = (id: number) => {
     console.log(`Step ${id} marked complete (placeholder)`);
     setOpenActivityId(null); // Close accordion on completion
   };

  const getButtonProps = (activity: ComplianceActivityItem) => {
    let variant: "primary" | "secondary" | "outline" | "ghost" | "link" | "success" = "secondary";
    let className = "";
    let leftIcon: React.ReactNode = null;

    switch (activity.actionType) {
      case 'continue':
        variant = "primary";
        className = "bg-purple-600 hover:bg-purple-700"; 
        leftIcon = <ArrowRightIcon className="w-4 h-4" />;
        break;
      case 'summary':
        variant = "success";
        leftIcon = <CheckCircleIcon className="w-4 h-4" />;
        break;
      case 'details': 
        variant = "secondary";
        leftIcon = <FileTextIcon className="w-4 h-4" />;
        if (activity.actionLabel === 'Start Task') {
           variant = "primary"; 
           leftIcon = <ArrowRightIcon className="w-4 h-4" />;
        }
         if (activity.actionLabel === 'Submit Application') {
           variant = "success"; 
           leftIcon = <CheckCircleIcon className="w-4 h-4" />;
        }
        break;
    }
    return { variant, className, leftIcon };
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="info">Underway</Badge>;
      case 'upcoming':
        return <Badge variant="default">Upcoming</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {complianceActivities.map((activity, index) => {
        const buttonProps = getButtonProps(activity);
        const isOpen = openActivityId === activity.id;
        
        return (
          <div key={activity.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
             {/* Card-like header for the activity */}
             <div className="flex p-4">
               {/* Timeline connection remains outside the card part */}
               <div className="relative flex-shrink-0">
                 {index < complianceActivities.length - 1 && (
                   <div className="absolute left-6 top-12 -bottom-4 w-0.5 bg-gray-200"></div> // Adjusted length
                 )}
                 <div className="flex flex-col items-center mr-6 z-10">
                   {/* Conditional styling for the number circle */}
                  <div 
                     className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${ 
                       // Use conditional class application + style for ID 1
                       activity.id !== 1 ? (
                      activity.status === 'completed' ? 'bg-purple-600 text-white' : 
                      activity.status === 'in-progress' ? 'border-2 border-purple-600 text-purple-600' : 
                      'bg-gray-200 text-gray-600'
                       ) : 'text-white' // For ID 1, ensure text is white
                     }`}
                     // Apply specific background color for ID 1 using inline style
                     style={activity.id === 1 ? { backgroundColor: '#8065F2' } : {}}
                   >
                    {activity.id}
                  </div>
                </div>
               </div>
              
               {/* Content part of the header - Apply conditional background and padding */}
               <div className={cn(
                   "flex-1", 
                   activity.id === 1 ? "p-4 rounded-md" : "" // Removed bg-purple-50, already handled by parent
                  )}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                       {/* Update title size and color - Apply inline style */}
                      <h3 className="text-lg font-semibold" style={{ color: '#8065F2' }}>{activity.title}</h3>
                       <Tooltip text={activity.info || 'No additional info available.'}>
                         <InfoIcon className="w-4 h-4 ml-1.5 text-gray-400 cursor-help" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                   {/* Update description size and weight */}
                  <p className="text-sm font-medium text-gray-600">{activity.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">Due: {activity.dueDate}</span>
                    </div>
                    {/* Update Button to toggle accordion */}
                     <Button 
                       variant={buttonProps.variant as any}
                       size="sm"
                       className={cn(buttonProps.className)} 
                       leftIcon={buttonProps.leftIcon}
                       onClick={() => toggleAccordion(activity.id)} // Toggle on click
                     >
                       {/* Change button text based on state? Optional */}
                       {isOpen ? 'Close Details' : activity.actionLabel}
                     </Button>
                  </div>
               </div>
             </div>
            
            {/* Accordion Content - Removed rendering for Step1SocietyInfo */}
            {/* 
            {isOpen && activity.id === 1 && (
              <div className="p-6 border-t border-gray-200">
                <Step1SocietyInfo onComplete={() => handleCompleteStep(1)} />
              </div>
            )}
            */}
            {isOpen && activity.id === 2 && (
              <div className="p-6 border-t border-gray-200">
                <Step2Committee onComplete={() => handleCompleteStep(2)} />
              </div>
            )}
            {isOpen && activity.id === 3 && (
              <div className="p-6 border-t border-gray-200">
                <Step3ContactPerson onComplete={() => handleCompleteStep(3)} />
              </div>
            )}
            {isOpen && activity.id === 4 && (
              <div className="p-6 border-t border-gray-200">
                <Step4Membership onComplete={() => handleCompleteStep(4)} />
              </div>
            )}
            {isOpen && activity.id === 5 && (
              <div className="p-6 border-t border-gray-200">
                <Step5Registers onComplete={() => handleCompleteStep(5)} />
              </div>
            )}
            {isOpen && activity.id === 6 && (
              <div className="p-6 border-t border-gray-200">
                <Step6Constitution onComplete={() => handleCompleteStep(6)} />
              </div>
            )}
            {isOpen && activity.id === 7 && (
              <div className="p-6 border-t border-gray-200">
                <Step7MemberApproval onComplete={() => handleCompleteStep(7)} />
              </div>
            )}
            {isOpen && activity.id === 8 && (
              <div className="p-6 border-t border-gray-200">
                <Step8FinalDetails onComplete={() => handleCompleteStep(8)} />
              </div>
            )}
            {/* Add similar blocks here for other steps if needed */}
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceActivities; 