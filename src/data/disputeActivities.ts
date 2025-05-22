import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'process' | 'verify' | 'maintain' | 'document';
  constitutionRef?: string;
}

export interface ActivityGroup {
  id: string;
  title: string;
  icon: string;
  stats: {
    completed: number;
    pending: number;
    ongoing: number;
  };
  activities: ActivityItem[];
}

export const disputeActivities: ActivityGroup[] = [
  {
    id: 'complaint-processing-resolution',
    title: '1. Complaint Processing and Resolution',
    icon: 'alert-triangle',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-029',
        title: 'Process Formal Complaint',
        description: 'Follow dispute resolution procedures specified in constitution',
        constitutionRef: 'Constitution sections 8.01, 8.02, 8.03',
        status: 'action-required',
        action: 'process'
      }
    ]
  },
  {
    id: 'record-keeping-documentation',
    title: '2. Record Keeping and Documentation',
    icon: 'folder',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-030',
        title: 'Document Dispute Resolution',
        description: 'Store records of all formal disputes and resolutions',
        constitutionRef: 'Constitution section 8.02',
        status: 'action-required',
        action: 'document'
      },
      {
        id: 'FN-030',
        title: 'Document Dispute Resolution',
        description: 'Store records of all informal disputes and resolutions',
        constitutionRef: 'Constitution section 8.02',
        status: 'action-required',
        action: 'document'
      }
    ]
  }
]; 