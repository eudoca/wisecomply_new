import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'process' | 'verify' | 'maintain';
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

export const membershipActivities: ActivityGroup[] = [
  {
    id: 'membership-application-onboarding',
    title: '1. Membership Application and Onboarding',
    icon: 'user-plus',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-007',
        title: 'Process Member Applications',
        description: 'Process membership applications according to constitutional procedures',
        constitutionRef: 'Constitution section 2.03',
        status: 'action-required',
        action: 'process'
      },
      {
        id: 'FN-007',
        title: 'Process Member Applications',
        description: 'Ensure new members provide consent to join as per constitution',
        constitutionRef: 'Constitution section 2.03',
        status: 'action-required',
        action: 'verify'
      }
    ]
  },
  {
    id: 'ongoing-membership-management',
    title: '2. Ongoing Membership Management',
    icon: 'users',
    stats: {
      completed: 0,
      pending: 3,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-006',
        title: 'Maintain Membership Levels',
        description: 'Maintain minimum of 10 members at all times',
        constitutionRef: 'Act requirement - Constitution section 2.01',
        status: 'action-required',
        action: 'monitor'
      },
      {
        id: 'FN-008',
        title: 'Update Membership Register',
        description: 'Keep membership register updated with current and former members\' details (retain former member records for 7 years)',
        constitutionRef: 'Constitution section 2.05',
        status: 'action-required',
        action: 'update'
      },
      {
        id: 'FN-009',
        title: 'Process Membership Cessation',
        description: 'Apply established processes for membership cessation when required',
        constitutionRef: 'Constitution section 2.07',
        status: 'action-required',
        action: 'process'
      }
    ]
  },
  {
    id: 'membership-record-keeping',
    title: '3. Membership Record Keeping',
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
        description: 'Keep register of members with names, contact details, and membership dates (7-year retention)',
        constitutionRef: 'Constitution section 2.05',
        status: 'action-required',
        action: 'maintain'
      }
    ]
  }
]; 