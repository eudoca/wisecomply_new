import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface InterestDisclosure {
  officerName: string;
  position: string;
  natureOfInterest: string;
  extentOfInterest: string;
  monetaryValue: string;
  dateOfAwareness: string;
  additionalNotes: string;
  confirmationAccuracy: boolean;
}

interface DisclosureRequest {
  officerName: string;
  officerEmail: string;
  message: string;
}

interface AddInterestFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (interest: InterestDisclosure) => void;
  onSendRequest: (request: DisclosureRequest) => void;
}

type CompletionMode = 'self' | 'officer';

const interestTypes = [
  { id: 'financial', label: 'Financial Interest' },
  { id: 'property', label: 'Property Interest' },
  { id: 'business', label: 'Business Relationship' },
  { id: 'family', label: 'Family Connection' },
  { id: 'gift', label: 'Gift or Benefit' },
  { id: 'other', label: 'Other' }
];

const AddInterestForm: React.FC<AddInterestFormProps> = ({ isOpen, onClose, onSave, onSendRequest }) => {
  // Track who will complete the form
  const [completionMode, setCompletionMode] = useState<CompletionMode>('self');
  
  // Form for admin completing the disclosure directly
  const [formData, setFormData] = useState<InterestDisclosure>({
    officerName: '',
    position: '',
    natureOfInterest: '',
    extentOfInterest: '',
    monetaryValue: '',
    dateOfAwareness: '',
    additionalNotes: '',
    confirmationAccuracy: false
  });
  
  // Form for sending a request to the officer
  const [requestData, setRequestData] = useState<DisclosureRequest>({
    officerName: '',
    officerEmail: '',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCompletionModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompletionMode(e.target.value as CompletionMode);
    setErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    // Update the appropriate form data based on completion mode
    if (completionMode === 'self') {
      setFormData((prev) => ({
        ...prev,
        [name]: val
      }));
    } else {
      setRequestData((prev) => ({
        ...prev,
        [name]: val
      }));
    }

    // Clear error for this field when changed
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateSelfForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Validate required fields
    if (!formData.officerName.trim()) {
      newErrors.officerName = 'Officer Name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.natureOfInterest) {
      newErrors.natureOfInterest = 'Nature of Interest is required';
    }
    
    if (!formData.extentOfInterest.trim()) {
      newErrors.extentOfInterest = 'Extent of Interest is required';
    }
    
    if (!formData.dateOfAwareness) {
      newErrors.dateOfAwareness = 'Date of Awareness is required';
    }
    
    if (!formData.confirmationAccuracy) {
      newErrors.confirmationAccuracy = 'You must confirm the accuracy of the disclosure';
    }
    
    // Validate monetary value as a number if provided
    if (formData.monetaryValue && !/^\d+(\.\d{1,2})?$/.test(formData.monetaryValue.replace(/[^0-9.]/g, ''))) {
      newErrors.monetaryValue = 'Monetary Value must be a valid currency amount';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRequestForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!requestData.officerName.trim()) {
      newErrors.officerName = 'Officer Name is required';
    }
    
    if (!requestData.officerEmail.trim()) {
      newErrors.officerEmail = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(requestData.officerEmail)) {
      newErrors.officerEmail = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (completionMode === 'self') {
      if (validateSelfForm()) {
        setIsSubmitting(true);
        
        try {
          onSave(formData);
          resetForm();
          onClose();
        } catch (err) {
          console.error('Error saving interest disclosure:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    } else {
      if (validateRequestForm()) {
        setIsSubmitting(true);
        
        try {
          onSendRequest(requestData);
          resetForm();
          onClose();
        } catch (err) {
          console.error('Error sending interest disclosure request:', err);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  const resetForm = () => {
    setCompletionMode('self');
    setFormData({
      officerName: '',
      position: '',
      natureOfInterest: '',
      extentOfInterest: '',
      monetaryValue: '',
      dateOfAwareness: '',
      additionalNotes: '',
      confirmationAccuracy: false
    });
    setRequestData({
      officerName: '',
      officerEmail: '',
      message: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="relative p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white my-8">
        <div className="flex justify-between items-start pb-3 border-b border-gray-200 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Interest Disclosure Form
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Completion mode selector */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Who will complete this disclosure?</p>
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
                I am completing this interest on behalf of an officer
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
                The officer will complete the form
              </label>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
          {/* Common fields for both modes */}
          <div>
            <Label htmlFor="officerName" className="block text-sm font-medium text-gray-700">
              Officer Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="officerName"
              name="officerName"
              value={completionMode === 'self' ? formData.officerName : requestData.officerName}
              onChange={handleChange}
              className={errors.officerName ? "border-red-500" : ""}
            />
            {errors.officerName && (
              <p className="mt-1 text-xs text-red-600">{errors.officerName}</p>
            )}
          </div>

          {/* Fields for officer completion mode */}
          {completionMode === 'officer' && (
            <>
              <div>
                <Label htmlFor="officerEmail" className="block text-sm font-medium text-gray-700">
                  Officer Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="officerEmail"
                  name="officerEmail"
                  type="email"
                  value={requestData.officerEmail}
                  onChange={handleChange}
                  className={errors.officerEmail ? "border-red-500" : ""}
                  placeholder="email@example.com"
                />
                {errors.officerEmail && (
                  <p className="mt-1 text-xs text-red-600">{errors.officerEmail}</p>
                )}
              </div>
              <div>
                <Label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message to Officer (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={requestData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Include any additional instructions or context for the officer..."
                />
              </div>
              <div className="bg-blue-50 p-4 rounded border border-blue-100 mt-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">What happens next?</h4>
                <p className="text-sm text-blue-700">
                  The officer will receive an email with a link to complete the interest disclosure form. 
                  You'll be notified when they submit their response.
                </p>
              </div>
            </>
          )}

          {/* Fields for self completion mode */}
          {completionMode === 'self' && (
            <>
              <div>
                <Label htmlFor="position" className="block text-sm font-medium text-gray-700">
                  Position/Role <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={errors.position ? "border-red-500" : ""}
                />
                {errors.position && (
                  <p className="mt-1 text-xs text-red-600">{errors.position}</p>
                )}
              </div>

              <div>
                <Label htmlFor="natureOfInterest" className="block text-sm font-medium text-gray-700">
                  Nature of Interest <span className="text-red-500">*</span>
                </Label>
                <select
                  id="natureOfInterest"
                  name="natureOfInterest"
                  value={formData.natureOfInterest}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.natureOfInterest ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500`}
                >
                  <option value="">Select Interest Type</option>
                  {interestTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.natureOfInterest && (
                  <p className="mt-1 text-xs text-red-600">{errors.natureOfInterest}</p>
                )}
              </div>

              <div>
                <Label htmlFor="extentOfInterest" className="block text-sm font-medium text-gray-700">
                  Extent of Interest <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="extentOfInterest"
                  name="extentOfInterest"
                  value={formData.extentOfInterest}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Provide a detailed description of the interest..."
                  className={errors.extentOfInterest ? "border-red-500" : ""}
                />
                {errors.extentOfInterest && (
                  <p className="mt-1 text-xs text-red-600">{errors.extentOfInterest}</p>
                )}
              </div>

              <div>
                <Label htmlFor="monetaryValue" className="block text-sm font-medium text-gray-700">
                  Monetary Value
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <Input
                    id="monetaryValue"
                    name="monetaryValue"
                    type="text"
                    placeholder="0.00"
                    value={formData.monetaryValue}
                    onChange={handleChange}
                    className={`pl-7 ${errors.monetaryValue ? "border-red-500" : ""}`}
                  />
                </div>
                {errors.monetaryValue && (
                  <p className="mt-1 text-xs text-red-600">{errors.monetaryValue}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">Leave blank if not applicable or unknown</p>
              </div>

              <div>
                <Label htmlFor="dateOfAwareness" className="block text-sm font-medium text-gray-700">
                  Date of Awareness <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dateOfAwareness"
                  name="dateOfAwareness"
                  type="date"
                  value={formData.dateOfAwareness}
                  onChange={handleChange}
                  className={errors.dateOfAwareness ? "border-red-500" : ""}
                />
                {errors.dateOfAwareness && (
                  <p className="mt-1 text-xs text-red-600">{errors.dateOfAwareness}</p>
                )}
              </div>

              <div>
                <Label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any additional context or information about this interest..."
                />
              </div>

              <div className="mt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="confirmationAccuracy"
                      name="confirmationAccuracy"
                      type="checkbox"
                      checked={formData.confirmationAccuracy}
                      onChange={handleChange}
                      className={`h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded ${
                        errors.confirmationAccuracy ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <Label htmlFor="confirmationAccuracy" className="font-medium text-gray-700">
                      Confirmation <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-gray-500">
                      I confirm that the information provided in this disclosure is complete and accurate to the best of my knowledge.
                    </p>
                    {errors.confirmationAccuracy && (
                      <p className="mt-1 text-xs text-red-600">{errors.confirmationAccuracy}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Submitting..." 
                : completionMode === 'officer' 
                  ? "Send Request" 
                  : "Submit Disclosure"
              }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddInterestForm; 