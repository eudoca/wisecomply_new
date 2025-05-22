import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'process' | 'verify' | 'maintain' | 'submit' | 'document' | 'respond' | 'provide';
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

export const documentActivities: ActivityGroup[] = [
  {
    id: 'registration-compliance',
    title: '1. Registration and Compliance',
    icon: 'file-check',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-005',
        title: 'Submit Reregistration Application',
        description: 'Submit online application for reregistration by April 5, 2026',
        constitutionRef: 'Act requirement',
        status: 'action-required',
        action: 'submit'
      }
    ]
  },
  {
    id: 'statutory-record-maintenance',
    title: '2. Statutory Record Maintenance',
    icon: 'archive',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'If applicable, maintain records related to common seal usage',
        constitutionRef: 'Constitution section 12.01',
        status: 'action-required',
        action: 'maintain'
      },
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'If applicable, document all bylaws and amendments',
        constitutionRef: 'Constitution section 12.02',
        status: 'action-required',
        action: 'document'
      }
    ]
  },
  {
    id: 'information-access-transparency',
    title: '3. Information Access and Transparency',
    icon: 'eye',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-035',
        title: 'Process Information Requests',
        description: 'Respond to written member information requests within a reasonable time',
        constitutionRef: 'Constitution section 11.01',
        status: 'action-required',
        action: 'respond'
      },
      {
        id: 'FN-035',
        title: 'Process Information Requests',
        description: 'Provide reasonable access to society records for members',
        constitutionRef: 'Constitution section 11.01',
        status: 'action-required',
        action: 'provide'
      }
    ]
  }
]; 