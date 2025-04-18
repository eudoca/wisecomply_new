import React from 'react';
import StatusIndicator from './StatusIndicator';
import { CalendarIcon, ArrowRightIcon, FileTextIcon, CheckCircleIcon, InfoIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { cn } from '../../utils/cn';

const complianceActivities = [
  {
    id: 1,
    title: 'Initial Compliance Assessment',
    description: "Complete the initial assessment of your organisation's compliance needs",
    status: 'completed',
    dueDate: '15/06/2023',
    actionLabel: 'View Summary',
    actionType: 'summary',
    info: 'The assessment helps identify your compliance obligations under the Incorporated Societies Act 2022'
  },
  {
    id: 2,
    title: 'Risk Analysis & Gap Identification',
    description: 'Identify compliance gaps and analyse potential risks',
    status: 'completed',
    dueDate: '30/07/2023',
    actionLabel: 'View Summary',
    actionType: 'summary',
    info: 'Understand where your society may be at risk of non-compliance with legal requirements'
  },
  {
    id: 3,
    title: 'Compliance Strategy Development',
    description: 'Develop a comprehensive strategy to address compliance requirements',
    status: 'in-progress',
    dueDate: '22/09/2023',
    actionLabel: 'Continue',
    actionType: 'continue',
    info: 'Create an action plan to ensure your society meets all obligations under the new Act'
  },
  {
    id: 4,
    title: 'Implementation of Controls',
    description: 'Implement necessary controls and procedures',
    status: 'upcoming',
    dueDate: '15/11/2023',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Put processes in place to ensure ongoing compliance and good governance'
  },
  {
    id: 5,
    title: 'Compliance Verification & Reporting',
    description: 'Verify compliance status and prepare final reports',
    status: 'upcoming',
    dueDate: '10/01/2024',
    actionLabel: 'View Details',
    actionType: 'details',
    info: 'Confirm your society is meeting all requirements and document your compliance status'
  }
];

const ComplianceActivities: React.FC = () => {
  const getButtonProps = (activity: typeof complianceActivities[0]) => {
    let variant: "primary" | "secondary" | "outline" | "ghost" | "link" | "success" = "secondary";
    let className = "";
    let leftIcon: React.ReactNode = null;

    switch (activity.actionType) {
      case 'continue':
        variant = "primary";
        className = "bg-purple-600 hover:bg-purple-700"; // Keep purple for continue
        leftIcon = <ArrowRightIcon className="w-4 h-4" />;
        break;
      case 'summary':
        variant = "success";
        leftIcon = <CheckCircleIcon className="w-4 h-4" />;
        break;
      case 'details':
        variant = "secondary";
        leftIcon = <FileTextIcon className="w-4 h-4" />;
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
        return (
          <div key={activity.id} className="relative">
            {index < complianceActivities.length - 1 && (
              <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200"></div>
            )}
            <div className="flex">
              <div className="flex flex-col items-center mr-6 z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                    activity.status === 'completed' 
                      ? 'bg-purple-600 text-white' 
                      : activity.status === 'in-progress' 
                        ? 'border-2 border-purple-600 text-purple-600' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                  {activity.id}
                </div>
              </div>
              <Card 
                className={cn(
                  "flex-1", 
                  activity.status === 'completed' ? "bg-green-50 border-green-200" : "",
                  activity.status === 'in-progress' ? "border-purple-200" : ""
                )}
                padding="md"
              >
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium">{activity.title}</h3>
                      <Tooltip text={activity.info} position="top" variant="info">
                        <InfoIcon className="w-4 h-4 ml-1.5 text-gray-400" />
                      </Tooltip>
                    </div>
                    <div className="flex items-center">
                      {getStatusBadge(activity.status)}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center text-gray-500">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      <span className="text-sm">Due: {activity.dueDate}</span>
                    </div>
                    <Button 
                      variant={buttonProps.variant as any}
                      size="sm"
                      className={cn(buttonProps.className)}
                      leftIcon={buttonProps.leftIcon}
                    >
                      {activity.actionLabel}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceActivities; 