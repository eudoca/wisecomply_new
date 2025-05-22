import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'process' | 'verify' | 'maintain' | 'draft';
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

export const constitutionActivities: ActivityGroup[] = [
  {
    id: 'constitution-development-amendment',
    title: '1. Constitution Development and Amendment',
    icon: 'edit',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-001',
        title: 'Draft Compliant Constitution',
        description: 'Draft a compliant constitution that aligns with the 2022 Act requirements',
        constitutionRef: 'Act requirement',
        status: 'action-required',
        action: 'draft'
      },
      {
        id: 'FN-026',
        title: 'Process Constitution Amendments',
        description: 'Follow amendment procedures specified in constitution',
        constitutionRef: 'Constitution section 9.01',
        status: 'action-required',
        action: 'process'
      }
    ]
  },
  {
    id: 'constitution-record-keeping',
    title: '2. Constitution Record Keeping',
    icon: 'folder',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Keep copies of the current constitution and all amendments',
        constitutionRef: 'Constitution section 9.01',
        status: 'action-required',
        action: 'maintain'
      }
    ]
  }
]; 