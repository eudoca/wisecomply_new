export interface Officer {
  id: string; // Unique identifier (e.g., generated UUID)
  fullName: string; // Required
  position: string; // Required (e.g., 'President', 'Secretary', 'Treasurer', 'Committee Member', or custom)
  dateElectedAppointed: string; // Required (ISO date string or Date object)
  termEndDate?: string | null; // Optional (ISO date string or Date object)
  email: string; // Required
  phone?: string | null; // Optional
  address?: string | null; // Optional (Could be structured later)
  isEligible: boolean; // Required (Checkbox confirmation)
  hasConsented: boolean; // Required (Checkbox confirmation)
  consentDate?: string | null; // Optional (ISO date string or Date object)
} 