export type ActivityStatus = 'completed' | 'action-required' | 'ongoing';

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

export const officerActivities: ActivityGroup[] = [
  {
    id: 'registration',
    title: 'Officer Registration & Qualification',
    stats: {
      completed: 3,
      pending: 0,
      ongoing: 1
    },
    activities: [
      {
        id: 'FN-003',
        title: 'Maintain Committee Composition',
        description: 'Identify and appoint at least 3 committee members (majority must be society members)',
        status: 'completed',
        action: 'view'
      },
      {
        id: 'FN-004',
        title: 'Obtain Written Confirmations',
        description: 'Obtain written consent from officers and confirmation they meet qualification criteria',
        status: 'completed',
        action: 'view'
      },
      {
        id: 'FN-004',
        title: 'Verify Officer Qualifications',
        description: 'Obtain written consent from officers and confirmation they meet qualification criteria',
        status: 'completed',
        action: 'view'
      }
    ]
  },
  {
    id: 'management',
    title: 'Ongoing Officer and Committee Management',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 2
    },
    activities: [
      {
        id: 'FN-011',
        title: 'Manage Subcommittees',
        description: 'Manage subcommittees according to constitutional procedures',
        status: 'ongoing',
        action: 'manage'
      },
      {
        id: 'FN-012',
        title: 'Set up and Maintain Register',
        description: 'Set up an interests register for potential disclosures',
        status: 'action-required',
        action: 'continue'
      },
      {
        id: 'FN-013',
        title: 'Verify Officer Conflicts',
        description: 'Ensure officers disclose conflicts of interest as soon as they become aware of them',
        status: 'ongoing',
        action: 'monitor'
      },
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Maintain interests register for officer conflicts of interest',
        status: 'action-required',
        action: 'start'
      }
    ]
  },
  {
    id: 'records',
    title: 'Ongoing Record Keeping Requirements',
    stats: {
      completed: 2,
      pending: 1,
      ongoing: 1
    },
    activities: [
      {
        id: 'FN-004',
        title: 'Verify Officer Eligibility',
        description: 'Monitor officer qualifications and eligibility on an ongoing basis',
        status: 'ongoing',
        action: 'monitor'
      },
      {
        id: 'FN-024',
        title: 'Update Officer Registry',
        description: 'Update society records with new or changed officer details',
        status: 'action-required',
        action: 'update'
      },
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Maintain records of officer consents and eligibility confirmations',
        status: 'completed',
        action: 'view'
      },
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Maintain records of officer consents and eligibility confirmations',
        status: 'completed',
        action: 'view'
      }
    ]
  }
]; 