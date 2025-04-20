// src/types/dispute.ts

export type DisputeProcessType = 'standard' | 'custom';

export type CaseType = 'dispute_complaint' | 'misconduct_allegation';

export type CaseStatus =
  | 'lodged'
  | 'initial_review'
  | 'info_gathering'
  | 'notification_sent'
  | 'response_received'
  | 'mediation_attempted' // Optional step
  | 'hearing_scheduled'
  | 'hearing_held'
  | 'decision_pending'
  | 'decision_issued'
  | 'appeal_period_open'
  | 'appealed'
  | 'closed'
  // Simpler custom statuses could be added if needed
  | 'investigating';

export interface ActionLogEntry {
  id: string;
  date: string; // ISO String
  description: string;
}

export interface Document {
  id: string;
  fileName: string;
  uploadedDate: string; // ISO String
  url?: string; // URL if stored remotely, or handle differently if stored locally/in-app
}

export interface Sanction {
  type: 'warning' | 'suspension' | 'termination' | 'fine' | 'education' | 'other';
  details?: string; // e.g., Duration for suspension, Amount for fine, Description for other
}

export interface DisputeCase {
  id: string; // e.g., DISP-2024-001
  caseType: CaseType;
  dateLodged: string; // ISO String
  complainants: string[]; // Names or IDs
  respondents: string[]; // Names or IDs
  summary: string;
  relevantRule?: string | null;
  initialDocuments?: Document[]; // Simplified for now
  status: CaseStatus;
  actionLog?: ActionLogEntry[];
  uploadedDocuments?: Document[];
  decision?: string | null;
  sanctions?: Sanction[];
  appealLodged?: boolean | null;
  appealDate?: string | null; // ISO String
  appealedTo?: string | null;
  appealOutcome?: string | null;
  appealDecisionDate?: string | null; // ISO String
}

// Interface for the configuration settings
export interface DisputeConfiguration {
  processType: DisputeProcessType | null;
  customProcessDescription?: string | null;
} 