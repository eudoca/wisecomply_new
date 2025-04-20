import React from 'react';
import { Officer } from '../../types/officer';
import { Button } from '@/components/ui/button';

interface ViewOfficerDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  officer: Officer | null;
}

// Helper functions for formatting (can be moved to utils)
const formatBoolean = (value: boolean | null | undefined): string => {
  if (value === true) return 'Yes';
  if (value === false) return 'No';
  return 'N/A';
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'N/A';
  try {
    // Ensure the date string is treated correctly, might need parsing if not YYYY-MM-DD
    const date = new Date(dateString + 'T00:00:00Z'); // Assume UTC if no time specified
    if (isNaN(date.getTime())) { // Check if date is valid
        return 'Invalid Date';
    }
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  } catch (e) {
    return 'Invalid Date';
  }
};

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-500">{label}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {value ?? <span className="italic text-gray-400">Not Provided</span>}
    </dd>
  </div>
);

const ViewOfficerDetailsModal: React.FC<ViewOfficerDetailsModalProps> = ({ isOpen, onClose, officer }) => {
  if (!isOpen || !officer) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center px-4">
      <div className="relative mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            Officer Details: {officer.fullName}
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose} aria-label="Close modal">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        
        {/* Body - Display Officer Details */}
        <div className="mt-4 space-y-1 max-h-[70vh] overflow-y-auto p-4 pr-2">
          <dl>
            <DetailItem label="Full Legal Name" value={officer.fullName} />
            <DetailItem label="Position" value={officer.position} />
            <DetailItem label="Date Elected/Appointed" value={formatDate(officer.dateElectedAppointed)} />
            <DetailItem label="Term End Date" value={formatDate(officer.termEndDate)} />
            <DetailItem label="Email Address" value={officer.email} />
            <DetailItem label="Phone Number" value={officer.phone} />
            <DetailItem label="Address" value={officer.address ? <span className="whitespace-pre-wrap">{officer.address}</span> : null} />
            <DetailItem label="Eligibility Confirmed" value={formatBoolean(officer.isEligible)} />
            <DetailItem label="Written Consent Held" value={formatBoolean(officer.hasConsented)} />
            <DetailItem label="Date Consent Signed" value={formatDate(officer.consentDate)} />
          </dl>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>Close</Button>
          {/* Optional: Add Edit button here */}
          {/* <Button type="button">Edit Officer</Button> */}
        </div>
      </div>
    </div>
  );
};

export default ViewOfficerDetailsModal; 