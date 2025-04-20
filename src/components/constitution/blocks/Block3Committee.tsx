import React, { useState, useEffect } from 'react';
import { Info, HelpCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tooltip } from '../../wizard/Tooltip';
import { Textarea } from '@/components/ui/textarea';

// Standard Tailwind classes for inputs
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";
const labelClass = "block text-sm font-medium text-gray-700 mb-1"; // Standard label size for inputs/selects etc.
const taskTitleClass = "text-base font-semibold text-gray-800 mb-1"; // Consistent task title
const descriptionClass = "text-sm text-gray-600 mt-1 mb-3"; // Consistent description
const errorClass = "mt-1 text-xs text-red-600"; // Error message class

// Placeholder standard texts for role descriptions
const standardGeneralDutiesText = "Committee members must act in good faith and in what they believe to be the best interests of the Society. They must exercise their powers for a proper purpose and with the care and diligence that a reasonable person with the same responsibilities would exercise in the same circumstances. They must comply with the Act and this Constitution."; // Based on Act s54-59
const standardGeneralPowersText = "Subject to this Constitution and the Act, the Committee is responsible for the governance and management of the Society's affairs, property, and funds. The Committee may exercise all the Society's powers that are not required by the Act or this Constitution to be exercised by the members at a General Meeting.";

// Define the props for the component
interface Block3CommitteeProps extends StepProps {
  onSaveProgress: (blockNumber: number) => void;
  blockNumber: number;
}

// Define local validation error state type
type LocalValidationErrors = Partial<Record<keyof ConstitutionFormData, string>>;

// Validation logic specific to Block 3
const validateBlock3 = (data: ConstitutionFormData): LocalValidationErrors => {
  const errors: LocalValidationErrors = {};

  // Task 3.1
  if (!data.block3_officerRoles || data.block3_officerRoles.length < 3) {
    errors.block3_officerRoles = 'Select at least 3 officer roles (or minimum committee size).';
  }
  if (data.block3_officerRoles?.includes('add_custom_role') && !data.block3_officerRolesOther?.trim()) {
    errors.block3_officerRolesOther = 'Please specify the custom role name.';
  }
  if (!data.block3_committeeMinSize || data.block3_committeeMinSize < 3) {
    errors.block3_committeeMinSize = 'Minimum committee size must be at least 3.';
  }
  if (data.block3_committeeMaxSize && data.block3_committeeMinSize && data.block3_committeeMaxSize < data.block3_committeeMinSize) {
    errors.block3_committeeMaxSize = 'Maximum size cannot be less than minimum size.';
  }
  // Potentially add validation for role description textareas if 'Yes' is selected

  // Task 3.2
  if (!data.block3_electionMethod) {
    errors.block3_electionMethod = 'Select an election method.';
  }
  if ((data.block3_electionMethod === 'Appointed' || data.block3_electionMethod === 'Mix' || data.block3_electionMethod === 'Other') && !data.block3_electionMethodOther?.trim()) {
    errors.block3_electionMethodOther = 'Specify details for the selected election method.';
  }
  if (data.block3_electionMethod === 'Elected' && !data.block3_electionProcess?.trim()) {
    errors.block3_electionProcess = 'Describe the nomination and election process.';
  }
  if (!data.block3_termOfOffice) {
    errors.block3_termOfOffice = 'Select the term of office.';
  }
  if (data.block3_termOfOffice === 'Other' && !data.block3_termOfOfficeOther?.trim()) {
    errors.block3_termOfOfficeOther = 'Specify the other term of office.';
  }
  if (data.block3_reElectionLimits === true && !data.block3_reElectionLimitDetails?.trim()) {
    errors.block3_reElectionLimitDetails = 'Specify the re-election limits.';
  }
  if (data.block3_canCoOpt === true) {
    if (!data.block3_coOptDuration) {
      errors.block3_coOptDuration = 'Select the co-option duration.';
    }
    if ((data.block3_coOptDuration === 'fixed' || data.block3_coOptDuration === 'Other') && !data.block3_coOptDurationOther?.trim()) {
      errors.block3_coOptDurationOther = 'Specify the co-option duration details.';
    }
  }
  if (!data.block3_casualVacancyMethod) {
    errors.block3_casualVacancyMethod = 'Select how casual vacancies are filled.';
  }
  if (data.block3_casualVacancyMethod === 'Other' && !data.block3_casualVacancyMethodOther?.trim()) {
    errors.block3_casualVacancyMethodOther = 'Specify the other method for filling vacancies.';
  }

  // Task 3.3
  if (!data.block3_committeePowers) {
    errors.block3_committeePowers = 'Select how committee powers are stated.';
  }
  if (data.block3_committeePowers === 'list' && !data.block3_committeePowersList?.trim()) {
    errors.block3_committeePowersList = 'Provide the list of committee powers.';
  }
  if (data.block3_stateGeneralDuties === null || data.block3_stateGeneralDuties === undefined){
    errors.block3_stateGeneralDuties = 'Please specify whether to state general duties.';
  }

  // Task 3.4
  if (!data.block3_removalGrounds || data.block3_removalGrounds.length === 0) {
    errors.block3_removalGrounds = 'Select at least one ground for removal.';
  }
  if (data.block3_removalGrounds?.includes('removal_absence') && (!data.block3_removalAbsenceNumber || data.block3_removalAbsenceNumber < 1)) {
    errors.block3_removalAbsenceNumber = 'Specify a valid number of meetings for absence.';
  }
  if (!data.block3_removalProcedure) {
    errors.block3_removalProcedure = 'Select the procedure for removal.';
  }
  if ((data.block3_removalProcedure === 'committee_res' || data.block3_removalProcedure === 'gm_res' || data.block3_removalProcedure === 'Other') && !data.block3_removalProcedureOther?.trim()) {
    errors.block3_removalProcedureOther = 'Specify the majority or other procedure details.';
  }

  // Task 3.5
  if (!data.block3_meetingFrequency) {
    errors.block3_meetingFrequency = 'Select the meeting frequency.';
  }
  if (data.block3_meetingFrequency === 'Other' && (!data.block3_meetingFrequencyNumber || data.block3_meetingFrequencyNumber < 1)) {
    errors.block3_meetingFrequencyNumber = 'Specify a valid number for meeting frequency.';
  }
  if (!data.block3_committeeQuorumType) {
    errors.block3_committeeQuorumType = 'Select the quorum type.';
  }
  if (!data.block3_committeeQuorumValue || data.block3_committeeQuorumValue < 1) {
    errors.block3_committeeQuorumValue = 'Specify a valid quorum value.';
  }
  if (data.block3_committeeQuorumType === 'percentage' && data.block3_committeeQuorumValue && data.block3_committeeQuorumValue > 100) {
    errors.block3_committeeQuorumValue = 'Quorum percentage cannot exceed 100.';
  }
  if (!data.block3_committeeChair) {
    errors.block3_committeeChair = 'Select who chairs committee meetings.';
  }
  if (data.block3_committeeChair === 'Other' && !data.block3_committeeChairOther?.trim()) {
    errors.block3_committeeChairOther = 'Specify the other chair details.';
  }
  if (data.block3_chairCastingVote === null || data.block3_chairCastingVote === undefined){
    errors.block3_chairCastingVote = 'Please specify if the Chairperson has a casting vote.';
  }
  if (data.block3_remoteMeetings === null || data.block3_remoteMeetings === undefined){
    errors.block3_remoteMeetings = 'Please specify if remote meetings are allowed.';
  }
  if (data.block3_writtenResolutions === null || data.block3_writtenResolutions === undefined){
    errors.block3_writtenResolutions = 'Please specify if written resolutions are allowed.';
  }
  if (data.block3_writtenResolutions === true && !data.block3_writtenResolutionApproval){
    errors.block3_writtenResolutionApproval = 'Please specify the approval needed for written resolutions.';
  }
  if (data.block3_writtenResolutionApproval === 'Other' && !data.block3_writtenResolutionApprovalOther?.trim()){
    errors.block3_writtenResolutionApprovalOther = 'Please specify the other approval method.';
  }
  if (!data.block3_conflictOfInterestMethod){
    errors.block3_conflictOfInterestMethod = 'Please specify how conflicts of interest are managed.';
  }
  if (data.block3_conflictOfInterestMethod === 'Other' && !data.block3_conflictOfInterestMethodOther?.trim()){
    errors.block3_conflictOfInterestMethodOther = 'Please specify the other conflict management method.';
  }

  // Task 3.6
  if (!data.block3_contactPersonAppointment) {
    errors.block3_contactPersonAppointment = 'Select how the contact person is appointed.';
  }
  if (data.block3_contactPersonAppointment === 'Other' && !data.block3_contactPersonAppointmentOther?.trim()) {
    errors.block3_contactPersonAppointmentOther = 'Specify the other appointment method.';
  }

  return errors;
};

