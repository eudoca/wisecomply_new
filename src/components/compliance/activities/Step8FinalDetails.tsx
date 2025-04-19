import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/Button'; 
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup'; 
import { Alert } from '../../wizard/Alert'; 

interface Step8FinalDetailsProps {
  onComplete: () => void; 
}

// NOTE: This state needs to be populated with data from previous steps/global state
interface Step8FormData {
  // 8.1
  registeredOfficer?: string; // Placeholder - Should be selected from a list
  // 8.2
  societyName?: string;
  financialYearEndDate?: string;
  physicalAddress?: string;
  postalAddress?: string;
  emailAddress?: string;
  phoneNumber?: string;
  memberTotal?: number | string;
  // 8.3
  contactPersonsConfirmed?: boolean; // Checkbox for confirmation
  // 8.4
  officersToRemove?: boolean | null | 'N/A';
  officersToRemoveDetails?: string; // Text area if yes
  // 8.5
  wantDownload?: boolean | null;
}

const Step8FinalDetails: React.FC<Step8FinalDetailsProps> = ({ onComplete }) => {
  // TODO: Pre-populate state with actual data from society/previous steps
  const [formData, setFormData] = useState<Step8FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Log formData whenever it changes
  useEffect(() => {
    console.log('Step8 formData updated:', formData);
  }, [formData]);

  const handleChange = (name: keyof Step8FormData, value: any) => {
    console.log(`handleChange called: name='${name}', value='${value}', type='${typeof value}'`); // Log handleChange call
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear related error on change
    if (errors[name]) {
        setErrors(prev => { 
            const newErrors = {...prev}; 
            delete newErrors[name]; 
            return newErrors; 
        });
    }
  };

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const { name, checked } = event.target;
     console.log(`handleCheckboxChange called: name='${name}', checked='${checked}'`); // Log Checkbox change
     setFormData(prev => ({ ...prev, [name]: checked }));
   };
   
   const handleRadioChange = (name: keyof Step8FormData, value: any) => {
     console.log(`handleRadioChange called: name='${name}', value='${value}', type='${typeof value}'`); // Log handleRadioChange call
     const val = value === 'N/A' ? 'N/A' : value; // Handle N/A specifically if needed elsewhere
     setFormData(prev => ({ ...prev, [name]: val }));
   };

   const handleDownload = (type: string) => {
       alert(`Placeholder: Downloading ${type}...`);
       // Actual download logic would go here
   }

  const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      // 8.1 - Placeholder validation
      if (!formData.registeredOfficer) newErrors.registeredOfficer = 'Registered officer must be selected.';
      
      // 8.2
      if (!formData.societyName) newErrors.societyName = 'Society name is required.';
      if (!formData.financialYearEndDate) newErrors.financialYearEndDate = 'Financial year end date is required.';
      if (!formData.physicalAddress) newErrors.physicalAddress = 'Physical address is required.';
      if (!formData.postalAddress) newErrors.postalAddress = 'Postal address is required.';
      if (!formData.emailAddress) newErrors.emailAddress = 'Email address is required.';
      if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required.';
      const memberTotalNum = parseInt(formData.memberTotal as string, 10);
      if (isNaN(memberTotalNum) || memberTotalNum < 10) newErrors.memberTotal = 'Total number of members (min 10) is required.';

      // 8.3
      if (!formData.contactPersonsConfirmed) newErrors.contactPersonsConfirmed = 'Please confirm contact person details.';
      
      // 8.4
      if (formData.officersToRemove === undefined || formData.officersToRemove === null) newErrors.officersToRemove = 'Please answer the officer removal question.';
      if (formData.officersToRemove === true && !formData.officersToRemoveDetails) newErrors.officersToRemoveDetails = 'Please list officers being removed.';
      
       // 8.5
      if (formData.wantDownload === null || formData.wantDownload === undefined) newErrors.wantDownload = 'Please select if you want a copy.';

      if (Object.keys(newErrors).length > 0) isValid = false;
      setErrors(newErrors);
      return isValid;
  }

  const handleSaveAndComplete = () => {
     if (validateForm()) {
         console.log('Saving Step 8 Data:', formData);
         onComplete(); 
     } else {
         console.log("Validation failed for Step 8", errors);
     }
  };

  // Placeholder data - Replace with actual fetched/derived data
  const placeholderContacts = [
      { id: 1, name: 'Alice Example', email: 'alice@example.com', phone: '021 123 4567' },
      { id: 2, name: 'Bob Sample', email: 'bob@sample.org', phone: '09 987 6543' }
  ];

  return (
    <div>
       {/* 8.1 Registrar Officer */}
       <div className="mb-6 pb-6 border-b border-gray-200">
           <h3 className="text-sm font-medium text-gray-800 mb-2">8.1 Registered Officer</h3>
            <label htmlFor="registeredOfficer" className="block text-sm text-gray-600 mb-2">Which officer will serve as the registered officer under the 2022 Act?</label>
            {/* Placeholder - Replace with actual selection dropdown populated from officer data */}
             <Input 
               id="registeredOfficer"
               name="registeredOfficer"
               value={formData.registeredOfficer || ''} 
               onChange={(e) => handleChange('registeredOfficer', e.target.value)}
               placeholder="Select or enter registered officer name (Placeholder)"
             />
             {errors.registeredOfficer && <p className="mt-1 text-xs text-red-600">{errors.registeredOfficer}</p>}
       </div>

       {/* 8.2 General Society Details */}
       <div className="mb-6 pb-6 border-b border-gray-200">
           <h3 className="text-sm font-medium text-gray-800 mb-2">8.2 General Society Details</h3>
            <p className="text-sm text-gray-600 mb-4">Please review and confirm these details:</p>
            {/* TODO: Pre-fill these fields from actual data */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                   <label htmlFor="societyName" className="block text-xs font-medium text-gray-700 mb-1">Society Name</label>
                   <Input id="societyName" name="societyName" value={formData.societyName || ''} onChange={(e) => handleChange('societyName', e.target.value)} />
                    {errors.societyName && <p className="mt-1 text-xs text-red-600">{errors.societyName}</p>}
                 </div>
                 <div>
                     <label htmlFor="financialYearEndDate" className="block text-xs font-medium text-gray-700 mb-1">Financial Year End Date</label>
                     <Input id="financialYearEndDate" name="financialYearEndDate" type="date" value={formData.financialYearEndDate || ''} onChange={(e) => handleChange('financialYearEndDate', e.target.value)} />
                     {errors.financialYearEndDate && <p className="mt-1 text-xs text-red-600">{errors.financialYearEndDate}</p>}
                 </div>
                 <div className="md:col-span-2">
                     <label htmlFor="physicalAddress" className="block text-xs font-medium text-gray-700 mb-1">Physical Address</label>
                     <Input id="physicalAddress" name="physicalAddress" value={formData.physicalAddress || ''} onChange={(e) => handleChange('physicalAddress', e.target.value)} />
                     {errors.physicalAddress && <p className="mt-1 text-xs text-red-600">{errors.physicalAddress}</p>}
                 </div>
                 <div className="md:col-span-2">
                     <label htmlFor="postalAddress" className="block text-xs font-medium text-gray-700 mb-1">Postal Address</label>
                     <Input id="postalAddress" name="postalAddress" value={formData.postalAddress || ''} onChange={(e) => handleChange('postalAddress', e.target.value)} />
                     {errors.postalAddress && <p className="mt-1 text-xs text-red-600">{errors.postalAddress}</p>}
                 </div>
                 <div>
                     <label htmlFor="emailAddress" className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
                     <Input id="emailAddress" name="emailAddress" type="email" value={formData.emailAddress || ''} onChange={(e) => handleChange('emailAddress', e.target.value)} />
                     {errors.emailAddress && <p className="mt-1 text-xs text-red-600">{errors.emailAddress}</p>}
                 </div>
                  <div>
                     <label htmlFor="phoneNumber" className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                     <Input id="phoneNumber" name="phoneNumber" type="tel" value={formData.phoneNumber || ''} onChange={(e) => handleChange('phoneNumber', e.target.value)} />
                     {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>}
                 </div>
                  <div>
                     <label htmlFor="memberTotal" className="block text-xs font-medium text-gray-700 mb-1">Total Members</label>
                     <Input id="memberTotal" name="memberTotal" type="number" min="10" value={formData.memberTotal || ''} onChange={(e) => handleChange('memberTotal', e.target.value)} />
                      {errors.memberTotal && <p className="mt-1 text-xs text-red-600">{errors.memberTotal}</p>}
                 </div>
            </div>
       </div>

        {/* 8.3 Contact Person Final Confirmation */}
        <div className="mb-6 pb-6 border-b border-gray-200">
             <h3 className="text-sm font-medium text-gray-800 mb-2">8.3 Contact Person Confirmation</h3>
             <p className="text-sm text-gray-600 mb-4">Please review the contact person(s) nominated in Step 3:</p>
             {/* Placeholder - Display actual contact details from state */}
             <div className="mb-4 p-3 border border-dashed border-gray-300 rounded bg-gray-50 text-sm space-y-1">
                 {placeholderContacts.map(c => (
                    <p key={c.id}><strong>{c.name}:</strong> {c.email}, {c.phone}</p>
                 ))}
                 {placeholderContacts.length === 0 && <p>No contact persons entered yet.</p>}
             </div>
             <label htmlFor="contactPersonsConfirmed" className="flex items-center text-sm text-gray-700">
               <input
                 id="contactPersonsConfirmed"
                 name="contactPersonsConfirmed"
                 type="checkbox"
                 checked={!!formData.contactPersonsConfirmed}
                 onChange={handleCheckboxChange} 
                 className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mr-2"
               />
               I confirm the contact person details are correct.
             </label>
              {errors.contactPersonsConfirmed && <p className="mt-1 text-xs text-red-600">{errors.contactPersonsConfirmed}</p>}
       </div>

        {/* 8.4 Register Updates */}
        <div className="mb-6 pb-6 border-b border-gray-200">
             <RadioGroup
               label="8.4 Are there any officers who will be removed from the current register?"
               name="officersToRemove"
               options={[
                   { value: true, label: 'Yes' }, 
                   { value: false, label: 'No' }, 
                   { value: 'N/A', label: 'Not Applicable (New Society)' } 
                 ]}
               value={formData.officersToRemove}
               onChange={(value) => handleRadioChange('officersToRemove', value)}
             />
             {errors.officersToRemove && <p className="mt-1 text-xs text-red-600">{errors.officersToRemove}</p>}
             {formData.officersToRemove === true && (
                 <div className="mt-3">
                    <label htmlFor="officersToRemoveDetails" className="block text-xs font-medium text-gray-700 mb-1">Please list officers being removed:</label>
                     <textarea
                         id="officersToRemoveDetails"
                         name="officersToRemoveDetails"
                         rows={3}
                         className="shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md"
                         value={formData.officersToRemoveDetails || ''}
                         onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('officersToRemoveDetails', e.target.value)}
                         placeholder="Enter names of officers..."
                     />
                     {errors.officersToRemoveDetails && <p className="mt-1 text-xs text-red-600">{errors.officersToRemoveDetails}</p>}
                 </div>
             )}
        </div>

        {/* 8.5 Confirmation */}
        <div className="mb-8">
             <h3 className="text-sm font-medium text-gray-800 mb-2">8.5 Final Steps & Submission</h3>
             <div className="p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800 mb-4">
                 <p className="mb-2">You need to complete the final application submission directly on the New Zealand Companies Office website:</p>
                 <a href="https://is-register.companiesoffice.govt.nz/" target="_blank" rel="noopener noreferrer" className="font-medium underline hover:text-blue-700">https://is-register.companiesoffice.govt.nz/</a>
             </div>
              <RadioGroup
               label="Do you want a copy of your application details and constitution (if applicable) to assist with the official submission?"
               name="wantDownload"
               options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
               value={formData.wantDownload}
               onChange={(value) => handleChange('wantDownload', value)}
             />
             {errors.wantDownload && <p className="mt-1 text-xs text-red-600">{errors.wantDownload}</p>}
              {formData.wantDownload === true && (
                 <div className="mt-4 space-x-2">
                     <Button variant="outline" size="sm" onClick={() => handleDownload('Application Details')}>Download Application Details (Placeholder)</Button>
                     <Button variant="outline" size="sm" onClick={() => handleDownload('Constitution')}>Download Constitution (Placeholder)</Button>
                 </div>
             )}
              {formData.wantDownload === false && (
                 <Alert type="info" message="Okay, please ensure you gather the necessary information before starting the official submission process." />
             )}
        </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
        <Button onClick={handleSaveAndComplete} variant="primary">Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step8FinalDetails; 