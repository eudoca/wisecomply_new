import React, { useState } from 'react';
import { Input } from '../../ui/Input';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Tooltip } from '../../ui/Tooltip';
import { Button } from '../../ui/Button';
import { HelpCircle } from 'lucide-react';
import type { StepProps, ConstitutionFormData } from '../ConstitutionWizard';

// Standard Tailwind classes for inputs
const baseInputClasses = "shadow-sm focus:ring-brand-primary focus:border-brand-primary block w-full sm:text-sm border-gray-300 rounded-md";
const checkboxClasses = "h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary";

// Placeholder standard texts for role descriptions
const standardPresidentDuties = "The President/Chairperson is responsible for chairing meetings of the Committee and General Meetings, acting as a spokesperson for the Society, and overseeing the general functioning of the Committee.";
const standardSecretaryDuties = "The Secretary is responsible for maintaining Society records (including the Register of Members), managing correspondence, recording minutes of meetings, filing documents with the Registrar, and ensuring compliance with administrative requirements of the Act.";
const standardTreasurerDuties = "The Treasurer is responsible for overseeing the Society's financial management, maintaining accurate financial records, preparing financial reports for the Committee and members, managing bank accounts, and overseeing payments and receipts.";
const standardGeneralDutiesText = "Committee members must act in good faith and in what they believe to be the best interests of the Society. They must exercise their powers for a proper purpose and with the care and diligence that a reasonable person with the same responsibilities would exercise in the same circumstances. They must comply with the Act and this Constitution."; // Based on Act s54-59
const standardGeneralPowersText = "Subject to this Constitution and the Act, the Committee is responsible for the governance and management of the Society's affairs, property, and funds. The Committee may exercise all the Society's powers that are not required by the Act or this Constitution to be exercised by the members at a General Meeting.";

// Define the props for the component
interface Block3CommitteeProps {
  formData: ConstitutionFormData;
  updateFormData: (field: keyof ConstitutionFormData, value: any) => void;
  onComplete: (blockNumber: number) => void;
  onSaveProgress: (blockNumber: number) => void;
  blockNumber: number;
}

