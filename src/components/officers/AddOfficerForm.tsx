import React, { useState, useEffect } from 'react';
import { Officer } from '../../types/officer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '../../utils/cn';

interface AddOfficerFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (officer: Officer) => void;
  onSendInvite: (request: OfficerInviteRequest) => void;
  initialData?: Officer | null;
}

interface OfficerInviteRequest {
  fullName: string;
  email: string;
  message: string;
}

type CompletionMode = 'self' | 'officer';

const commonOfficerRoles = [
  'President',
  'Secretary',
  'Treasurer',
  'Chairperson',
  'Committee Member',
  'Board Member',
  'Other'
];

const labelClass = "block text-sm font-medium text-gray-700 mb-1";
const inputClass = "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md";
const errorClass = "mt-1 text-xs text-red-600";

const AddOfficerForm: React.FC<AddOfficerFormProps> = ({ isOpen, onClose, onSave, onSendInvite, initialData }) => {
  const [completionMode, setCompletionMode] = useState<CompletionMode>('self');

  // Form for admin completing the officer details
  const [formData, setFormData] = useState<Partial<Officer>>({});
  
  // Form for sending a request to the officer
  const [inviteData, setInviteData] = useState<OfficerInviteRequest>({
    fullName: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showOtherPosition, setShowOtherPosition] = useState(false);
  const [hasSignedForm, setHasSignedForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          dateElectedAppointed: initialData.dateElectedAppointed ? initialData.dateElectedAppointed.split('T')[0] : '',
          termEndDate: initialData.termEndDate ? initialData.termEndDate.split('T')[0] : '',
        });
        setShowOtherPosition(!commonOfficerRoles.includes(initialData.position) || initialData.position === 'Other');
      } else {
        setFormData({
          fullName: '',
          position: commonOfficerRoles[0],
          email: '',
          dateElectedAppointed: '',
          termEndDate: '',
        });
        setInviteData({
          fullName: '',
          email: '',
          message: ''
        });
        setCompletionMode('self');
        setShowOtherPosition(false);
        setHasSignedForm(false);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const handleCompletionModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletionMode(e.target.value as CompletionMode);
    setErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const val = isCheckbox ? (e.target as HTMLInputElement).checked : value;

    if (name === 'position' && !isCheckbox) {
      setShowOtherPosition(value === 'Other');
    }

    if (name === 'hasSignedForm' && isCheckbox) {
      setHasSignedForm(val as boolean);
    } else if (completionMode === 'self') {
    setFormData(prev => ({
      ...prev,
        [name]: val
      }));
    } else {
      setInviteData(prev => ({
      ...prev,
        [name]: val
    }));
    }

    if (errors[name]) {
      setErrors(prev => { 
        const next = {...prev}; 
        delete next[name]; 
        return next; 
      });
    }
  };

  const validateSelfForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = 'Full Legal Name is required.';
    }
    
    if (!formData.position || (formData.position === 'Other' && !formData.position?.trim())) {
        newErrors.position = 'Position is required.';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (!formData.dateElectedAppointed) {
      newErrors.dateElectedAppointed = 'Date Elected/Appointed is required.';
    }
    
    if (!hasSignedForm) {
      newErrors.hasSignedForm = 'You must confirm that you have sighted the signed form.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateInviteForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!inviteData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    
    if (!inviteData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(inviteData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (completionMode === 'self') {
      if (validateSelfForm()) {
        setIsSubmitting(true);
        
        try {
      const officerId = initialData?.id || Date.now().toString();
      const officerToSave: Officer = {
        ...formData,
        id: officerId,
        fullName: formData.fullName || '',
        position: formData.position || '',
        dateElectedAppointed: formData.dateElectedAppointed || '',
            // Set default values for required fields in the Officer type
            email: formData.email || '',
            isEligible: true,
            hasConsented: true,
      } as Officer;

      onSave(officerToSave);
          onClose();
        } catch (err) {
          console.error('Error saving officer:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      if (validateInviteForm()) {
        setIsSubmitting(true);
        
        try {
          onSendInvite(inviteData);
          onClose();
        } catch (err) {
          console.error('Error sending officer invite:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center px-4">
      <div className="relative mx-auto p-6 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start pb-4 border-b rounded-t">
          <h3 className="text-xl font-semibold text-gray-900">
            {initialData ? 'Edit Officer' : 'Add New Officer'}
          </h3>
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onClose} aria-label="Close modal">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>

        {!initialData && (
          <div className="mb-6 mt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">How would you like to add this officer?</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <input
                  id="completion-self"
                  name="completionMode"
                  type="radio"
                  value="self"
                  checked={completionMode === 'self'}
                  onChange={handleCompletionModeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="completion-self" className="ml-2 block text-sm font-medium text-gray-700">
                  I am completing this on behalf of an officer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="completion-officer"
                  name="completionMode"
                  type="radio"
                  value="officer"
                  checked={completionMode === 'officer'}
                  onChange={handleCompletionModeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor="completion-officer" className="ml-2 block text-sm font-medium text-gray-700">
                  The officer will complete the form digitally
                </label>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4 p-4 pr-2 max-h-[70vh] overflow-y-auto">
          {/* Common fields for both modes */}
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full {completionMode === 'self' ? 'Legal ' : ''}Name <span className="text-red-500">*</span>
            </label>
            <Input 
              id="fullName" 
              name="fullName" 
              type="text" 
              value={completionMode === 'self' ? formData.fullName || '' : inviteData.fullName} 
              onChange={handleChange} 
              className={cn(inputClass, errors.fullName ? 'border-red-500' : '')} 
            />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>

          {/* Email field for both modes */}
          <div>
            <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              value={completionMode === 'self' ? formData.email || '' : inviteData.email} 
              onChange={handleChange} 
              className={cn(inputClass, errors.email ? 'border-red-500' : '')}
              placeholder="email@example.com"
            />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          {/* Fields for officer completion mode */}
          {completionMode === 'officer' && (
            <>
              <div>
                <Label htmlFor="message" className={labelClass}>
                  Message to Officer (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={inviteData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Include any additional instructions or context for the officer..."
                  className={inputClass}
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded border border-blue-100 mt-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">What happens next?</h4>
                <p className="text-sm text-blue-700">
                  The officer will receive an email with a link to complete their details. 
                  They'll be asked to provide their position, appointment date, and other required information.
                  You'll be notified when they complete their submission.
                </p>
              </div>
            </>
          )}

          {/* Fields for self completion mode */}
          {completionMode === 'self' && (
            <>
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

            <div className="mt-4">
                <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                      id="hasSignedForm"
                      name="hasSignedForm"
                  type="checkbox"
                      checked={hasSignedForm}
                      onChange={handleChange}
                      className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ${
                        errors.hasSignedForm ? "border-red-500" : ""
                      }`}
                />
              </div>
              <div className="ml-3 text-sm">
                    <Label htmlFor="hasSignedForm" className="font-medium text-gray-700">
                      Signed Form Confirmation <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-gray-500">
                      I confirm that I have sighted the signed officer form and am authorized to enter this information.
                    </p>
                    {errors.hasSignedForm && (
                      <p className="mt-1 text-xs text-red-600">{errors.hasSignedForm}</p>
                    )}
              </div>
            </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-end pt-4 border-t border-gray-200 rounded-b space-x-2">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button> 
          <Button type="button" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting 
              ? "Submitting..." 
              : completionMode === 'officer' 
                ? "Send Invitation" 
                : "Save Officer"
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddOfficerForm; 