import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { RadioGroup, RadioGroupItem } from '../../ui/RadioGroup';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { AlertCircle, HelpCircle, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../../ui/Alert';
import { ConstitutionFormData, StepProps } from '../ConstitutionWizard';

const standardOfficeMethodText = "The Registered Office of the Society shall be at such place as the Committee determines from time to time, and notified to the Registrar of Incorporated Societies.";

interface Block1Errors {
  block1_societyName?: string;
  block1_societyPurpose?: string;
  block1_charitableStatus?: string;
  block1_meetingLocation?: string;
  block1_officeMethodText?: string;
}

interface Block1Props extends StepProps {
  blockNumber: number;
  onSaveProgress: (blockNumber: number) => void;
}

export const Block1Foundation: React.FC<Block1Props> = ({ formData, updateFormData, onComplete, blockNumber, onSaveProgress }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof ConstitutionFormData, string>>>({});
  const [specifyOfficeMethod, setSpecifyOfficeMethod] = useState<boolean>(formData.block1_specifyOfficeMethod || false);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ConstitutionFormData, string>> = {};
    let isValid = true;

    if (!formData.block1_societyName?.trim()) {
      newErrors.block1_societyName = 'Society name is required.';
      isValid = false;
    }
    if (!formData.block1_societyPurposes?.trim()) {
      newErrors.block1_societyPurposes = 'Society purposes are required.';
      isValid = false;
    }
    if (!formData.block1_charitableStatus) {
      newErrors.block1_charitableStatus = 'Please indicate charitable status.';
      isValid = false;
    } else if (formData.block1_charitableStatus === 'Yes' && !formData.block1_charitablePurposeDetails?.trim()) {
      newErrors.block1_charitablePurposeDetails = 'Details are required if the society has charitable purposes.';
      isValid = false;
    }
    if (!formData.block1_meetingLocation) {
      newErrors.block1_meetingLocation = 'Meeting location is required if a specific office address isn\'t set.';
      isValid = false;
    }
    if (formData.block1_specifyOfficeMethod === null || formData.block1_specifyOfficeMethod === undefined) {
      newErrors.block1_specifyOfficeMethod = 'Please specify how the registered office is determined.';
      isValid = false;
    } else if (formData.block1_specifyOfficeMethod === true && !formData.block1_officeMethodText?.trim()) {
      newErrors.block1_officeMethodText = 'Please describe the method for determining the office address.';
      isValid = false;
    } else if (formData.block1_specifyOfficeMethod === false && !formData.block1_meetingLocation?.trim()) {
      newErrors.block1_meetingLocation = 'Meeting location is required if a specific office address isn\'t set.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData(name as keyof ConstitutionFormData, value);
    if (errors[name as keyof ConstitutionFormData]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRadioChange = (name: keyof ConstitutionFormData, value: string) => {
    updateFormData(name, value);
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBooleanRadioChange = (name: keyof ConstitutionFormData, value: string) => {
    const booleanValue = value === 'true' ? true : value === 'false' ? false : null;
    updateFormData(name, booleanValue);
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSave = () => {
    if (validate()) {
      console.log('Block 1 Validated Data:', {
        block1_societyName: formData.block1_societyName,
        block1_societyPurposes: formData.block1_societyPurposes,
        block1_specifyOfficeMethod: formData.block1_specifyOfficeMethod,
        block1_officeMethodText: formData.block1_officeMethodText,
        block1_meetingLocation: formData.block1_meetingLocation,
        block1_charitableStatus: formData.block1_charitableStatus,
        block1_charitablePurposeDetails: formData.block1_charitablePurposeDetails,
      });
      onComplete();
    } else {
      console.log("Block 1 Validation Failed", errors);
    }
  };

  const handleSaveProgressClick = () => {
    console.log('Saving progress for Block 1...');
    onSaveProgress(blockNumber);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Block 1: Foundation and Purpose</h2>

      {/* Task 1.1: Society Name */}
      <div className="space-y-2">
        <Label htmlFor="block1_societyName">1.1 What is the proposed name of the society?</Label>
        <Input
          id="block1_societyName"
          name="block1_societyName"
          value={formData.block1_societyName || ''}
          onChange={handleInputChange}
          maxLength={100}
          aria-invalid={!!errors.block1_societyName}
          aria-describedby={errors.block1_societyName ? "block1_societyName_error" : undefined}
        />
        {errors.block1_societyName && <p id="block1_societyName_error" className="text-sm text-red-600 mt-1">{errors.block1_societyName}</p>}
      </div>

      {/* Task 1.2: Society Purpose */}
      <div className="space-y-2">
        <Label htmlFor="block1_societyPurpose">1.2 What is the purpose of the society?</Label>
        <Textarea
          id="block1_societyPurpose"
          name="block1_societyPurpose"
          value={formData.block1_societyPurpose || ''}
          onChange={handleInputChange}
          rows={4}
          maxLength={500}
          aria-describedby="societyPurposeError"
        />
        <p className="text-sm text-gray-500">Describe the main aims and objectives (max 500 characters).</p>
        {errors.block1_societyPurpose && <p id="societyPurposeError" className="text-sm text-red-600">{errors.block1_societyPurpose}</p>}
      </div>

      {/* Task 1.3: Charitable Status */}
      <div className="space-y-2">
          <Label>1.3 Is the society intended to be charitable?</Label>
          <TooltipProvider>
             <Tooltip>
                  <TooltipTrigger type="button" className="ml-2 text-gray-500 hover:text-gray-700">
                      <HelpCircle size={16} />
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Charitable status may affect registration requirements and tax obligations.</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
          <RadioGroup
              name="block1_charitableStatus"
              value={formData.block1_charitableStatus}
              onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, block1_charitableStatus: value }));
                  if (errors.block1_charitableStatus) setErrors(prev => ({...prev, block1_charitableStatus: undefined}));
              }}
              aria-describedby="charitableStatusError"
          >
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Yes" id="charityYes" />
                  <Label htmlFor="charityYes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                  <RadioGroupItem value="No" id="charityNo" />
                  <Label htmlFor="charityNo">No</Label>
              </div>
          </RadioGroup>
          {errors.block1_charitableStatus && <p id="charitableStatusError" className="text-sm text-red-600">{errors.block1_charitableStatus}</p>}
          {formData.block1_charitableStatus === 'Yes' && (
             <div className="space-y-2 mt-2">
                  <Label htmlFor="block1_charitablePurposeDetails">Please provide details on the charitable purpose:</Label>
                  <Textarea
                      id="block1_charitablePurposeDetails"
                      name="block1_charitablePurposeDetails"
                      value={formData.block1_charitablePurposeDetails || ''}
                      onChange={handleInputChange}
                      rows={3}
                      maxLength={300}
                  />
              </div>
           )}
      </div>

      {/* Task 1.4: Location of Meetings */}
      <div className="space-y-2">
        <Label>1.4 How will the location of general meetings be determined?</Label>
         <TooltipProvider>
             <Tooltip>
                  <TooltipTrigger type="button" className="ml-2 text-gray-500 hover:text-gray-700">
                      <HelpCircle size={16} />
                  </TooltipTrigger>
                  <TooltipContent>
                      <p>Choose how meeting locations will be decided (e.g., fixed location, rotating, decided by committee).</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
        <RadioGroup
          name="block1_meetingLocation"
          value={formData.block1_meetingLocation}
          onValueChange={handleInputChange}
          aria-describedby="meetingLocationError"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="committee_decision" id="locCommittee" />
            <Label htmlFor="locCommittee">Determined by the committee before each meeting</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="specified_address" id="locSpecified" />
            <Label htmlFor="locSpecified">Specified address (requires rule amendment to change)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="rotating_locations" id="locRotating" />
            <Label htmlFor="locRotating">Rotating between pre-agreed locations</Label>
          </div>
        </RadioGroup>
        {errors.block1_meetingLocation && <p id="meetingLocationError" className="text-sm text-red-600">{errors.block1_meetingLocation}</p>}
      </div>

      {/* Task 1.5: Registered Office */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
           <Checkbox
             id="specifyOfficeMethod"
             checked={specifyOfficeMethod}
             onCheckedChange={handleSpecifyOfficeMethodChange}
             aria-describedby="officeMethodError"
           />
           <Label htmlFor="specifyOfficeMethod">1.5 Specify the method for determining the registered office location?</Label>
             <TooltipProvider>
                 <Tooltip>
                      <TooltipTrigger type="button" className="ml-1 text-gray-500 hover:text-gray-700">
                          <HelpCircle size={16} />
                      </TooltipTrigger>
                      <TooltipContent>
                          <p>If unchecked, the constitution won't specify how the office location is decided, allowing flexibility.</p>
                      </TooltipContent>
                  </Tooltip>
              </TooltipProvider>
        </div>
        {specifyOfficeMethod && (
          <div className="pl-6 space-y-2">
            <Label htmlFor="block1_officeMethodText">Method for determining registered office:</Label>
            <Textarea
              id="block1_officeMethodText"
              name="block1_officeMethodText"
              value={formData.block1_officeMethodText || ''}
              onChange={handleInputChange}
              rows={3}
              maxLength={300}
              aria-describedby="officeMethodTextError"
            />
             <p className="text-sm text-gray-500">Describe how the registered office location will be decided (max 300 characters).</p>
            {errors.block1_officeMethodText && <p id="officeMethodTextError" className="text-sm text-red-600">{errors.block1_officeMethodText}</p>}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-end space-x-2">
          <Button onClick={handleSaveProgressClick}>Save Progress</Button>
          <Button onClick={handleSave}>Mark as Complete</Button>
      </div>

      {Object.keys(errors).length > 0 && !validate() && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Validation Errors</AlertTitle>
                <AlertDescription>
                    Please correct the highlighted fields before marking this section as complete.
                </AlertDescription>
            </Alert>
        )}

    </div>
  );
};

export default Block1Foundation; 