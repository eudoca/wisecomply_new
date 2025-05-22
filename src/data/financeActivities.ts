import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'process' | 'verify' | 'maintain' | 'prepare' | 'audit' | 'authorise' | 'submit';
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

export const financeActivities: ActivityGroup[] = [
  {
    id: 'financial-statement-preparation-standards',
    title: '1. Financial Statement Preparation and Standards',
    icon: 'calculator',
    stats: {
      completed: 0,
      pending: 4,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-020',
        title: 'Prepare Financial Statements',
        description: 'Prepare annual financial statements within 6 months of balance date',
        constitutionRef: 'Constitution section 7.01',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-020',
        title: 'Prepare Financial Statements',
        description: 'For small societies (under $50,000 in assets and operating income for 2 consecutive years): Prepare statements according to minimum reporting standards',
        constitutionRef: 'Constitution section 7.01',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-020',
        title: 'Prepare Financial Statements',
        description: 'For larger societies: Follow XRB accounting standards',
        constitutionRef: '',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-020',
        title: 'Prepare Financial Statements',
        description: 'For societies with operating expenses over $3 million (for 2 consecutive years): Have financial statements audited by a qualified auditor',
        constitutionRef: 'Act requirement - Constitution section 7.01',
        status: 'action-required',
        action: 'audit'
      }
    ]
  },
  {
    id: 'financial-statement-review-approval',
    title: '2. Financial Statement Review and Approval',
    icon: 'check-circle',
    stats: {
      completed: 0,
      pending: 1,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-021',
        title: 'Authorise Financial Statements',
        description: 'Ensure financial statements are dated and signed by at least two committee members',
        constitutionRef: 'Act requirement - Constitution section 7.01',
        status: 'action-required',
        action: 'authorise'
      }
    ]
  },
  {
    id: 'financial-reporting-submission',
    title: '3. Financial Reporting and Submission',
    icon: 'upload',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-022',
        title: 'Submit Financial Reporting',
        description: 'Submit annual financial statements to Registrar within 6 months of balance date',
        constitutionRef: 'Act requirement - Constitution section 7.01',
        status: 'action-required',
        action: 'submit'
      },
      {
        id: 'FN-022',
        title: 'Submit Financial Reporting',
        description: 'If registered with Charities Services, file financial statements with them instead',
        constitutionRef: '',
        status: 'action-required',
        action: 'submit'
      }
    ]
  }
]; 