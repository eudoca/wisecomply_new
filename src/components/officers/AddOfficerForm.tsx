import React, { useState, useEffect } from 'react';
import { Officer } from '../../types/officer';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { cn } from '../../utils/cn';
import { Alert } from '../ui/alert';
import { Textarea } from '../ui/textarea';
import { AlertTriangleIcon } from 'lucide-react';

interface AddOfficerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (officer: Officer) => void;
  initialData?: Officer | null;
}

const commonOfficerRoles = [
  'President',
  'Secretary',
  'Treasurer',
  'Committee Member',
  'Other'
];

const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const inputClass = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClass = "h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500";
const errorClass = "mt-1 text-xs text-red-600";

const AddOfficerForm: React.FC<AddOfficerFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<Officer>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof Officer, string>>>({});
  const [showOtherPosition, setShowOtherPosition] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          dateElectedAppointed: initialData.dateElectedAppointed ? initialData.dateElectedAppointed.split('T')[0] : '',
          termEndDate: initialData.termEndDate ? initialData.termEndDate.split('T')[0] : '',
          consentDate: initialData.consentDate ? initialData.consentDate.split('T')[0] : ''
        });
        setShowOtherPosition(!commonOfficerRoles.includes(initialData.position) || initialData.position === 'Other');
      } else {
        setFormData({
          fullName: '',
          position: commonOfficerRoles[0],
          dateElectedAppointed: '',
          termEndDate: '',
          email: '',
          phone: '',
          address: '',
          isEligible: false,
          hasConsented: false,
          consentDate: ''
        });
        setShowOtherPosition(false);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (name === 'position') {
      setShowOtherPosition(value === 'Other');
      if (value !== 'Other' && formData.position === 'Other') {
        
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof Officer]) {
      setErrors(prev => { const next = {...prev}; delete next[name as keyof Officer]; return next; });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
    if (errors[name as keyof Officer]) {
      setErrors(prev => { const next = {...prev}; delete next[name as keyof Officer]; return next; });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Officer, string>> = {};
    let isValid = true;

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full Legal Name is required.';
      isValid = false;
    }
    if (!formData.position || (formData.position === 'Other' && !formData.position?.trim())) {
        newErrors.position = 'Position is required.';
        isValid = false;
    }
    if (!formData.dateElectedAppointed) {
      newErrors.dateElectedAppointed = 'Date Elected/Appointed is required.';
      isValid = false;
    }
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'A valid Email Address is required.';
      isValid = false;
    }
    if (!formData.isEligible) {
      newErrors.isEligible = 'Confirmation of eligibility is required.';
      isValid = false;
    }
    if (!formData.hasConsented) {
      newErrors.hasConsented = 'Confirmation of written consent is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      const officerId = initialData?.id || Date.now().toString();
      const officerToSave: Officer = {
        ...formData,
        id: officerId,
        isEligible: formData.isEligible || false,
        hasConsented: formData.hasConsented || false,
        fullName: formData.fullName || '',
        position: formData.position || '',
        dateElectedAppointed: formData.dateElectedAppointed || '',
        email: formData.email || ''
      } as Officer;

      onSave(officerToSave);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center px-4">
      <div className="relative mx-auto p-6 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start pb-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Officer' : 'Add New Officer'}
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose} aria-label="Close modal">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        <div className="mt-4 space-y-4 max-h-[70vh] overflow-y-auto p-4 pr-2">
          <div>
            <label htmlFor="fullName" className={labelClass}>Full Legal Name <span className="text-red-500">*</span></label>
            <Input 
              id="fullName" 
              name="fullName" 
              type="text" 
              value={formData.fullName || ''} 
              onChange={handleChange} 
              className={cn(inputClass, errors.fullName ? 'border-red-500' : '')} 
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="position" className={labelClass}>Position / Title <span className="text-red-500">*</span></label>
            <select 
              id="position" 
              name="position" 
              value={showOtherPosition ? 'Other' : formData.position || ''} 
              onChange={handleChange} 
              className={cn(inputClass, errors.position ? 'border-red-500' : '')} 
            >
              {commonOfficerRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            {showOtherPosition && (
              <div className="mt-2">
                 <label htmlFor="positionOther" className="sr-only">Specify Other Position</label>
                 <Input 
                   id="positionOther" 
                   name="position"
                   type="text" 
                   placeholder="Specify other position..."
                   value={showOtherPosition ? formData.position : ''}
                   onChange={handleChange} 
                   className={cn(inputClass, errors.position ? 'border-red-500' : '')}
                 />
              </div>
            )}
            {errors.position && <p className={errorClass}>{errors.position}</p>}
          </div>
          
          <div>
            <label htmlFor="dateElectedAppointed" className={labelClass}>Date Elected / Appointed <span className="text-red-500">*</span></label>
            <Input 
              id="dateElectedAppointed" 
              name="dateElectedAppointed" 
              type="date" 
              value={formData.dateElectedAppointed || ''} 
              onChange={handleChange} 
              className={cn(inputClass, errors.dateElectedAppointed ? 'border-red-500' : '')} 
            />
            {errors.dateElectedAppointed && <p className={errorClass}>{errors.dateElectedAppointed}</p>}
          </div>

          <div>
            <label htmlFor="termEndDate" className={labelClass}>Term End Date (Optional)</label>
            <Input 
              id="termEndDate" 
              name="termEndDate" 
              type="date" 
              value={formData.termEndDate || ''} 
              onChange={handleChange} 
              className={inputClass}
            />
          </div>

          <fieldset className="border-t border-gray-200 pt-4">
            <legend className="text-base font-medium text-gray-900 mb-2">Contact Details</legend>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email || ''} 
                onChange={handleChange} 
                className={cn(inputClass, errors.email ? 'border-red-500' : '')} 
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>
            <div className="mt-4">
              <label htmlFor="phone" className={labelClass}>Phone Number (Recommended)</label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={formData.phone || ''} 
                onChange={handleChange} 
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="address" className={labelClass}>Physical/Postal Address (Optional)</label>
              <Textarea 
                id="address" 
                name="address" 
                rows={3} 
                value={formData.address || ''} 
                onChange={handleChange} 
                className={inputClass}
              />
            </div>
          </fieldset>

          <fieldset className="border-t border-gray-200 pt-4 space-y-4">
            <legend className="text-base font-medium text-gray-900 mb-2">Confirmations</legend>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isEligible"
                  name="isEligible"
                  type="checkbox"
                  checked={formData.isEligible || false}
                  onChange={handleCheckboxChange}
                  className={cn(checkboxClass, errors.isEligible ? 'border-red-500' : '')} 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isEligible" className={labelClass}>Confirm Eligibility <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500">I confirm this person meets the eligibility criteria under the Incorporated Societies Act 2022 and is not disqualified.</p>
                {errors.isEligible && <p className={errorClass}>{errors.isEligible}</p>}
              </div>
            </div>
            
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="hasConsented"
                  name="hasConsented"
                  type="checkbox"
                  checked={formData.hasConsented || false}
                  onChange={handleCheckboxChange}
                  className={cn(checkboxClass, errors.hasConsented ? 'border-red-500' : '')} 
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="hasConsented" className={labelClass}>Confirm Written Consent <span className="text-red-500">*</span></label>
                <p className="text-xs text-gray-500">Written consent form from this officer has been received and is held on record.</p>
                {errors.hasConsented && <p className={errorClass}>{errors.hasConsented}</p>}
              </div>
            </div>
            
            <div className="mt-4">
              <label htmlFor="consentDate" className={labelClass}>Date Consent Signed (Optional)</label>
              <Input 
                id="consentDate" 
                name="consentDate" 
                type="date" 
                value={formData.consentDate || ''} 
                onChange={handleChange} 
                className={inputClass}
              />
            </div>
          </fieldset>
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b space-x-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button> 
          <Button type="button" onClick={handleSave}>Save Officer</Button>
        </div>
      </div>
    </div>
  );
};

export default AddOfficerForm; 