const Block3Committee: React.FC<Block3CommitteeProps> = ({ 
    formData, 
    updateFormData, 
    onComplete,
    onSaveProgress,
    blockNumber
}) => {
  const [localErrors, setLocalErrors] = useState<LocalValidationErrors>({});

  useEffect(() => {
    const errors = validateBlock3(formData);
    setLocalErrors(errors);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let processedValue: any = value;

    if (type === 'number') {
        processedValue = value === '' ? undefined : Number(value);
    } else if (type === 'checkbox') {
        return;
    }

    updateFormData(name as keyof ConstitutionFormData, processedValue);

    if (localErrors[name as keyof ConstitutionFormData]) {
        setLocalErrors(prev => {
            const next = { ...prev };
            delete next[name as keyof ConstitutionFormData];
            return next;
        });
    }
  };

  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    
    if (field === 'block3_officerRoles') {
        if (value === 'add_custom_role' && !checked) {
            updateFormData('block3_officerRolesOther', '');
            updateFormData('block3_roleDescriptionOther', '');
            setLocalErrors(prev => {
                const next = {...prev};
                delete next.block3_officerRolesOther;
                delete next.block3_roleDescriptionOther;
                return next;
            });
        }
    }
     if (field === 'block3_removalGrounds') {
        if (value === 'removal_absence' && !checked) {
            updateFormData('block3_removalAbsenceNumber', undefined);
            setLocalErrors(prev => { const next = {...prev}; delete next.block3_removalAbsenceNumber; return next; });
        }
         if (value === 'other' && !checked) {
            updateFormData('block3_removalGroundsOther', '');
            setLocalErrors(prev => { const next = {...prev}; delete next.block3_removalGroundsOther; return next; });
        }
     }

    updateFormData(field, newValues);

    if (localErrors[field]) {
        setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
    }
  };

  const handleRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
    if (field === 'block3_committeePowers' && value === 'general') {
        updateFormData('block3_committeePowersList', '');
        setLocalErrors(prev => { const next = {...prev}; delete next.block3_committeePowersList; return next; });
    }

    updateFormData(field, value);
    if (localErrors[field]) {
        setLocalErrors(prev => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
    }
  };

  const handleBooleanRadioChange = (field: keyof ConstitutionFormData, value: string | number | boolean) => {
    const booleanValue = value === 'yes' || value === true ? true : value === 'no' || value === false ? false : null;

    if (field === 'block3_includeRoleDescriptions' && booleanValue === false) {
         updateFormData('block3_roleDescriptionPresident', '');
         updateFormData('block3_roleDescriptionSecretary', '');
         updateFormData('block3_roleDescriptionTreasurer', '');
         updateFormData('block3_roleDescriptionOther', '');
         setLocalErrors(prev => {
             const next = {...prev};
             delete next.block3_roleDescriptionPresident;
             delete next.block3_roleDescriptionSecretary;
             delete next.block3_roleDescriptionTreasurer;
             delete next.block3_roleDescriptionOther;
             return next;
         });
    }
     if (field === 'block3_reElectionLimits' && booleanValue === false) {
         updateFormData('block3_reElectionLimitDetails', '');
         setLocalErrors(prev => { const next = {...prev}; delete next.block3_reElectionLimitDetails; return next; });
     }
     if (field === 'block3_canCoOpt' && booleanValue === false) {
         updateFormData('block3_coOptDuration', '');
         updateFormData('block3_coOptDurationOther', '');
         setLocalErrors(prev => {
             const next = {...prev};
             delete next.block3_coOptDuration;
             delete next.block3_coOptDurationOther;
             return next;
         });
     }
      if (field === 'block3_writtenResolutions' && booleanValue === false) {
         updateFormData('block3_writtenResolutionApproval', '');
         updateFormData('block3_writtenResolutionApprovalOther', '');
         setLocalErrors(prev => {
             const next = {...prev};
             delete next.block3_writtenResolutionApproval;
             delete next.block3_writtenResolutionApprovalOther;
             return next;
         });
     }

    updateFormData(field, booleanValue);
    if (localErrors[field]) {
        setLocalErrors(prev => { const next = {...prev}; delete next[field]; return next; });
    }
  };

  const handleSave = () => {
    const errors = validateBlock3(formData);
    setLocalErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log('Block 3 Validation Passed');
      onSaveProgress(blockNumber);
      onComplete(blockNumber);
    } else {
      console.log('Block 3 Validation Failed', errors);
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.focus();
      }
    }
  };

  const renderRoleDescription = (role: string) => {
    let fieldKey: keyof ConstitutionFormData;
    switch (role.toLowerCase()) {
        case 'president': fieldKey = 'block3_roleDescriptionPresident'; break;
        case 'secretary': fieldKey = 'block3_roleDescriptionSecretary'; break;
        case 'treasurer': fieldKey = 'block3_roleDescriptionTreasurer'; break;
        case 'add_custom_role': fieldKey = 'block3_roleDescriptionOther'; break;
        default: return null;
    }

    const roleName = role === 'add_custom_role' ? formData.block3_officerRolesOther || 'Custom Role' : role;

    return (
        <textarea
            id={fieldKey}
            name={fieldKey}
            value={formData[fieldKey] || ''}
            onChange={handleInputChange}
            className={`${baseInputClasses} mt-1 w-full ${localErrors[fieldKey] ? 'border-red-500' : ''}`}
            placeholder={`Describe the duties of the ${roleName}`}
            rows={3}
        />
    );
  };

  return (
    <div className="space-y-6">
        <div> 
            <div className="flex items-center gap-2">
                <label className={taskTitleClass}>3.1 Committee Composition & Roles (Mandatory)
                  <Tooltip text="Define the structure and roles of your committee. Minimum 3 members required.">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                  </Tooltip>
                </label>
            </div>
            <p className={descriptionClass}>Select all required roles. President/Secretary/Treasurer are common. Minimum 3 officers needed. (Ref: Act s45, s27(1)(f)(i))</p>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Officer Roles:</label>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('President') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'President', e.target.checked)} /> President/Chairperson
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Secretary') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'Secretary', e.target.checked)} /> Secretary
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Treasurer') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'Treasurer', e.target.checked)} /> Treasurer
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Vice-President') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'Vice-President', e.target.checked)} /> Vice-President/Chair
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('General Member') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'General Member', e.target.checked)} /> General Committee Member(s)
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                     <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('add_custom_role') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_officerRoles', 'add_custom_role', e.target.checked)} />
                     <Input 
                         type="text" 
                         placeholder="Add Custom Role Name..." 
                         value={formData.block3_officerRolesOther || ''}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_officerRolesOther', e.target.value)}
                         disabled={!formData.block3_officerRoles?.includes('add_custom_role')} 
                         className={`flex-1 text-sm ${!formData.block3_officerRoles?.includes('add_custom_role') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block3_officerRolesOther ? 'border-red-500' : ''}`}
                     />
                 </div>
            </div>
            {localErrors.block3_officerRoles && <p className={errorClass}>{localErrors.block3_officerRoles}</p>}
             {localErrors.block3_officerRolesOther && <p className={errorClass}>{localErrors.block3_officerRolesOther}</p>}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                    <label htmlFor="block3_committeeMinSize" className="block text-sm font-medium text-gray-700 mb-1">Minimum number on Committee?</label>
                    <Input id="block3_committeeMinSize" name="block3_committeeMinSize" type="number" min="3" value={formData.block3_committeeMinSize || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_committeeMinSize', e.target.valueAsNumber)} className={localErrors.block3_committeeMinSize ? 'border-red-500' : ''} />
                    {localErrors.block3_committeeMinSize && <p className={errorClass}>{localErrors.block3_committeeMinSize}</p>}
                 </div>
                 <div>
                    <label htmlFor="block3_committeeMaxSize" className="block text-sm font-medium text-gray-700 mb-1">Maximum number on Committee?</label>
                    <Input id="block3_committeeMaxSize" name="block3_committeeMaxSize" type="number" min={formData.block3_committeeMinSize || 3} value={formData.block3_committeeMaxSize || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_committeeMaxSize', e.target.valueAsNumber)} className={localErrors.block3_committeeMaxSize ? 'border-red-500' : ''} />
                     {localErrors.block3_committeeMaxSize && <p className={errorClass}>{localErrors.block3_committeeMaxSize}</p>}
                 </div>
             </div>

            <div className="pt-4 border-t border-gray-100">
                 <Label className={labelClass}>Include descriptions of the duties for key officers? (Optional / Good Practice)</Label>
                 <RadioGroup
                     name="block3_includeRoleDescriptions"
                     value={formData.block3_includeRoleDescriptions === true ? 'yes' : formData.block3_includeRoleDescriptions === false ? 'no' : ''}
                     onValueChange={(value: string) => handleBooleanRadioChange('block3_includeRoleDescriptions', value)}
                     className="flex space-x-4 mt-2"
                 >
                     <div className="flex items-center space-x-2">
                         <RadioGroupItem value="yes" id="b3-roles-yes" />
                         <Label htmlFor="b3-roles-yes">Yes</Label>
                     </div>
                     <div className="flex items-center space-x-2">
                         <RadioGroupItem value="no" id="b3-roles-no" />
                         <Label htmlFor="b3-roles-no">No</Label>
                     </div>
                 </RadioGroup>
                 {localErrors.block3_includeRoleDescriptions && <p className={errorClass}>{localErrors.block3_includeRoleDescriptions}</p>}
                 <p className={descriptionClass}>Defining duties provides clarity for officers and members. (See example: Clauses 18, 19)</p>
                 {formData.block3_includeRoleDescriptions === true && (
                     <div className="mt-3 space-y-3">
                         {formData.block3_officerRoles?.includes('President') && <div><label htmlFor="block3_roleDescriptionPresident" className="block text-sm font-medium text-gray-700 mb-1">President/Chairperson Duties:</label>{renderRoleDescription('President')}</div>}
                         {formData.block3_officerRoles?.includes('Secretary') && <div><label htmlFor="block3_roleDescriptionSecretary" className="block text-sm font-medium text-gray-700 mb-1">Secretary Duties:</label>{renderRoleDescription('Secretary')}</div>}
                         {formData.block3_officerRoles?.includes('Treasurer') && <div><label htmlFor="block3_roleDescriptionTreasurer" className="block text-sm font-medium text-gray-700 mb-1">Treasurer Duties:</label>{renderRoleDescription('Treasurer')}</div>}
                          {formData.block3_officerRoles?.includes('add_custom_role') && formData.block3_officerRolesOther?.trim() && <div><label htmlFor="block3_roleDescriptionOther" className="block text-sm font-medium text-gray-700 mb-1">{formData.block3_officerRolesOther} Duties:</label>{renderRoleDescription('add_custom_role')}</div>}
                         {localErrors.block3_roleDescriptionPresident && <p className={errorClass}>{localErrors.block3_roleDescriptionPresident}</p>}
                         {localErrors.block3_roleDescriptionSecretary && <p className={errorClass}>{localErrors.block3_roleDescriptionSecretary}</p>}
                         {localErrors.block3_roleDescriptionTreasurer && <p className={errorClass}>{localErrors.block3_roleDescriptionTreasurer}</p>}
                         {localErrors.block3_roleDescriptionOther && <p className={errorClass}>{localErrors.block3_roleDescriptionOther}</p>}
                     </div>
                 )}
            </div>
        </div>

        <hr className="border-gray-200" /> 

        <div> 
             <div className="flex items-center gap-2">
                 <label className={taskTitleClass}>3.2 Committee Election, Appointment & Terms
                   <Tooltip text="How are committee members elected or appointed, and for how long?">
                     <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                 </Tooltip>
                 </label>
             </div>
             <p className={descriptionClass}>Detail the cycle of your committee. Consider eligibility (Act s47(3) restrictions apply automatically regarding bankruptcy, dishonesty convictions etc.). (Ref: Act s27(1)(f)(ii), (iii))</p>
             <div className="space-y-4">
                 <div>
                     <label htmlFor="block3_electionMethod" className="block text-sm font-medium text-gray-700 mb-1">How are Committee members chosen?</label>
                     <select id="block3_electionMethod" name="block3_electionMethod" className={`${baseInputClasses} ${localErrors.block3_electionMethod ? 'border-red-500' : ''}`} value={formData.block3_electionMethod || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_electionMethod', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="Elected">Elected at the AGM</option>
                         <option value="Appointed">Appointed by [Specify Body/Person]</option>
                         <option value="Mix">Mix [Specify]</option>
                         <option value="Other">Other [Specify]</option>
                     </select>
                     {(formData.block3_electionMethod === 'Appointed' || formData.block3_electionMethod === 'Mix' || formData.block3_electionMethod === 'Other') && (
                         <Input type="text" className={`mt-1 block w-full ${localErrors.block3_electionMethodOther ? 'border-red-500' : ''}`} value={formData.block3_electionMethodOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_electionMethodOther', e.target.value)} placeholder="Specify details..."/>
                     )}
                     {localErrors.block3_electionMethod && <p className={errorClass}>{localErrors.block3_electionMethod}</p>}
                     {localErrors.block3_electionMethodOther && <p className={errorClass}>{localErrors.block3_electionMethodOther}</p>}
                 </div>
                 {formData.block3_electionMethod === 'Elected' && (
                     <div>
                         <label htmlFor="block3_electionProcess" className="block text-sm font-medium text-gray-700 mb-1">Describe the nomination and election process:</label>
                         <textarea id="block3_electionProcess" name="block3_electionProcess" rows={3} className={`${baseInputClasses} ${localErrors.block3_electionProcess ? 'border-red-500' : ''}`} value={formData.block3_electionProcess || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block3_electionProcess', e.target.value)} placeholder="e.g., Call for nominations 4 weeks before AGM, nominations close 2 weeks prior, voting by secret ballot if contested."/>
                          {localErrors.block3_electionProcess && <p className={errorClass}>{localErrors.block3_electionProcess}</p>}
                     </div>
                 )}
 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                     <div>
                         <label htmlFor="block3_termOfOffice" className="block text-sm font-medium text-gray-700 mb-1">Term of office for Committee members?</label>
                          <select id="block3_termOfOffice" name="block3_termOfOffice" className={`${baseInputClasses} ${localErrors.block3_termOfOffice ? 'border-red-500' : ''}`} value={formData.block3_termOfOffice || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_termOfOffice', e.target.value)}>
                             <option value="" disabled>Select...</option>
                             <option value="1">1 year</option>
                             <option value="2">2 years</option>
                             <option value="3">3 years</option>
                             <option value="Other">Other (Specify)</option>
                         </select>
                         {formData.block3_termOfOffice === 'Other' && (
                             <Input type="text" className={`mt-1 block w-full ${localErrors.block3_termOfOfficeOther ? 'border-red-500' : ''}`} value={formData.block3_termOfOfficeOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_termOfOfficeOther', e.target.value)} placeholder="Specify other term..."/>
                         )}
                         {localErrors.block3_termOfOffice && <p className={errorClass}>{localErrors.block3_termOfOffice}</p>}
                         {localErrors.block3_termOfOfficeOther && <p className={errorClass}>{localErrors.block3_termOfOfficeOther}</p>}
                     </div>
                     <div>
                         <Label className={labelClass}>Are there limits on re-election?</Label>
                         <RadioGroup
                             name="block3_reElectionLimits"
                             value={formData.block3_reElectionLimits === true ? 'yes' : formData.block3_reElectionLimits === false ? 'no' : ''}
                             onValueChange={(value: string) => handleBooleanRadioChange('block3_reElectionLimits', value)}
                             className="flex space-x-4 mt-2"
                         >
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="b3-reElect-yes" />
                                  <Label htmlFor="b3-reElect-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="b3-reElect-no" />
                                  <Label htmlFor="b3-reElect-no">No</Label>
                              </div>
                         </RadioGroup>
                         {localErrors.block3_reElectionLimits && <p className={errorClass}>{localErrors.block3_reElectionLimits}</p>}
                          {formData.block3_reElectionLimits === true && (
                             <Input
                                 id="block3_reElectionLimitDetails"
                                 name="block3_reElectionLimitDetails"
                                 type="text"
                                 className={`mt-1 block w-full ${localErrors.block3_reElectionLimitDetails ? 'border-red-500' : ''}`}
                                 value={formData.block3_reElectionLimitDetails || ''}
                                 onChange={handleInputChange}
                                 placeholder="Specify limit (e.g., Max 3 consecutive terms)"
                             />
                         )}
                     </div>
                 </div>
 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div>
                         <Label className={labelClass}>Can the Committee co-opt members between AGMs?</Label>
                         <RadioGroup
                             name="block3_canCoOpt"
                             value={formData.block3_canCoOpt === true ? 'yes' : formData.block3_canCoOpt === false ? 'no' : ''}
                             onValueChange={(value: string) => handleBooleanRadioChange('block3_canCoOpt', value)}
                             className="flex space-x-4 mt-2"
                         >
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="yes" id="b3-coopt-yes" />
                                  <Label htmlFor="b3-coopt-yes">Yes</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="no" id="b3-coopt-no" />
                                  <Label htmlFor="b3-coopt-no">No</Label>
                              </div>
                         </RadioGroup>
                         {localErrors.block3_canCoOpt && <p className={errorClass}>{localErrors.block3_canCoOpt}</p>}
                          {formData.block3_canCoOpt === true && (
                              <div>
                                 <label htmlFor="block3_coOptDuration" className="block text-sm font-medium text-gray-700 mb-1">For how long can they be co-opted?</label>
                                  <select id="block3_coOptDuration" name="block3_coOptDuration" className={`${baseInputClasses} ${localErrors.block3_coOptDuration ? 'border-red-500' : ''}`} value={formData.block3_coOptDuration || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_coOptDuration', e.target.value)}>
                                     <option value="" disabled>Select...</option>
                                     <option value="next_agm">Until the next AGM</option>
                                     <option value="fixed">Fixed period [Specify]</option>
                                     <option value="Other">Other [Specify]</option>
                                 </select>
                                 {(formData.block3_coOptDuration === 'fixed' || formData.block3_coOptDuration === 'Other') && (
                                     <Input type="text" className={`mt-1 block w-full ${localErrors.block3_coOptDurationOther ? 'border-red-500' : ''}`} value={formData.block3_coOptDurationOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_coOptDurationOther', e.target.value)} placeholder="Specify duration..."/>
                                 )}
                                 {localErrors.block3_coOptDuration && <p className={errorClass}>{localErrors.block3_coOptDuration}</p>}
                                 {localErrors.block3_coOptDurationOther && <p className={errorClass}>{localErrors.block3_coOptDurationOther}</p>}
                             </div>
                          )}
                     </div>
                     <div>
                         <label htmlFor="block3_casualVacancyMethod" className="block text-sm font-medium text-gray-700 mb-1">How are casual vacancies filled?</label>
                          <select id="block3_casualVacancyMethod" name="block3_casualVacancyMethod" className={`${baseInputClasses} ${localErrors.block3_casualVacancyMethod ? 'border-red-500' : ''}`} value={formData.block3_casualVacancyMethod || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_casualVacancyMethod', e.target.value)}>
                             <option value="" disabled>Select...</option>
                             <option value="committee_appoints">Committee appoints replacement until next AGM</option>
                             <option value="vacant">Position left vacant until next AGM</option>
                             <option value="sgm_election">SGM called to elect replacement</option>
                             <option value="Other">Other (Specify)</option>
                         </select>
                         {formData.block3_casualVacancyMethod === 'Other' && (
                             <Input type="text" className={`mt-1 block w-full ${localErrors.block3_casualVacancyMethodOther ? 'border-red-500' : ''}`} value={formData.block3_casualVacancyMethodOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_casualVacancyMethodOther', e.target.value)} placeholder="Specify other method..."/>
                         )}
                         {localErrors.block3_casualVacancyMethod && <p className={errorClass}>{localErrors.block3_casualVacancyMethod}</p>}
                         {localErrors.block3_casualVacancyMethodOther && <p className={errorClass}>{localErrors.block3_casualVacancyMethodOther}</p>}
                     </div>
                 </div>
             </div>
        </div>

        <hr className="border-gray-200" /> 

        <div> 
            <div className="flex items-center gap-2">
                <label className={taskTitleClass}>3.3 Committee Powers & Functions
                  <Tooltip text="Define what the committee is responsible for.">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                  </Tooltip>
                </label>
            </div>
            <p className={descriptionClass}>Define the committee&apos;s role. General powers usually suffice. Stating duties reminds officers of obligations under Act s46, s54-59. (Ref: s27(1)(f)(iv))</p>
            <div className="space-y-4">
                 <div>
                     <RadioGroup
                         name="block3_committeePowers"
                         value={formData.block3_committeePowers || 'general'}
                         onValueChange={(value) => handleRadioChange('block3_committeePowers', value as string)}
                         className="flex flex-col space-y-2 mt-2"
                     >
                         <Label className={labelClass}>How do you want to state the Committee&apos;s powers and functions?</Label>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="list" id="b3-power-list" />
                             <Label htmlFor="b3-power-list">Include a detailed list of powers (Editable template below)</Label>
                         </div>
                         <div className="flex items-center space-x-2">
                             <RadioGroupItem value="general" id="b3-power-general" />
                             <Label htmlFor="b3-power-general">State general powers of governance (Recommended standard clause below)</Label>
                         </div>
                     </RadioGroup>
                     {localErrors.block3_committeePowers && <p className={errorClass}>{localErrors.block3_committeePowers}</p>}
                     
                     <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                         {formData.block3_committeePowers === 'list' ? (
                             <textarea
                                className={`${baseInputClasses} text-xs ${localErrors.block3_committeePowersList ? 'border-red-500' : ''}`}
                                rows={5}
                                value={formData.block3_committeePowersList || 'Example: Employ staff, Enter contracts, Manage finances...'}
                                onChange={handleInputChange}
                             />
                         ) : (
                             <p>{standardGeneralPowersText}</p>
                         )}
                     </div>
                      {localErrors.block3_committeePowersList && <p className={errorClass}>{localErrors.block3_committeePowersList}</p>}
                 </div>
                 <div className="pt-4 border-t border-gray-100">
                     <RadioGroup
                         name="block3_stateGeneralDuties"
                         value={formData.block3_stateGeneralDuties === true ? 'yes' : formData.block3_stateGeneralDuties === false ? 'no' : 'yes'}
                         onValueChange={(value) => handleBooleanRadioChange('block3_stateGeneralDuties', value)}
                         className="flex flex-col space-y-2 mt-2"
                     >
                         <Label className={labelClass}>Do you want to explicitly state the general duties of Committee members (acting in good faith, care/diligence, etc.)?</Label>
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="b3-duties-yes" />
                              <Label htmlFor="b3-duties-yes">Yes (Recommended - Standard text below)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="b3-duties-no" />
                              <Label htmlFor="b3-duties-no">No</Label>
                          </div>
                     </RadioGroup>
                     {localErrors.block3_stateGeneralDuties && <p className={errorClass}>{localErrors.block3_stateGeneralDuties}</p>}
                     {formData.block3_stateGeneralDuties === true && (
                         <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                             <p>{standardGeneralDutiesText}</p>
                         </div>
                     )}
                 </div>
            </div>
        </div>

        <hr className="border-gray-200" /> 

        <div> 
             <div className="flex items-center gap-2">
                <label className={taskTitleClass}>3.4 Grounds and Procedure for Removal from Committee
                   <Tooltip text="Define how committee members can be removed, ensuring fairness.">
                    <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                  </Tooltip>
                </label>
            </div>
             <p className={descriptionClass}>Must include grounds and procedure, ensuring the process is fair (natural justice - the person should have a chance to respond). (Ref: Act s50, s27(1)(f)(v))</p>
             <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grounds for removal before term ends?</label>
                     <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('misconduct') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_removalGrounds', 'misconduct', e.target.checked)} />
                            Breach of duties / Serious misconduct
                        </label>
                         <div className="flex items-center gap-2 text-sm text-gray-700">
                             <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('removal_absence') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_removalGrounds', 'removal_absence', e.target.checked)} />
                             Extended unexplained absence from meetings (Specify number):
                             {formData.block3_removalGrounds?.includes('removal_absence') && (
                                 <Input 
                                     type="number" 
                                     className={`w-16 ml-1 ${localErrors.block3_removalAbsenceNumber ? 'border-red-500' : ''}`} 
                                     min="1" 
                                     value={formData.block3_removalAbsenceNumber || ''} 
                                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_removalAbsenceNumber', e.target.valueAsNumber)} 
                                 />
                             )}
                        </div>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('ineligible') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_removalGrounds', 'ineligible', e.target.checked)} />
                            Becomes ineligible under the Act (e.g., bankrupt)
                        </label>
                         <div className="flex items-start gap-2">
                             <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                                 <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('other') || false} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckboxGroupChange('block3_removalGrounds', 'other', e.target.checked)} />
                                 Other:
                             </label>
                             {formData.block3_removalGrounds?.includes('other') && (
                                 <textarea rows={2} className={`flex-1 ${baseInputClasses} ${localErrors.block3_removalGroundsOther ? 'border-red-500' : ''}`} value={formData.block3_removalGroundsOther || ''} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block3_removalGroundsOther', e.target.value)} placeholder="Describe other grounds..."/>
                             )}
                         </div>
                     </div>
                     {localErrors.block3_removalGrounds && <p className={errorClass}>{localErrors.block3_removalGrounds}</p>}
                </div>
                 <div className="pt-4 border-t border-gray-100">
                    <label htmlFor="block3_removalProcedure" className="block text-sm font-medium text-gray-700 mb-1">Procedure for removal?</label>
                     <select id="block3_removalProcedure" name="block3_removalProcedure" className={`${baseInputClasses} ${localErrors.block3_removalProcedure ? 'border-red-500' : ''}`} value={formData.block3_removalProcedure || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_removalProcedure', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="committee_res">Resolution of the Committee (specify majority)</option>
                         <option value="gm_res">Resolution at a General Meeting (specify majority)</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                     {(formData.block3_removalProcedure === 'committee_res' || formData.block3_removalProcedure === 'gm_res' || formData.block3_removalProcedure === 'Other') && (
                         <Input type="text" className={`mt-1 block w-full ${localErrors.block3_removalProcedureOther ? 'border-red-500' : ''}`} value={formData.block3_removalProcedureOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_removalProcedureOther', e.target.value)} placeholder="Specify majority needed or other procedure..."/>
                     )}
                      {localErrors.block3_removalProcedure && <p className={errorClass}>{localErrors.block3_removalProcedure}</p>}
                     {localErrors.block3_removalProcedureOther && <p className={errorClass}>{localErrors.block3_removalProcedureOther}</p>}
                </div>
            </div>
        </div>

        <hr className="border-gray-200" /> 

        <div> 
             <div className="flex items-center gap-2">
                <label className={taskTitleClass}>3.5 Committee Meetings & Procedures
                   <Tooltip text="Define how the committee holds meetings and makes decisions.">
                         <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                     </Tooltip>
                </label>
             </div>
             <p className={descriptionClass}>Define the basic rules for how your committee operates. (Ref: Act s27(1)(f)(vii))</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                     <label htmlFor="block3_meetingFrequency" className="block text-sm font-medium text-gray-700 mb-1">How often should the Committee aim to meet?</label>
                     <select id="block3_meetingFrequency" name="block3_meetingFrequency" className={`${baseInputClasses} ${localErrors.block3_meetingFrequency ? 'border-red-500' : ''}`} value={formData.block3_meetingFrequency || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_meetingFrequency', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="Monthly">Monthly</option>
                         <option value="Bi-Monthly">Bi-Monthly</option>
                         <option value="Quarterly">Quarterly</option>
                         <option value="number_per_year">At least [Number] times per year</option>
                         <option value="As required">As required</option>
                         <option value="Other">Other (Specify)</option> 
                     </select>
                     {formData.block3_meetingFrequency === 'number_per_year' && (
                         <Input type="number" min="1" className={`mt-1 block w-24 ${localErrors.block3_meetingFrequencyNumber ? 'border-red-500' : ''}`} value={formData.block3_meetingFrequencyNumber || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_meetingFrequencyNumber', e.target.valueAsNumber)} placeholder="Number"/>
                     )}
                 </div>
                 <div>
                     <label htmlFor="block3_committeeQuorumValue" className="block text-sm font-medium text-gray-700 mb-1">Quorum for Committee meetings?</label>
                     <div className="flex items-center gap-2">
                        <Input id="block3_committeeQuorumValue" name="block3_committeeQuorumValue" type="number" min="1" className={`w-24 ${localErrors.block3_committeeQuorumValue ? 'border-red-500' : ''}`} value={formData.block3_committeeQuorumValue || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_committeeQuorumValue', e.target.valueAsNumber)} placeholder="Number"/>
                        <select className={baseInputClasses + " flex-1 py-1 text-sm"} value={formData.block3_committeeQuorumType || 'number'} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_committeeQuorumType', e.target.value)}>
                             <option value="number">members</option>
                             <option value="percentage">percent (%) of members</option>
                         </select>
                     </div>
                     {localErrors.block3_committeeQuorumValue && <p className={errorClass}>{localErrors.block3_committeeQuorumValue}</p>}
                 </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                    <label htmlFor="block3_committeeChair" className="block text-sm font-medium text-gray-700 mb-1">Who chairs Committee meetings?</label>
                     <select id="block3_committeeChair" name="block3_committeeChair" className={`${baseInputClasses} ${localErrors.block3_committeeChair ? 'border-red-500' : ''}`} value={formData.block3_committeeChair || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_committeeChair', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="President">President/Chairperson chairs; if absent, Committee elects chair for meeting</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                      {formData.block3_committeeChair === 'Other' && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block3_committeeChairOther ? 'border-red-500' : ''}`} value={formData.block3_committeeChairOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_committeeChairOther', e.target.value)} placeholder="Specify other chair arrangement..."/>
                     )}
                     {localErrors.block3_committeeChair && <p className={errorClass}>{localErrors.block3_committeeChair}</p>}
                     {localErrors.block3_committeeChairOther && <p className={errorClass}>{localErrors.block3_committeeChairOther}</p>}
                 </div>
                 <div>
                      <Label className={labelClass}>Is a casting vote allowed for the Chairperson?</Label>
                     <RadioGroup
                         name="block3_chairCastingVote"
                         value={formData.block3_chairCastingVote === true ? 'yes' : formData.block3_chairCastingVote === false ? 'no' : ''}
                         onValueChange={(value) => handleBooleanRadioChange('block3_chairCastingVote', value)}
                         className="flex space-x-4 mt-2"
                     >
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="b3-castvote-yes" />
                              <Label htmlFor="b3-castvote-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="b3-castvote-no" />
                              <Label htmlFor="b3-castvote-no">No</Label>
                          </div>
                     </RadioGroup>
                     {localErrors.block3_chairCastingVote && <p className={errorClass}>{localErrors.block3_chairCastingVote}</p>}
                 </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                     <Label className={labelClass}>Allow meetings via electronic means (teleconference, video)?</Label>
                     <RadioGroup
                         name="block3_remoteMeetings"
                         value={formData.block3_remoteMeetings === true ? 'yes' : formData.block3_remoteMeetings === false ? 'no' : 'yes'}
                         onValueChange={(value) => handleBooleanRadioChange('block3_remoteMeetings', value)}
                         className="flex space-x-4 mt-2"
                     >
                          <div className="flex items-center space-x-2">
                               <RadioGroupItem value="yes" id="b3-remote-yes" />
                               <Label htmlFor="b3-remote-yes">Yes</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                               <RadioGroupItem value="no" id="b3-remote-no" />
                               <Label htmlFor="b3-remote-no">No</Label>
                           </div>
                      </RadioGroup>
                      {localErrors.block3_remoteMeetings && <p className={errorClass}>{localErrors.block3_remoteMeetings}</p>}
                 </div>
                 <div>
                      <Label className={labelClass}>Allow decisions by written resolution (without meeting)?</Label>
                     <RadioGroup
                         name="block3_writtenResolutions"
                         value={formData.block3_writtenResolutions === true ? 'yes' : formData.block3_writtenResolutions === false ? 'no' : ''}
                         onValueChange={(value) => handleBooleanRadioChange('block3_writtenResolutions', value)}
                         className="flex space-x-4 mt-2"
                     >
                           <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="b3-writtenres-yes" />
                                <Label htmlFor="b3-writtenres-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="b3-writtenres-no" />
                                <Label htmlFor="b3-writtenres-no">No</Label>
                            </div>
                       </RadioGroup>
                       {localErrors.block3_writtenResolutions && <p className={errorClass}>{localErrors.block3_writtenResolutions}</p>}
                 </div>
             </div>
             <div className="pt-4 border-t border-gray-100">
                 <label htmlFor="block3_conflictOfInterestMethod" className="block text-sm font-medium text-gray-700 mb-1">How will conflicts of interest be managed in meetings?</label>
                 <select id="block3_conflictOfInterestMethod" name="block3_conflictOfInterestMethod" className={`${baseInputClasses} ${localErrors.block3_conflictOfInterestMethod ? 'border-red-500' : ''}`} value={formData.block3_conflictOfInterestMethod || ''} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_conflictOfInterestMethod', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="declare_abstain">Member declares interest and does not vote/participate on matter</option>
                     <option value="declare_discuss_not_vote">Member declares interest, may discuss but not vote</option>
                     <option value="follow_policy">Follow specific Society Conflict of Interest policy</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {formData.block3_conflictOfInterestMethod === 'Other' && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block3_conflictOfInterestMethodOther ? 'border-red-500' : ''}`} value={formData.block3_conflictOfInterestMethodOther || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_conflictOfInterestMethodOther', e.target.value)} placeholder="Specify other method..."/>
                 )}
                 {localErrors.block3_conflictOfInterestMethod && <p className={errorClass}>{localErrors.block3_conflictOfInterestMethod}</p>}
                 {localErrors.block3_conflictOfInterestMethodOther && <p className={errorClass}>{localErrors.block3_conflictOfInterestMethodOther}</p>}
             </div>
        </div>

        <hr className="border-gray-200" /> 

        <div> 
             <div className="flex items-center gap-2">
                 <label className={taskTitleClass}>3.6 Appointing Contact Person
                   <Tooltip text="This person is the official contact for the Registrar of Incorporated Societies.">
                     <HelpCircle className="inline-block ml-1 h-4 w-4 text-gray-500 cursor-help" />
                 </Tooltip>
                 </label>
             </div>
            <p className={descriptionClass}>This person is the main contact for the Registrar. They don&apos;t need to be an officer. (Ref: Act s113, s27(1)(g))</p>
            <select 
                id="block3_contactPersonAppointment" 
                name="block3_contactPersonAppointment" 
                className={`${baseInputClasses} ${localErrors.block3_contactPersonAppointment ? 'border-red-500' : ''}`} 
                value={formData.block3_contactPersonAppointment || ''} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateFormData('block3_contactPersonAppointment', e.target.value)}
            >
                 <option value="" disabled>Select...</option>
                 <option value="committee_appoints">Appointed annually by the Committee</option>
                 <option value="agm_election">Elected at the AGM</option>
                 <option value="Other">Other (Specify)</option>
             </select>
              {formData.block3_contactPersonAppointment === 'Other' && (
                <Input 
                    type="text" 
                    className={`mt-1 block w-full ${localErrors.block3_contactPersonAppointmentOther ? 'border-red-500' : ''}`} 
                    value={formData.block3_contactPersonAppointmentOther || ''} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block3_contactPersonAppointmentOther', e.target.value)} 
                    placeholder="Specify other appointment method..."
                />
                     )}
             {localErrors.block3_contactPersonAppointment && <p className={errorClass}>{localErrors.block3_contactPersonAppointment}</p>}
             {localErrors.block3_contactPersonAppointmentOther && <p className={errorClass}>{localErrors.block3_contactPersonAppointmentOther}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
                variant="secondary"
                onClick={() => onSaveProgress(blockNumber)}
            >
                Save Progress
            </Button>
            <Button
                onClick={handleSave}
            >
                Mark as Complete
            </Button>
        </div>
    </div>
  );
};

export default Block3Committee; 