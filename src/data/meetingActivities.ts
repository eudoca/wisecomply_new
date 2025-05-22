import { ActivityStatus } from './officerActivities';

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  status: ActivityStatus;
  action: 'view' | 'continue' | 'start' | 'monitor' | 'manage' | 'update' | 'schedule' | 'notify' | 'prepare' | 'verify' | 'record' | 'escalate' | 'process' | 'maintain';
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

export const meetingActivities: ActivityGroup[] = [
  {
    id: 'annual-general-meeting-management',
    title: '1. Annual General Meeting Management',
    icon: 'calendar',
    stats: {
      completed: 0,
      pending: 7,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-002',
        title: 'Schedule Annual General Meeting',
        description: 'Hold an AGM no later than 6 months after balance date and no more than 15 months after previous AGM',
        constitutionRef: 'Constitution section 6.01',
        status: 'action-required',
        action: 'schedule'
      },
      {
        id: 'FN-002',
        title: 'Schedule Annual General Meeting',
        description: 'Provide proper notice of AGM to members',
        constitutionRef: 'Constitution section 6.01',
        status: 'action-required',
        action: 'notify'
      },
      {
        id: 'FN-019',
        title: 'Prepare AGM Documents',
        description: 'Present annual report at AGM',
        constitutionRef: 'Constitution section 6.01',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-019',
        title: 'Prepare AGM Documents',
        description: 'Present financial statements at AGM',
        constitutionRef: 'Constitution sections 6.01, 7.01',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-019',
        title: 'Prepare AGM Documents',
        description: 'Present summary of disclosed interests at AGM',
        constitutionRef: 'Constitution sections 4.07, 6.01',
        status: 'action-required',
        action: 'prepare'
      },
      {
        id: 'FN-016',
        title: 'Verify Meeting Quorum',
        description: 'Ensure proper quorum for AGM',
        constitutionRef: 'Constitution section 6.02',
        status: 'action-required',
        action: 'verify'
      },
      {
        id: 'FN-017',
        title: 'Document Meeting Minutes',
        description: 'Record minutes of AGM',
        constitutionRef: 'Constitution section 6.08',
        status: 'action-required',
        action: 'record'
      }
    ]
  },
  {
    id: 'committee-meeting-management',
    title: '2. Committee Meeting Management',
    icon: 'users',
    stats: {
      completed: 0,
      pending: 4,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-015',
        title: 'Schedule Committee Meetings',
        description: 'Hold committee meetings at frequency specified in constitution',
        constitutionRef: 'Constitution section 5.01',
        status: 'action-required',
        action: 'schedule'
      },
      {
        id: 'FN-016',
        title: 'Verify Meeting Quorum',
        description: 'Ensure proper quorum for committee meetings',
        constitutionRef: 'Constitution section 5.02',
        status: 'action-required',
        action: 'verify'
      },
      {
        id: 'FN-017',
        title: 'Document Meeting Minutes',
        description: 'Record minutes of committee meetings',
        constitutionRef: 'Constitution section 5.01',
        status: 'action-required',
        action: 'record'
      },
      {
        id: 'FN-014',
        title: 'Escalate Committee Conflicts',
        description: 'Hold a special general meeting if over half the committee is conflicted on an issue',
        constitutionRef: 'Constitution section 4.07',
        status: 'action-required',
        action: 'escalate'
      }
    ]
  },
  {
    id: 'constitutional-governance-processes',
    title: '3. Constitutional and Governance Processes',
    icon: 'file-text',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-002',
        title: 'Schedule Annual General Meeting',
        description: 'Hold AGM or Special General Meeting to approve new constitution',
        constitutionRef: 'Constitution sections 6.01, 6.09, 9.01',
        status: 'action-required',
        action: 'schedule'
      },
      {
        id: 'FN-026',
        title: 'Process Constitution Amendments',
        description: 'Hold general meeting or obtain written resolution to approve constitution changes',
        constitutionRef: 'Constitution section 9.01',
        status: 'action-required',
        action: 'process'
      }
    ]
  },
  {
    id: 'record-keeping-documentation',
    title: '4. Record Keeping and Documentation',
    icon: 'folder',
    stats: {
      completed: 0,
      pending: 2,
      ongoing: 0
    },
    activities: [
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Store minutes of all committee meetings',
        constitutionRef: 'Constitution sections 5.01',
        status: 'action-required',
        action: 'maintain'
      },
      {
        id: 'FN-033',
        title: 'Maintain Statutory Records',
        description: 'Store minutes of all general meetings',
        constitutionRef: 'Constitution sections 6.08',
        status: 'action-required',
        action: 'maintain'
      }
    ]
  }
]; 