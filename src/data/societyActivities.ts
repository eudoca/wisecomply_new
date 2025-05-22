import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update';
}

export interface ActivityGroup {
  id: string;
  title: string;
  stats: {
    completed: number;
    pending: number;
    ongoing: number;
  };
  activities: ActivityItem[];
}

export const societyActivities: ActivityGroup[] = [
  {
    id: 'society-management',
    title: 'Society Management',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 1
    },
    activities: [
      {
        id: 'SM-001',
        title: 'Update Society Name',
        description: 'Process and submit the society name change request with supporting documentation',
        status: 'action-required',
        action: 'start'
      },
      {
        id: 'SM-002',
        title: 'Maintain Society Records',
        description: 'Keep society records up to date, including constitution, rules, and member register',
        status: 'ongoing',
        action: 'manage'
      }
    ]
  },
  {
    id: 'office-management',
    title: 'Office Management',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'OM-001',
        title: 'Update Registered Office',
        description: 'Process registered office address change and notify the Registrar',
        status: 'action-required',
        action: 'start'
      }
    ]
  },
  {
    id: 'contact-management',
    title: 'Contact Person Management',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'CP-001',
        title: 'Verify Contact Person',
        description: 'Verify eligibility and update contact person details',
        status: 'action-required',
        action: 'start'
      }
    ]
  }
]; 