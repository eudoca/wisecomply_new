import React from 'react';
import { Button } from '@/components/ui/button';
import { Officer } from '../../types/officer';

interface ViewConsentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  officer: Officer | null;
}

const ViewConsentFormModal: React.FC<ViewConsentFormModalProps> = ({ isOpen, onClose, officer }) => {
  if (!isOpen || !officer) return null;

  // Mock completed form data
  const mockFormData = {
    first_name: officer.fullName.split(' ')[0],
    middle_name: '',
    last_name: officer.fullName.split(' ').slice(1).join(' '),
    is_member: 'yes',
    street_address: '42 Wellington Street',
    city: 'Auckland',
    postcode: '1010',
    country: 'New Zealand',
    email: officer.email,
    date_elected: officer.dateElectedAppointed,
    officer_declaration: true,
    date_signed: officer.consentDate || '2023-10-15'
  };

  // Mock society data
  const societyData = {
    name: "Community Garden Society",
    registrationNumber: "1234567",
    registrationDate: "15 January 2023",
    annualFilingDue: "31 March 2024"
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-5 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start pb-3 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">
            Officer Consent Form - {officer.fullName}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4 max-h-[70vh] overflow-y-auto p-4 bg-gray-50 rounded">
          {/* Form Preview */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-blue-600 px-6 py-4">
              <h1 className="text-xl font-bold text-white">
                Consent and Certificate of Officer
              </h1>
              <p className="text-blue-100 text-sm">
                Section 47 Incorporated Societies Act 2022
              </p>
            </div>

            {/* Society Information */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Society Information</h2>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Society Name</p>
                    <p className="font-medium">{societyData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration Number</p>
                    <p className="font-medium">{societyData.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Registration Date</p>
                    <p className="font-medium">{societyData.registrationDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Annual Filing Due</p>
                    <p className="font-medium">{societyData.annualFilingDue}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Officer Details */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Officer Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="font-medium">{mockFormData.first_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Name</p>
                  <p className="font-medium">{mockFormData.last_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member of Society?</p>
                  <p className="font-medium">Yes</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Email</p>
                  <p className="font-medium">{mockFormData.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{mockFormData.street_address}, {mockFormData.city}, {mockFormData.postcode}, {mockFormData.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date Elected/Appointed</p>
                  <p className="font-medium">{mockFormData.date_elected}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{officer.position}</p>
                </div>
              </div>
            </div>

            {/* Declaration */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Declaration</h2>
              <div className="bg-green-50 border border-green-200 rounded p-4">
                <p className="text-sm text-gray-800">
                  I consent to be an officer of the above society and certify that I am not disqualified from being appointed or holding office as an officer of a society. I have reviewed and confirm I meet the qualification criteria set out in section 47 of the Incorporated Societies Act 2022.
                </p>
                <div className="mt-4 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-gray-500">Signature</p>
                    <div className="h-12 mt-1 bg-white border border-gray-300 rounded px-3 py-1 italic text-gray-800">
                      {officer.fullName}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Signed</p>
                    <p className="font-medium">{mockFormData.date_signed}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="px-6 py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Consent verification complete</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    This officer has completed and submitted their consent form.
                  </p>
                </div>
              </div>
            </div>

            {/* Qualification Criteria Section */}
            <div className="px-6 py-4 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Qualification Criteria</h2>
              <div className="bg-red-50 p-4 rounded border-2 border-red-300 text-sm">
                <p className="mb-2">
                  Before signing this consent form, ensure that you meet the qualification criteria set out in section 47 of the Incorporated Societies Act 2022.
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Every officer of a society must be a natural person.</li>
                  <li>
                    The following persons are disqualified from being elected or appointed or otherwise holding office as an officer of a society:
                    <ol className="list-[lower-alpha] pl-5 pt-2 space-y-1">
                      <li>a person who is under 16 years of age</li>
                      <li>a person who is an undischarged bankrupt</li>
                      <li>a person who is prohibited from being a director or promoter of, or being concerned or taking part in the management of, an incorporated or unincorporated body under the Companies Act 1993, the Financial Markets Conduct Act 2013, or the Takeovers Act 1993</li>
                      <li>a person who is disqualified from being an officer of a charitable entity under the Charities Act 2005</li>
                      <li>
                        a person who has been convicted of any of the following, and has been sentenced for the offence, within the last 7 years:
                        <ol className="list-[lower-roman] pl-5 pt-1 space-y-1">
                          <li>an offence under subpart 6 of Part 4 of the Incorporated Societies Act 2022</li>
                          <li>a crime involving dishonesty (within the meaning of section 2(1) of the Crimes Act 1961)</li>
                          <li>an offence under section 143B of the Tax Administration Act 1994</li>
                          <li>an offence under section 22(2) of the Incorporated Societies Act 2022</li>
                          <li>an offence, in a country, State, or territory other than New Zealand, that is substantially similar to an offence specified in subparagraphs i. to iv.</li>
                          <li>a money laundering offence or an offence relating to the financing of terrorism, whether in New Zealand or elsewhere.</li>
                        </ol>
                      </li>
                      <li>
                        a person who is subject to any of the following orders:
                        <ol className="list-[lower-roman] pl-5 pt-1 space-y-1">
                          <li>a banning order under subpart 7 of Part 4 of the Incorporated Societies Act 2022</li>
                          <li>an order under section 108 of the Credit Contracts and Consumer Finance Act 2003</li>
                          <li>a forfeiture order under the Criminal Proceeds (Recovery) Act 2009</li>
                          <li>a property order made under the Protection of Personal and Property Rights Act 1988, or whose property is managed by a trustee corporation under section 32 of that Act.</li>
                        </ol>
                      </li>
                      <li>a person who is subject to an order that is substantially similar to an order referred to in paragraph f. under a law of a country, State, or territory outside New Zealand that is a country, State, or territory prescribed by the regulations.</li>
                      <li>in relation to the society, a person who does not comply with any qualifications for officers contained in the society's constitution.</li>
                    </ol>
                  </li>
                  <li>A natural person who is disqualified from being an officer but who acts as an officer is an officer for the purposes of a provision of this Act that imposes a duty or an obligation on an officer.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
          <Button variant="outline" onClick={onClose} className="mr-2">Close</Button>
          <Button>Download PDF</Button>
        </div>
      </div>
    </div>
  );
};

export default ViewConsentFormModal; 