const Block3Committee: React.FC<Block3CommitteeProps> = ({ 
    formData, 
    updateFormData, 
    onComplete,
    onSaveProgress,
    blockNumber
}) => {
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

  // Helper for Checkbox Groups
  const handleCheckboxGroupChange = (field: keyof ConstitutionFormData, value: string, checked: boolean) => {
    const currentValues = (formData[field] as string[] | undefined) || [];
    let newValues = checked ? [...currentValues, value] : currentValues.filter((item) => item !== value);
    if (value === 'add_custom_role' && !checked) {
         // If unchecking custom role, also clear the custom role text
         updateFormData('block3_officerRolesOther', '');
    }
    if (value === 'removal_absence' && !checked) {
         // If unchecking absence, also clear the number
         updateFormData('block3_removalAbsenceNumber', undefined);
    }
    updateFormData(field, newValues);
    setLocalErrors({});
  };
  
  // Simplified handler for single checkboxes mapped to boolean state
  const handleSingleCheckboxChange = (field: keyof ConstitutionFormData, checked: boolean) => {
      updateFormData(field, checked);
      setLocalErrors({});
  };

  // Validation logic for Block 3
  const handleSave = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    // Task 3.1 Validation
    if (!formData.block3_officerRoles?.length) {
      newErrors.block3_officerRoles = 'Please select at least the required officer roles.';
      isValid = false;
    }
    if (formData.block3_officerRoles?.includes('add_custom_role') && !formData.block3_officerRolesOther?.trim()){
        newErrors.block3_officerRolesOther = 'Please specify the custom role name.';
        isValid = false;
    }
    if (!formData.block3_committeeMinSize || formData.block3_committeeMinSize < 3) {
      newErrors.block3_committeeMinSize = 'Minimum committee size must be at least 3.';
      isValid = false;
    }
    if (!formData.block3_committeeMaxSize || formData.block3_committeeMaxSize < (formData.block3_committeeMinSize || 3)) {
      newErrors.block3_committeeMaxSize = 'Maximum committee size must be greater than or equal to the minimum size.';
      isValid = false;
    }
    // Potentially add validation for role description textareas if 'Yes' is selected

    // Task 3.2 Validation
    if (!formData.block3_electionMethod) {
        newErrors.block3_electionMethod = 'Please specify how Committee members are chosen.';
        isValid = false;
    }
    if (formData.block3_electionMethod === 'Other' && !formData.block3_electionMethodOther?.trim()) {
        newErrors.block3_electionMethodOther = 'Please specify the other election method.';
        isValid = false;
    }
    if (formData.block3_electionMethod === 'Elected' && !formData.block3_electionProcess?.trim()){
        newErrors.block3_electionProcess = 'Please describe the nomination and election process.';
        isValid = false;
    }
     if (!formData.block3_termOfOffice) {
        newErrors.block3_termOfOffice = 'Please specify the term of office.';
        isValid = false;
    }
    if (formData.block3_termOfOffice === 'Other' && !formData.block3_termOfOfficeOther?.trim()) {
        newErrors.block3_termOfOfficeOther = 'Please specify the other term length.';
        isValid = false;
    }
    if (formData.block3_reElectionLimits === null || formData.block3_reElectionLimits === undefined){
        newErrors.block3_reElectionLimits = 'Please specify if there are re-election limits.';
        isValid = false;
    }
    if (formData.block3_reElectionLimits === true && !formData.block3_reElectionLimitDetails?.trim()) {
        newErrors.block3_reElectionLimitDetails = 'Please specify the re-election limit details.';
        isValid = false;
    }
    if (formData.block3_canCoOpt === null || formData.block3_canCoOpt === undefined) {
        newErrors.block3_canCoOpt = 'Please specify if the Committee can co-opt members.';
        isValid = false;
    }
    if (formData.block3_canCoOpt === true && !formData.block3_coOptDuration) {
        newErrors.block3_coOptDuration = 'Please specify the co-option duration.';
        isValid = false;
    }
    if (formData.block3_coOptDuration === 'Other' && !formData.block3_coOptDurationOther?.trim()) {
        newErrors.block3_coOptDurationOther = 'Please specify the other co-option duration.';
        isValid = false;
    }
    if (!formData.block3_casualVacancyMethod) {
        newErrors.block3_casualVacancyMethod = 'Please specify how casual vacancies are filled.';
        isValid = false;
    }
    if (formData.block3_casualVacancyMethod === 'Other' && !formData.block3_casualVacancyMethodOther?.trim()){
        newErrors.block3_casualVacancyMethodOther = 'Please specify the other method for filling vacancies.';
        isValid = false;
    }

    // Task 3.3 Validation
    if (!formData.block3_committeePowers) {
        newErrors.block3_committeePowers = 'Please specify how Committee powers are defined.';
        isValid = false;
    }
    if (formData.block3_committeePowers === 'list' && !formData.block3_committeePowersList?.trim()){
        newErrors.block3_committeePowersList = 'Please provide the list of specific powers.';
        isValid = false;
    }
    if (formData.block3_stateGeneralDuties === null || formData.block3_stateGeneralDuties === undefined){
        newErrors.block3_stateGeneralDuties = 'Please specify whether to state general duties.';
        isValid = false;
    }

    // Task 3.4 Validation
    if (!formData.block3_removalGrounds?.length && !formData.block3_removalGroundsOther?.trim()){
        newErrors.block3_removalGrounds = 'Please specify grounds for Committee member removal.';
        isValid = false;
    }
    if (formData.block3_removalGrounds?.includes('removal_absence') && (!formData.block3_removalAbsenceNumber || formData.block3_removalAbsenceNumber <= 0)){
        newErrors.block3_removalAbsenceNumber = 'Please specify a valid number of absences for removal.';
        isValid = false;
    }
    if (!formData.block3_removalProcedure){
        newErrors.block3_removalProcedure = 'Please specify the procedure for removal.';
        isValid = false;
    }
    if (formData.block3_removalProcedure === 'Other' && !formData.block3_removalProcedureOther?.trim()){
        newErrors.block3_removalProcedureOther = 'Please specify the other removal procedure.';
        isValid = false;
    }

    // Task 3.5 Validation
    if (!formData.block3_meetingFrequency){
        newErrors.block3_meetingFrequency = 'Please specify the Committee meeting frequency.';
        isValid = false;
    }
    if (formData.block3_meetingFrequency === 'number_per_year' && (!formData.block3_meetingFrequencyNumber || formData.block3_meetingFrequencyNumber <=0)){
        newErrors.block3_meetingFrequencyNumber = 'Please specify a valid number of meetings per year.';
        isValid = false;
    }
    if (!formData.block3_committeeQuorumValue || formData.block3_committeeQuorumValue <= 0){
        newErrors.block3_committeeQuorumValue = 'Please specify a valid quorum number or percentage.';
        isValid = false;
    } else if (formData.block3_committeeQuorumType === 'percentage' && formData.block3_committeeQuorumValue > 100){
        newErrors.block3_committeeQuorumValue = 'Quorum percentage cannot exceed 100.';
        isValid = false;
    }
    if (!formData.block3_committeeChair){
        newErrors.block3_committeeChair = 'Please specify who chairs Committee meetings.';
        isValid = false;
    }
    if (formData.block3_committeeChair === 'Other' && !formData.block3_committeeChairOther?.trim()){
        newErrors.block3_committeeChairOther = 'Please specify the other chair arrangement.';
        isValid = false;
    }
    if (formData.block3_chairCastingVote === null || formData.block3_chairCastingVote === undefined){
        newErrors.block3_chairCastingVote = 'Please specify if the Chairperson has a casting vote.';
        isValid = false;
    }
     if (formData.block3_remoteMeetings === null || formData.block3_remoteMeetings === undefined){
        newErrors.block3_remoteMeetings = 'Please specify if remote meetings are allowed.';
        isValid = false;
    }
     if (formData.block3_writtenResolutions === null || formData.block3_writtenResolutions === undefined){
        newErrors.block3_writtenResolutions = 'Please specify if written resolutions are allowed.';
        isValid = false;
    }
    if (formData.block3_writtenResolutions === true && !formData.block3_writtenResolutionApproval){
        newErrors.block3_writtenResolutionApproval = 'Please specify the approval needed for written resolutions.';
        isValid = false;
    }
    if (formData.block3_writtenResolutionApproval === 'Other' && !formData.block3_writtenResolutionApprovalOther?.trim()){
        newErrors.block3_writtenResolutionApprovalOther = 'Please specify the other approval method.';
        isValid = false;
    }
     if (!formData.block3_conflictOfInterestMethod){
        newErrors.block3_conflictOfInterestMethod = 'Please specify how conflicts of interest are managed.';
        isValid = false;
    }
    if (formData.block3_conflictOfInterestMethod === 'Other' && !formData.block3_conflictOfInterestMethodOther?.trim()){
        newErrors.block3_conflictOfInterestMethodOther = 'Please specify the other conflict management method.';
        isValid = false;
    }

    // Task 3.6 Validation
    if (!formData.block3_contactPersonAppointment){
        newErrors.block3_contactPersonAppointment = 'Please specify how the Contact Person is appointed.';
        isValid = false;
    }
    if (formData.block3_contactPersonAppointment === 'Other' && !formData.block3_contactPersonAppointmentOther?.trim()){
        newErrors.block3_contactPersonAppointmentOther = 'Please specify the other appointment method.';
        isValid = false;
    }


    setLocalErrors(newErrors);

    if (isValid) {
      console.log('Block 3 Validation Passed');
      onComplete(blockNumber);
    } else {
      console.log('Block 3 Validation Failed', newErrors);
    }
  };

  // Helper to render role description textarea
  const renderRoleDescription = (roleKey: keyof ConstitutionFormData, placeholder: string) => (
      <textarea
          className={`${baseInputClasses} mt-1`}
          rows={3}
          value={formData[roleKey] || placeholder}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData(roleKey, e.target.value)}
          placeholder={`Enter description for ${roleKey}...`}
      />
  );

  return (
    <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Block 3: Governance - The Committee</h3>
        {/* --- Task 3.1: Committee Composition & Roles [MANDATORY] --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">3.1 Committee Composition & Roles (Mandatory)</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Select all required roles. President/Secretary/Treasurer are common. Minimum 3 officers needed. (Ref: Act s45, s27(1)(f)(i))</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('President') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'President', e.target.checked)} /> President/Chairperson
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Secretary') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'Secretary', e.target.checked)} /> Secretary
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Treasurer') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'Treasurer', e.target.checked)} /> Treasurer
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('Vice-President') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'Vice-President', e.target.checked)} /> Vice-President/Chair
                </label>
                 <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('General Member') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'General Member', e.target.checked)} /> General Committee Member(s)
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                     <input type="checkbox" className={checkboxClasses} checked={formData.block3_officerRoles?.includes('add_custom_role') || false} onChange={(e) => handleCheckboxGroupChange('block3_officerRoles', 'add_custom_role', e.target.checked)} />
                     <Input 
                         type="text" 
                         placeholder="Add Custom Role Name..." 
                         value={formData.block3_officerRolesOther || ''} 
                         onChange={(e) => updateFormData('block3_officerRolesOther', e.target.value)}
                         disabled={!formData.block3_officerRoles?.includes('add_custom_role')} 
                         className={`flex-1 text-sm ${!formData.block3_officerRoles?.includes('add_custom_role') ? 'bg-gray-100 cursor-not-allowed' : ''} ${localErrors.block3_officerRolesOther ? 'border-red-500' : ''}`}
                     />
                 </div>
            </div>
            {localErrors.block3_officerRoles && <p className="mt-1 text-xs text-red-600">{localErrors.block3_officerRoles}</p>}
             {localErrors.block3_officerRolesOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_officerRolesOther}</p>}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                    <label htmlFor="block3_committeeMinSize" className="block text-xs font-medium text-gray-700 mb-1">Minimum number on Committee?</label>
                    <Input id="block3_committeeMinSize" name="block3_committeeMinSize" type="number" min="3" value={formData.block3_committeeMinSize || ''} onChange={(e) => updateFormData('block3_committeeMinSize', e.target.valueAsNumber)} className={localErrors.block3_committeeMinSize ? 'border-red-500' : ''} />
                    {localErrors.block3_committeeMinSize && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeeMinSize}</p>}
                </div>
                 <div>
                    <label htmlFor="block3_committeeMaxSize" className="block text-xs font-medium text-gray-700 mb-1">Maximum number on Committee?</label>
                    <Input id="block3_committeeMaxSize" name="block3_committeeMaxSize" type="number" min={formData.block3_committeeMinSize || 3} value={formData.block3_committeeMaxSize || ''} onChange={(e) => updateFormData('block3_committeeMaxSize', e.target.valueAsNumber)} className={localErrors.block3_committeeMaxSize ? 'border-red-500' : ''} />
                     {localErrors.block3_committeeMaxSize && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeeMaxSize}</p>}
                </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
                 <RadioGroup
                     label="Include descriptions of the duties for key officers? (Optional / Good Practice)"
                     name="block3_includeRoleDescriptions"
                     options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                     value={formData.block3_includeRoleDescriptions !== null ? formData.block3_includeRoleDescriptions : true} // Default Yes
                     onChange={(value) => updateFormData('block3_includeRoleDescriptions', value as boolean)}
                 />
                 <p className="text-sm text-gray-600 mt-1 mb-3">Defining duties provides clarity for officers and members. (See example: Clauses 18, 19)</p>
                 {formData.block3_includeRoleDescriptions === true && (
                     <div className="mt-3 space-y-3">
                         {formData.block3_officerRoles?.includes('President') && <div><label className="text-xs font-medium text-gray-700">President/Chairperson Duties:</label>{renderRoleDescription('block3_roleDescriptionPresident', standardPresidentDuties)}</div>}
                         {formData.block3_officerRoles?.includes('Secretary') && <div><label className="text-xs font-medium text-gray-700">Secretary Duties:</label>{renderRoleDescription('block3_roleDescriptionSecretary', standardSecretaryDuties)}</div>}
                         {formData.block3_officerRoles?.includes('Treasurer') && <div><label className="text-xs font-medium text-gray-700">Treasurer Duties:</label>{renderRoleDescription('block3_roleDescriptionTreasurer', standardTreasurerDuties)}</div>}
                          {formData.block3_officerRoles?.includes('add_custom_role') && formData.block3_officerRolesOther?.trim() && <div><label className="text-xs font-medium text-gray-700">{formData.block3_officerRolesOther} Duties:</label>{renderRoleDescription('block3_roleDescriptionOther', 'Please describe the duties...')}</div>}
                     </div>
                 )}
            </div>
        </div>

        {/* --- Task 3.2: Committee Election, Appointment & Terms --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                 <label className="block text-sm font-medium text-gray-700">3.2 Committee Election, Appointment & Terms</label>
             </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Detail the cycle of your committee. Consider eligibility (Act s47(3) restrictions apply automatically regarding bankruptcy, dishonesty convictions etc.). (Ref: Act s27(1)(f)(ii), (iii))</p>
             <div>
                 <label htmlFor="block3_electionMethod" className="block text-xs font-medium text-gray-700 mb-1">How are Committee members chosen?</label>
                 <select id="block3_electionMethod" name="block3_electionMethod" className={`${baseInputClasses} ${localErrors.block3_electionMethod ? 'border-red-500' : ''}`} value={formData.block3_electionMethod || ''} onChange={(e) => updateFormData('block3_electionMethod', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="Elected">Elected at the AGM</option>
                     <option value="Appointed">Appointed by [Specify Body/Person]</option>
                     <option value="Mix">Mix [Specify]</option>
                     <option value="Other">Other [Specify]</option>
                 </select>
                 {(formData.block3_electionMethod === 'Appointed' || formData.block3_electionMethod === 'Mix' || formData.block3_electionMethod === 'Other') && (
                     <Input type="text" className="mt-1 block w-full" value={formData.block3_electionMethodOther || ''} onChange={(e) => updateFormData('block3_electionMethodOther', e.target.value)} placeholder="Specify details..."/>
                 )}
                 {localErrors.block3_electionMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block3_electionMethod}</p>}
                 {localErrors.block3_electionMethodOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_electionMethodOther}</p>}
             </div>
             {formData.block3_electionMethod === 'Elected' && (
                 <div>
                    <label htmlFor="block3_electionProcess" className="block text-xs font-medium text-gray-700 mb-1">Describe the nomination and election process:</label>
                     <textarea id="block3_electionProcess" name="block3_electionProcess" rows={3} className={`${baseInputClasses} ${localErrors.block3_electionProcess ? 'border-red-500' : ''}`} value={formData.block3_electionProcess || ''} onChange={(e) => updateFormData('block3_electionProcess', e.target.value)} placeholder="e.g., Call for nominations 4 weeks before AGM, nominations close 2 weeks prior, voting by secret ballot if contested."/>
                      {localErrors.block3_electionProcess && <p className="mt-1 text-xs text-red-600">{localErrors.block3_electionProcess}</p>}
                 </div>
             )}
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                     <label htmlFor="block3_termOfOffice" className="block text-xs font-medium text-gray-700 mb-1">Term of office for Committee members?</label>
                      <select id="block3_termOfOffice" name="block3_termOfOffice" className={`${baseInputClasses} ${localErrors.block3_termOfOffice ? 'border-red-500' : ''}`} value={formData.block3_termOfOffice || ''} onChange={(e) => updateFormData('block3_termOfOffice', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="1">1 year</option>
                         <option value="2">2 years</option>
                         <option value="3">3 years</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                     {formData.block3_termOfOffice === 'Other' && (
                         <Input type="text" className="mt-1 block w-full" value={formData.block3_termOfOfficeOther || ''} onChange={(e) => updateFormData('block3_termOfOfficeOther', e.target.value)} placeholder="Specify other term..."/>
                     )}
                     {localErrors.block3_termOfOffice && <p className="mt-1 text-xs text-red-600">{localErrors.block3_termOfOffice}</p>}
                     {localErrors.block3_termOfOfficeOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_termOfOfficeOther}</p>}
                 </div>
                  <div>
                     <RadioGroup
                         label="Are there limits on re-election?"
                         name="block3_reElectionLimits"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block3_reElectionLimits}
                         onChange={(value) => updateFormData('block3_reElectionLimits', value as boolean)}
                     />
                      {formData.block3_reElectionLimits === true && (
                         <Input type="text" className={`mt-1 block w-full ${localErrors.block3_reElectionLimitDetails ? 'border-red-500' : ''}`} value={formData.block3_reElectionLimitDetails || ''} onChange={(e) => updateFormData('block3_reElectionLimitDetails', e.target.value)} placeholder="Specify limit (e.g., Max 3 consecutive terms)"/>
                     )}
                     {localErrors.block3_reElectionLimits && <p className="mt-1 text-xs text-red-600">{localErrors.block3_reElectionLimits}</p>}
                     {localErrors.block3_reElectionLimitDetails && <p className="mt-1 text-xs text-red-600">{localErrors.block3_reElectionLimitDetails}</p>}
                  </div>
             </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                     <RadioGroup
                         label="Can the Committee co-opt members between AGMs?"
                         name="block3_canCoOpt"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block3_canCoOpt}
                         onChange={(value) => updateFormData('block3_canCoOpt', value as boolean)}
                     />
                      {formData.block3_canCoOpt === true && (
                          <div>
                             <label htmlFor="block3_coOptDuration" className="block text-xs font-medium text-gray-700 mb-1">For how long can they be co-opted?</label>
                              <select id="block3_coOptDuration" name="block3_coOptDuration" className={`${baseInputClasses} ${localErrors.block3_coOptDuration ? 'border-red-500' : ''}`} value={formData.block3_coOptDuration || ''} onChange={(e) => updateFormData('block3_coOptDuration', e.target.value)}>
                                 <option value="" disabled>Select...</option>
                                 <option value="next_agm">Until the next AGM</option>
                                 <option value="fixed">Fixed period [Specify]</option>
                                 <option value="Other">Other [Specify]</option>
                              </select>
                             {(formData.block3_coOptDuration === 'fixed' || formData.block3_coOptDuration === 'Other') && (
                                 <Input type="text" className="mt-1 block w-full" value={formData.block3_coOptDurationOther || ''} onChange={(e) => updateFormData('block3_coOptDurationOther', e.target.value)} placeholder="Specify duration..."/>
                              )}
                             {localErrors.block3_coOptDuration && <p className="mt-1 text-xs text-red-600">{localErrors.block3_coOptDuration}</p>}
                             {localErrors.block3_coOptDurationOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_coOptDurationOther}</p>}
                         </div>
                      )}
                     {localErrors.block3_canCoOpt && <p className="mt-1 text-xs text-red-600">{localErrors.block3_canCoOpt}</p>}
                 </div>
                  <div>
                     <label htmlFor="block3_casualVacancyMethod" className="block text-xs font-medium text-gray-700 mb-1">How are casual vacancies filled?</label>
                      <select id="block3_casualVacancyMethod" name="block3_casualVacancyMethod" className={`${baseInputClasses} ${localErrors.block3_casualVacancyMethod ? 'border-red-500' : ''}`} value={formData.block3_casualVacancyMethod || ''} onChange={(e) => updateFormData('block3_casualVacancyMethod', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="committee_appoints">Committee appoints replacement until next AGM</option>
                         <option value="vacant">Position left vacant until next AGM</option>
                         <option value="sgm_election">SGM called to elect replacement</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                     {formData.block3_casualVacancyMethod === 'Other' && (
                         <Input type="text" className={`mt-1 block w-full ${localErrors.block3_casualVacancyMethodOther ? 'border-red-500' : ''}`} value={formData.block3_casualVacancyMethodOther || ''} onChange={(e) => updateFormData('block3_casualVacancyMethodOther', e.target.value)} placeholder="Specify other method..."/>
                     )}
                     {localErrors.block3_casualVacancyMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block3_casualVacancyMethod}</p>}
                     {localErrors.block3_casualVacancyMethodOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_casualVacancyMethodOther}</p>}
                 </div>
             </div>
        </div>

        {/* --- Task 3.3: Committee Powers & Functions --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
            <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">3.3 Committee Powers & Functions</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Define the committee's role. General powers usually suffice. Stating duties reminds officers of obligations under Act s46, s54-59. (Ref: s27(1)(f)(iv))</p>
            <div>
                 <RadioGroup
                     label="How do you want to state the Committee's powers and functions?"
                     name="block3_committeePowers"
                     options={[
                         { value: 'list', label: 'Include a detailed list of powers (Editable template below)' }, 
                         { value: 'general', label: 'State general powers of governance (Recommended standard clause below)' } 
                     ]}
                     value={formData.block3_committeePowers || 'general'} // Default Recommended
                     onChange={(value) => updateFormData('block3_committeePowers', value as string)}
                 />
                 {localErrors.block3_committeePowers && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeePowers}</p>}
                 
                 <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                     {formData.block3_committeePowers === 'list' ? (
                         <textarea 
                            className={`${baseInputClasses} text-xs ${localErrors.block3_committeePowersList ? 'border-red-500' : ''}`}
                            rows={5}
                            value={formData.block3_committeePowersList || 'Example: Enter specific powers here, e.g., Employ staff, Enter contracts, Manage finances...'} 
                            onChange={(e) => updateFormData('block3_committeePowersList', e.target.value)}
                         />
                     ) : (
                         <p>{standardGeneralPowersText}</p>
                     )}
                 </div>
                  {localErrors.block3_committeePowersList && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeePowersList}</p>}
            </div>
             <div className="pt-4 border-t border-gray-100">
                 <RadioGroup
                     label="Do you want to explicitly state the general duties of Committee members (acting in good faith, care/diligence, etc.)?"
                     name="block3_stateGeneralDuties"
                     options={[{ value: true, label: 'Yes (Recommended - Standard text below)' }, { value: false, label: 'No' }]}
                     value={formData.block3_stateGeneralDuties !== null ? formData.block3_stateGeneralDuties : true} // Default Yes
                     onChange={(value) => updateFormData('block3_stateGeneralDuties', value as boolean)}
                 />
                 {formData.block3_stateGeneralDuties === true && (
                     <div className="mt-3 p-3 bg-gray-50 border border-gray-200 rounded text-xs">
                         <p>{standardGeneralDutiesText}</p>
                     </div>
                 )}
                 {localErrors.block3_stateGeneralDuties && <p className="mt-1 text-xs text-red-600">{localErrors.block3_stateGeneralDuties}</p>}
             </div>
        </div>

         {/* --- Task 3.4: Removal from Committee --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">3.4 Grounds and Procedure for Removal from Committee</label>
            </div>
             <p className="text-sm text-gray-600 mt-1 mb-3">Must include grounds and procedure, ensuring the process is fair (natural justice - the person should have a chance to respond). (Ref: Act s50, s27(1)(f)(v))</p>
             <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Grounds for removal before term ends?</label>
                 <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('misconduct') || false} onChange={(e) => handleCheckboxGroupChange('block3_removalGrounds', 'misconduct', e.target.checked)} />
                        Breach of duties / Serious misconduct
                    </label>
                     <div className="flex items-center gap-2 text-sm text-gray-700">
                         <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('removal_absence') || false} onChange={(e) => handleCheckboxGroupChange('block3_removalGrounds', 'removal_absence', e.target.checked)} />
                        Extended unexplained absence from meetings (Specify number):
                        {formData.block3_removalGrounds?.includes('removal_absence') && (
                            <Input 
                                type="number" 
                                className={`w-16 ml-1 ${localErrors.block3_removalAbsenceNumber ? 'border-red-500' : ''}`} 
                                min="1" 
                                value={formData.block3_removalAbsenceNumber || ''} 
                                onChange={(e) => updateFormData('block3_removalAbsenceNumber', e.target.valueAsNumber)} 
                            />
                        )}
                         {localErrors.block3_removalAbsenceNumber && <p className="ml-2 text-xs text-red-600">{localErrors.block3_removalAbsenceNumber}</p>}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('ineligible') || false} onChange={(e) => handleCheckboxGroupChange('block3_removalGrounds', 'ineligible', e.target.checked)} />
                        Becomes ineligible under the Act (e.g., bankrupt)
                    </label>
                     <div className="flex items-start gap-2">
                         <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                             <input type="checkbox" className={checkboxClasses} checked={formData.block3_removalGrounds?.includes('other') || false} onChange={(e) => handleCheckboxGroupChange('block3_removalGrounds', 'other', e.target.checked)} />
                             Other:
                         </label>
                         {formData.block3_removalGrounds?.includes('other') && (
                             <textarea rows={2} className={`flex-1 ${baseInputClasses}`} value={formData.block3_removalGroundsOther || ''} onChange={(e) => updateFormData('block3_removalGroundsOther', e.target.value)} placeholder="Describe other grounds..."/>
                         )}
                     </div>
                 </div>
                 {localErrors.block3_removalGrounds && <p className="mt-1 text-xs text-red-600">{localErrors.block3_removalGrounds}</p>}
            </div>
             <div className="pt-4 border-t border-gray-100">
                <label htmlFor="block3_removalProcedure" className="block text-xs font-medium text-gray-700 mb-1">Procedure for removal?</label>
                 <select id="block3_removalProcedure" name="block3_removalProcedure" className={`${baseInputClasses} ${localErrors.block3_removalProcedure ? 'border-red-500' : ''}`} value={formData.block3_removalProcedure || ''} onChange={(e) => updateFormData('block3_removalProcedure', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="committee_res">Resolution of the Committee (specify majority)</option>
                     <option value="gm_res">Resolution at a General Meeting (specify majority)</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {(formData.block3_removalProcedure === 'committee_res' || formData.block3_removalProcedure === 'gm_res' || formData.block3_removalProcedure === 'Other') && (
                     <Input type="text" className={`mt-1 block w-full ${localErrors.block3_removalProcedureOther ? 'border-red-500' : ''}`} value={formData.block3_removalProcedureOther || ''} onChange={(e) => updateFormData('block3_removalProcedureOther', e.target.value)} placeholder="Specify majority needed or other procedure..."/>
                 )}
                  {localErrors.block3_removalProcedure && <p className="mt-1 text-xs text-red-600">{localErrors.block3_removalProcedure}</p>}
                 {localErrors.block3_removalProcedureOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_removalProcedureOther}</p>}
            </div>
        </div>

        {/* --- Task 3.5: Committee Meetings & Procedures --- */}
        <div className="p-4 border border-gray-200 rounded-md space-y-4">
             <div className="flex items-center gap-2 mb-1">
                <label className="block text-sm font-medium text-gray-700">3.5 Committee Meetings & Procedures</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">Define the basic rules for how your committee operates. (Ref: Act s27(1)(f)(vii))</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="block3_meetingFrequency" className="block text-xs font-medium text-gray-700 mb-1">How often should the Committee aim to meet?</label>
                     <select id="block3_meetingFrequency" name="block3_meetingFrequency" className={`${baseInputClasses} ${localErrors.block3_meetingFrequency ? 'border-red-500' : ''}`} value={formData.block3_meetingFrequency || ''} onChange={(e) => updateFormData('block3_meetingFrequency', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="Monthly">Monthly</option>
                         <option value="Bi-Monthly">Bi-Monthly</option>
                         <option value="Quarterly">Quarterly</option>
                         <option value="number_per_year">At least [Number] times per year</option>
                         <option value="As required">As required</option>
                     </select>
                     {formData.block3_meetingFrequency === 'number_per_year' && (
                        <Input type="number" min="1" className={`mt-1 block w-24 ${localErrors.block3_meetingFrequencyNumber ? 'border-red-500' : ''}`} value={formData.block3_meetingFrequencyNumber || ''} onChange={(e) => updateFormData('block3_meetingFrequencyNumber', e.target.valueAsNumber)} placeholder="Number"/>
                     )}
                      {localErrors.block3_meetingFrequency && <p className="mt-1 text-xs text-red-600">{localErrors.block3_meetingFrequency}</p>}
                     {localErrors.block3_meetingFrequencyNumber && <p className="mt-1 text-xs text-red-600">{localErrors.block3_meetingFrequencyNumber}</p>}
                </div>
                <div>
                     <label htmlFor="block3_committeeQuorumValue" className="block text-xs font-medium text-gray-700 mb-1">Quorum for Committee meetings?</label>
                     <div className="flex items-center gap-2">
                        <Input id="block3_committeeQuorumValue" name="block3_committeeQuorumValue" type="number" min="1" className={`w-24 ${localErrors.block3_committeeQuorumValue ? 'border-red-500' : ''}`} value={formData.block3_committeeQuorumValue || ''} onChange={(e) => updateFormData('block3_committeeQuorumValue', e.target.valueAsNumber)} placeholder="Number"/>
                        <select className={baseInputClasses + " flex-1 py-1 text-sm"} value={formData.block3_committeeQuorumType || 'number'} onChange={(e) => updateFormData('block3_committeeQuorumType', e.target.value)}>
                             <option value="number">members</option>
                             <option value="percentage">percent (%) of members</option>
                         </select>
                     </div>
                     {localErrors.block3_committeeQuorumValue && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeeQuorumValue}</p>}
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                 <div>
                    <label htmlFor="block3_committeeChair" className="block text-xs font-medium text-gray-700 mb-1">Who chairs Committee meetings?</label>
                     <select id="block3_committeeChair" name="block3_committeeChair" className={`${baseInputClasses} ${localErrors.block3_committeeChair ? 'border-red-500' : ''}`} value={formData.block3_committeeChair || ''} onChange={(e) => updateFormData('block3_committeeChair', e.target.value)}>
                         <option value="" disabled>Select...</option>
                         <option value="President">President/Chairperson chairs; if absent, Committee elects chair for meeting</option>
                         <option value="Other">Other (Specify)</option>
                     </select>
                      {formData.block3_committeeChair === 'Other' && (
                        <Input type="text" className={`mt-1 block w-full ${localErrors.block3_committeeChairOther ? 'border-red-500' : ''}`} value={formData.block3_committeeChairOther || ''} onChange={(e) => updateFormData('block3_committeeChairOther', e.target.value)} placeholder="Specify other chair arrangement..."/>
                     )}
                     {localErrors.block3_committeeChair && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeeChair}</p>}
                     {localErrors.block3_committeeChairOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_committeeChairOther}</p>}
                 </div>
                  <div>
                      <RadioGroup
                         label="Does the meeting Chairperson have a casting vote?"
                         name="block3_chairCastingVote"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block3_chairCastingVote}
                         onChange={(value) => updateFormData('block3_chairCastingVote', value as boolean)}
                     />
                     {localErrors.block3_chairCastingVote && <p className="mt-1 text-xs text-red-600">{localErrors.block3_chairCastingVote}</p>}
                 </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                      <RadioGroup
                         label="Can Committee meetings be held using technology (e.g., video calls)?"
                         name="block3_remoteMeetings"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block3_remoteMeetings !== null ? formData.block3_remoteMeetings : true} // Default Yes
                         onChange={(value) => updateFormData('block3_remoteMeetings', value as boolean)}
                     />
                      {localErrors.block3_remoteMeetings && <p className="mt-1 text-xs text-red-600">{localErrors.block3_remoteMeetings}</p>}
                </div>
                 <div>
                      <RadioGroup
                         label="Can the Committee make decisions by written resolution?"
                         name="block3_writtenResolutions"
                         options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                         value={formData.block3_writtenResolutions}
                         onChange={(value) => updateFormData('block3_writtenResolutions', value as boolean)}
                     />
                       {formData.block3_writtenResolutions === true && (
                          <div>
                             <label htmlFor="block3_writtenResolutionApproval" className="block text-xs font-medium text-gray-700 mb-1">What approval is needed?</label>
                              <select id="block3_writtenResolutionApproval" name="block3_writtenResolutionApproval" className={`${baseInputClasses} ${localErrors.block3_writtenResolutionApproval ? 'border-red-500' : ''}`} value={formData.block3_writtenResolutionApproval || ''} onChange={(e) => updateFormData('block3_writtenResolutionApproval', e.target.value)}>
                                 <option value="" disabled>Select...</option>
                                 <option value="majority">Signed by more than 50% of all Committee members</option>
                                 <option value="75percent">Signed by 75% of all Committee members</option>
                                 <option value="unanimous">Signed by all Committee members</option>
                                 <option value="Other">Other (Specify)</option>
                             </select>
                             {formData.block3_writtenResolutionApproval === 'Other' && (
                                 <Input type="text" className={`mt-1 block w-full ${localErrors.block3_writtenResolutionApprovalOther ? 'border-red-500' : ''}`} value={formData.block3_writtenResolutionApprovalOther || ''} onChange={(e) => updateFormData('block3_writtenResolutionApprovalOther', e.target.value)} placeholder="Specify other approval method..."/>
                             )}
                             {localErrors.block3_writtenResolutionApproval && <p className="mt-1 text-xs text-red-600">{localErrors.block3_writtenResolutionApproval}</p>}
                             {localErrors.block3_writtenResolutionApprovalOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_writtenResolutionApprovalOther}</p>}
                          </div>
                       )}
                     {localErrors.block3_writtenResolutions && <p className="mt-1 text-xs text-red-600">{localErrors.block3_writtenResolutions}</p>}
                 </div>
            </div>
             <div className="pt-4 border-t border-gray-100">
                <label htmlFor="block3_conflictOfInterestMethod" className="block text-xs font-medium text-gray-700 mb-1">How will conflicts of interest be managed in meetings?</label>
                <select id="block3_conflictOfInterestMethod" name="block3_conflictOfInterestMethod" className={`${baseInputClasses} ${localErrors.block3_conflictOfInterestMethod ? 'border-red-500' : ''}`} value={formData.block3_conflictOfInterestMethod || ''} onChange={(e) => updateFormData('block3_conflictOfInterestMethod', e.target.value)}>
                     <option value="" disabled>Select...</option>
                     <option value="declare_abstain">Member declares interest and does not vote/participate on matter</option>
                     <option value="declare_discuss_not_vote">Member declares interest, may discuss but not vote</option>
                     <option value="follow_policy">Follow specific Society Conflict of Interest policy</option>
                     <option value="Other">Other (Specify)</option>
                 </select>
                 {formData.block3_conflictOfInterestMethod === 'Other' && (
                    <Input type="text" className={`mt-1 block w-full ${localErrors.block3_conflictOfInterestMethodOther ? 'border-red-500' : ''}`} value={formData.block3_conflictOfInterestMethodOther || ''} onChange={(e) => updateFormData('block3_conflictOfInterestMethodOther', e.target.value)} placeholder="Specify other method..."/>
                 )}
                 {localErrors.block3_conflictOfInterestMethod && <p className="mt-1 text-xs text-red-600">{localErrors.block3_conflictOfInterestMethod}</p>}
                 {localErrors.block3_conflictOfInterestMethodOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_conflictOfInterestMethodOther}</p>}
            </div>
        </div>

        {/* --- Task 3.6: Appointing Contact Person --- */}
        <div className="p-4 border border-gray-200 rounded-md">
             <div className="flex items-center gap-2 mb-1">
                 <label htmlFor="block3_contactPersonAppointment" className="block text-sm font-medium text-gray-700">3.6 Appointing Contact Person</label>
            </div>
            <p className="text-sm text-gray-600 mt-1 mb-3">This person is the main contact for the Registrar. They don't need to be an officer. (Ref: Act s113, s27(1)(g))</p>
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
             {localErrors.block3_contactPersonAppointment && <p className="mt-1 text-xs text-red-600">{localErrors.block3_contactPersonAppointment}</p>}
             {localErrors.block3_contactPersonAppointmentOther && <p className="mt-1 text-xs text-red-600">{localErrors.block3_contactPersonAppointmentOther}</p>}
        </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 mt-6">
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