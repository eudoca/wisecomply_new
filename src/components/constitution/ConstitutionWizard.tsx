import { Button } from '@/components/ui/button'; // Standardized path
import React, { useState, useCallback } from 'react';
import { InfoIcon, ChevronDown, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import Block1Foundation from './blocks/Block1Foundation';
import Block2Membership from './blocks/Block2Membership';
import Block3Committee from './blocks/Block3Committee';
import Block4GeneralMeetings from './blocks/Block4GeneralMeetings';
import Block6Amendments from './blocks/Block6Amendments';
import Block7Disputes from './blocks/Block7Disputes';
import Block8Finances from './blocks/Block8Finances';
import Block9Dissolution from './blocks/Block9Dissolution';
import Block10Transitional from './blocks/Block10Transitional';
import Block11Review from './blocks/Block11Review';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// Define the structure for the form data collected across all steps
export interface ConstitutionFormData {
  // Block 1
  block1_includeDefinitions?: boolean | null;
  block1_definitions?: string; // Placeholder for repeater
  block1_societyName?: string;
  block1_societyPurposes?: string;
  block1_specifyOfficeMethod?: boolean | null;
  block1_officeMethodText?: string; // Mandatory if specifyOfficeMethod is true
  block1_meetingLocation?: string; // Mandatory if specifyOfficeMethod is false/null
  block1_charitableStatus?: string; // Mandatory
  block1_charitablePurposeDetails?: string; // Mandatory if charitableStatus is 'Yes'
  
  // Block 2
  block2_hasCategories?: boolean | null; 
  block2_categories?: string; // Placeholder for repeater (Task 2.1)
  block2_applicationSteps?: string[]; // Array for checkboxes (Task 2.2)
  block2_applicationOther?: string;
  block2_consentMethod?: string; // Radio button value (Task 2.2)
  block2_consentOther?: string;
  block2_approvingBody?: string; // Dropdown value
  block2_approvingBodyOther?: string;
  block2_canRefuseMembership?: boolean | null;
  block2_feeSettingMethod?: string; // Dropdown value (Task 2.3)
  block2_feeSettingOther?: string;
  block2_feeDueDate?: string; // Dropdown value
  block2_feeDueDateOther?: string;
  block2_nonPaymentConsequence?: string; // Dropdown value
  block2_nonPaymentConsequenceOther?: string;
  block2_resignationSteps?: string[]; // Array for checkboxes (Task 2.4)
  block2_resignationNoticePeriod?: number;
  block2_resignationNoticeUnit?: string; // 'Days' or 'Weeks'
  block2_resignationPayFees?: boolean;
  block2_terminationGrounds?: string[]; // Array for checkboxes (Task 2.4)
  block2_terminationOther?: string;
  block2_registerMaintainer?: string; // Dropdown value (Task 2.5)
  block2_registerMaintainerOther?: string;
  block2_registerUpdateMethods?: string[]; // Array for checkboxes (Task 2.5)
  block2_registerUpdateOther?: string;
  block2_membershipOpen?: 'Yes' | 'No';
  block2_membershipCriteria?: string;

  // Block 3
  block3_officerRoles?: string[]; // Checkboxes (Task 3.1)
  block3_officerRolesOther?: string;
  block3_committeeMinSize?: number;
  block3_committeeMaxSize?: number;
  block3_includeRoleDescriptions?: boolean | null;
  block3_roleDescriptionPresident?: string; // Standard text + edits
  block3_roleDescriptionSecretary?: string;
  block3_roleDescriptionTreasurer?: string;
  block3_roleDescriptionOther?: string; // For custom roles
  block3_electionMethod?: string; // Dropdown (Task 3.2)
  block3_electionMethodOther?: string;
  block3_electionProcess?: string; // Textarea (conditional)
  block3_termOfOffice?: string; // Dropdown
  block3_termOfOfficeOther?: string;
  block3_reElectionLimits?: boolean | null;
  block3_reElectionLimitDetails?: string; // Number or Text (conditional)
  block3_canCoOpt?: boolean | null;
  block3_coOptDuration?: string; // Dropdown (conditional)
  block3_coOptDurationOther?: string;
  block3_casualVacancyMethod?: string; // Dropdown
  block3_casualVacancyMethodOther?: string;
  block3_committeePowers?: string; // Radio: list / general (Task 3.3)
  block3_committeePowersList?: string; // Textarea (conditional)
  block3_stateGeneralDuties?: boolean | null;
  block3_removalGrounds?: string[]; // Checkboxes (Task 3.4)
  block3_removalGroundsOther?: string;
  block3_removalAbsenceNumber?: number;
  block3_removalProcedure?: string; // Dropdown
  block3_removalProcedureOther?: string;
  block3_meetingFrequency?: string; // Dropdown (Task 3.5)
  block3_meetingFrequencyNumber?: number;
  block3_committeeQuorumType?: string; // 'percentage' or 'number'
  block3_committeeQuorumValue?: number;
  block3_committeeChair?: string; // Dropdown
  block3_committeeChairOther?: string;
  block3_chairCastingVote?: boolean | null;
  block3_remoteMeetings?: boolean | null;
  block3_writtenResolutions?: boolean | null;
  block3_writtenResolutionApproval?: string; // Dropdown (conditional)
  block3_writtenResolutionApprovalOther?: string;
  block3_conflictOfInterestMethod?: string; // Dropdown
  block3_conflictOfInterestMethodOther?: string;
  block3_contactPersonAppointment?: string; // Dropdown (Task 3.6)
  block3_contactPersonAppointmentOther?: string;

  // Block 4 - General Meetings
  block4_agmTiming?: string; // e.g., 'within_x_months', 'specific_month', 'Other'
  block4_agmTimingMonths?: number;
  block4_agmTimingSpecificMonth?: string;
  block4_agmTimingOther?: string;
  block4_agmNoticePeriod?: number;
  block4_agmNoticeMethod?: string[]; // Checkboxes (e.g., email, post, website)
  block4_agmNoticeMethodOther?: string;
  block4_agmQuorumType?: string; // 'percentage' or 'number' (Task 4.3)
  block4_agmQuorumValue?: number;
  block4_agmAdjournmentRule?: string; // Dropdown (e.g., adjourn, proceed with reduced quorum)
  block4_agmAdjournmentRuleOther?: string;
  block4_gmChair?: string; // Dropdown (e.g., President, elected from members) (Task 4.4)
  block4_gmChairOther?: string;
  block4_gmChairCastingVote?: boolean | null;
  block4_votingRights?: string; // Dropdown (e.g., one member one vote, categories) (Task 4.5)
  block4_votingRightsOther?: string;
  block4_showOfHandsDefault?: boolean | null;
  block4_pollConditions?: string; // Textarea (e.g., demanded by chair or X members)
  block4_proxiesAllowed?: boolean | null;
  block4_proxyFormRequirements?: string; // Textarea (conditional)
  block4_proxyLodgementDeadline?: string; // Textarea (conditional)
  block4_sgmTriggerMethod?: string[]; // Checkboxes (e.g., committee decision, member request) (Task 4.6)
  block4_sgmMemberRequestNumber?: number; // Conditional number
  block4_sgmMemberRequestPercent?: number; // Conditional percentage
  block4_sgmNoticePeriod?: number; // Number of days
  block4_sgmNoticeMethod?: string[]; // Checkboxes
  block4_sgmNoticeMethodOther?: string;
  block4_remoteParticipation?: boolean | null; // Task 4.7
  block4_agmStandardBusiness?: string; // Added for Task 4.1 AGM Business
  block4_sgmRequisitionAuthority?: string[]; // e.g., 'committee', 'members'
  block4_sgmRequisitionNumberType?: string; // 'percentage' | 'fixed'
  block4_sgmRequisitionNumberValue?: number;
  block4_noticeMethods?: string[]; // e.g., 'email', 'post', 'website', 'other'
  block4_noticeMethodsOther?: string;
  block4_meetingQuorumType?: string; // 'percentage' | 'fixed'
  block4_meetingQuorumValue?: number;
  block4_quorumAdjournmentProcedure?: string;
  block4_chairperson?: string; // e.g., 'President', 'Elected_for_meeting', 'Other'
  block4_chairpersonOther?: string;
  block4_chairCastingVoteGm?: boolean | null;
  block4_votingMethods?: string[]; // e.g., 'show_hands', 'voice', 'ballot', 'poll', 'postal', 'electronic'
  block4_postalVotingAllowed?: boolean | null;
  block4_postalVotingProcedure?: string;
  block4_electronicVotingAllowed?: boolean | null;
  block4_electronicVotingProcedure?: string;
  block4_proxyAllowed?: boolean | null;
  block4_proxyFormRequired?: boolean | null;
  block4_proxyWhoCanBe?: string; // e.g., 'any_member', 'chair_only', 'Other'
  block4_proxyWhoCanBeOther?: string;
  block4_proxyMaxNumber?: number;
  block4_proxyLodgementDeadlineOther?: string;
  block4_minutesRecorded?: boolean | null;
  block4_minuteRequirements?: string[]; // e.g., ['date_time_location', 'attendees', 'apologies', 'resolutions', 'voting_results']
  block4_minuteAccess?: string; // e.g., 'available_on_request', 'circulated_after_meeting', 'website', 'Other'
  block4_minuteAccessOther?: string;

  // Block 5 - Finances & Assets
  block5_financialYearEnd?: string; // e.g., '30 June' (Task 5.1)
  block5_financialYearEndOther?: string;
  block5_fundManagement?: string[]; // Checkboxes (e.g., bank accounts, investments) (Task 5.2)
  block5_fundManagementOther?: string;
  block5_paymentAuthorisation?: string; // Dropdown (e.g., two signatories, treasurer)
  block5_paymentAuthorisationOther?: string;
  block5_borrowingPower?: boolean | null; // Yes/No (Task 5.3)
  block5_borrowingLimits?: string; // Textarea (conditional)
  block5_auditRequirement?: string; // Dropdown (e.g., required if revenue > X, always) (Task 5.4)
  block5_auditRequirementThreshold?: number; // Conditional number
  block5_auditorAppointment?: string; // Dropdown (e.g., AGM, Committee)
  block5_auditorAppointmentOther?: string;
  block5_windingUpDistribution?: string; // Dropdown (e.g., similar purpose society, specified charity) (Task 5.5)
  block5_windingUpDistributionOther?: string;
  block5_confirmNoFinancialGain?: boolean; // Added for Task 5.2 confirmation
  block5_fundsSource?: string[]; // e.g., 'Membership fees', 'Grants', 'Donations', 'Fundraising'
  block5_fundsSourceOther?: string;
  block5_fundsManagement?: string; // Who controls funds (e.g., Treasurer, Committee)
  block5_bankAccountRequired?: boolean;
  block5_accountSignatories?: string; // How many signatories
  block5_auditorRequired?: boolean;
  block5_auditThreshold?: number; // Optional threshold for requiring audit
  block5_auditorAppointmentMethod?: string; // How auditor is appointed (AGM, Committee)
  block5_surplusDistributionDissolution?: string; // What happens to assets on winding up (crucial for charity status)
  block5_commonSeal?: boolean; // Does the society need/have a common seal?

  // Block 6 - Amendments & Common Seal
  block6_amendmentProcedure?: string; // Dropdown (e.g., SGM 2/3 majority) (Task 6.1)
  block6_amendmentProcedureOther?: string;
  block6_hasCommonSeal?: boolean | null; // Yes/No (Task 6.2)
  block6_commonSealCustody?: string; // Textarea (conditional)
  block6_commonSealUse?: string; // Textarea (conditional)
  // ADDED Optional Block 6 Keys
  block6_appealRights?: boolean | null; // Task 6.2
  block6_appealProcess?: string; // Textarea (conditional)
  block6_committeeCanMakeBylaws?: boolean | null; // Task 6.3
  block6_bylawProcedure?: string; // Dropdown (conditional)
  block6_bylawProcedureOther?: string;

  // Block 7 - Dispute Resolution
  block7_disputeProcedure?: string; // RadioGroup: informal, formal steps, external (Task 7.1)
  block7_informalSteps?: string; // Textarea (conditional)
  block7_formalSteps?: string; // Textarea (conditional)
  block7_externalOptions?: string[]; // Checkboxes: mediation, arbitration, etc. (conditional)
  block7_externalOptionsOther?: string;
  // ADDED Optional Block 7 Keys
  block7_includeNoticesClause?: boolean | null; // Task 7.2
  block7_noticesClauseText?: string; // Textarea (conditional)
  block7_includeIndemnityClause?: boolean | null; // Task 7.3
  block7_committeeCanArrangeInsurance?: boolean | null; // Task 7.3

  // Block 8: Finances
  block8_financialYearEnd?: string; // E.g., "31 March", "30 June"
  block8_financialYearEndDay?: number; // e.g. 31
  block8_financialYearEndMonth?: number; // e.g. 3 (March)
  block8_bankAccountRequired?: boolean | null;
  block8_whoSignsCheques?: string[]; // E.g., ["Treasurer", "Secretary", "Chairperson"]
  block8_minSignatories?: number; // E.g. 2
  block8_borrowingPowers?: string; // "committee", "general_meeting", "none"
  block8_borrowingLimit?: number | null; // Optional limit
  block8_propertyAndFundsUsage?: string; // Optional text area for specific usage rules

  // Block 9: Dissolution (Winding Up)
  block9_dissolutionTrigger?: string; // 'committee_recommendation', 'member_request', 'specific_event'
  block9_dissolutionMemberRequestPercent?: number | null; // Required if trigger includes 'member_request'
  block9_dissolutionMemberRequestNumber?: number | null; // Required if trigger includes 'member_request'
  block9_dissolutionMeetingType?: string; // 'SGM', 'AGM'
  block9_dissolutionVoteThreshold?: string; // 'simple_majority', 'two_thirds', 'three_quarters', 'unanimous'
  block9_dissolutionQuorumType?: string | null; // 'percentage', 'number' (Optional override, otherwise uses standard GM quorum)
  block9_dissolutionQuorumValue?: number | null; // Optional override value
  // Use block5_windingUpDistribution & block5_windingUpDistributionOther for asset distribution data
  block9_recordsCustody?: string; // NEW: Added for custody of records after dissolution

  // Block 10: Transitional Provisions (New structure)
  block10_isReplacingConstitution?: boolean | null; // NEW
  block10_includeTransitionalProvisions?: boolean | null; // NEW - Added
  block10_transitionalProvisionsText?: string; // NEW - Added
  block10_initialCommittee?: string; // Text area for names/positions
  block10_firstAGMTiming?: string; // Text input for timing description
  block10_constitutionAdoptionMethod?: string; // Text input for adoption method
  block10_customTransitionalProvisions?: string; // Text area for custom clauses

  // Block 11: Review Confirmation (Placeholder)
  block11_finalConfirmation?: boolean; // NEW - Added
}

// Export the ValidationErrors interface
export interface ValidationErrors extends Partial<Record<keyof ConstitutionFormData, string>> {
  // Add specific combined error keys if needed, e.g.:
  committeeSize?: string;
}

// Define the structure for each step in the wizard
interface WizardStep {
  number: number;
  title: string;
  screenTitle: string;
  component: React.FC<StepProps> | React.FC<{ formData: ConstitutionFormData }>;
  mandatoryFields?: (keyof ConstitutionFormData)[]; // Added for progress tracking
}

// Props passed down to each step component
export interface StepProps {
  blockNumber: number; // Added block number
  formData: ConstitutionFormData;
  updateFormData: (field: keyof ConstitutionFormData, value: any) => void;
  onComplete: (blockNumber: number) => void; // Pass block number
  onSaveProgress: (blockNumber: number) => void; // Added save handler
}

// Define the blocks configuration (Add actual mandatoryFields later)
const blocks: WizardStep[] = [
  {
    number: 1,
    title: 'Block 1: Foundation',
    screenTitle: 'Foundation & Identity',
    component: Block1Foundation,
    mandatoryFields: [ // Example for Block 1
      'block1_societyName',
      'block1_societyPurposes',
      'block1_charitableStatus',
      // Conditionally mandatory fields omitted for simplicity initially
      // 'block1_officeMethodText',
      // 'block1_meetingLocation',
      // 'block1_charitablePurposeDetails',
    ],
  },
  {
    number: 2,
    title: 'Block 2: Membership',
    screenTitle: 'Membership Details',
    component: Block2Membership,
    mandatoryFields: [
        // TODO: Populate Block 2 mandatory fields
        'block2_membershipOpen',
        'block2_canRefuseMembership',
        'block2_feeSettingMethod',
        'block2_nonPaymentConsequence',
        'block2_resignationSteps',
        'block2_terminationGrounds',
        'block2_registerMaintainer',
    ],
  },
  {
    number: 3,
    title: 'Block 3: Committee',
    screenTitle: 'Committee Governance',
    component: Block3Committee,
     mandatoryFields: [
        // TODO: Populate Block 3 mandatory fields
        'block3_committeeMinSize',
        'block3_committeeMaxSize',
        'block3_electionMethod',
        'block3_termOfOffice',
        'block3_removalGrounds',
        'block3_meetingFrequency',
        'block3_committeeQuorumType',
        'block3_committeeQuorumValue',
        'block3_committeeChair',
        'block3_conflictOfInterestMethod',
        'block3_contactPersonAppointment',
    ],
  },
  {
    number: 4,
    title: 'Block 4: Meetings',
    screenTitle: 'General Meetings (AGM/SGM)',
    component: Block4GeneralMeetings,
     mandatoryFields: [
        // TODO: Populate Block 4 mandatory fields
        'block4_agmTiming',
        'block4_agmNoticePeriod',
        'block4_agmQuorumType',
        'block4_agmQuorumValue',
        'block4_gmChair',
        'block4_votingRights',
        'block4_sgmTriggerMethod',
    ],
  },
  {
    number: 5,
    title: 'Block 5: Amendments',
    screenTitle: 'Amendments & Bylaws',
    component: Block6Amendments,
     mandatoryFields: [
        // TODO: Populate Block 5 mandatory fields
        'block6_amendmentProcedure',
    ],
  },
  {
    number: 6,
    title: 'Block 6: Disputes',
    screenTitle: 'Dispute Resolution & Notices',
    component: Block7Disputes,
     mandatoryFields: [
        // TODO: Populate Block 6 mandatory fields
        'block7_disputeProcedure',
    ],
  },
   {
    number: 7,
    title: 'Block 7: Finances',
    screenTitle: 'Financial Management',
    component: Block8Finances,
     mandatoryFields: [
        // TODO: Populate Block 7 mandatory fields
        'block8_financialYearEnd',
        'block8_bankAccountRequired',
        'block8_borrowingPowers',
        'block8_propertyAndFundsUsage',
     ],
  },
  {
    number: 8,
    title: 'Block 8: Dissolution',
    screenTitle: 'Dissolution (Winding Up)',
    component: Block9Dissolution,
     mandatoryFields: [
         // TODO: Populate Block 8 mandatory fields
        'block9_dissolutionTrigger',
        'block9_dissolutionMeetingType',
        'block9_dissolutionVoteThreshold',
        'block5_windingUpDistribution',
     ],
  },
  {
    number: 9,
    title: 'Block 9: Transitional',
    screenTitle: 'Transitional Provisions',
    component: Block10Transitional,
     mandatoryFields: [
         // TODO: Populate Block 9 mandatory fields
        'block10_isReplacingConstitution',
        // Conditional: 'block10_includeTransitionalProvisions'
        // Conditional: 'block10_transitionalProvisionsText'
     ],
  },
  {
    number: 10,
    title: 'Block 10: Review',
    screenTitle: 'Review & Generate',
    component: Block11Review,
  },
];

// Type for block status
type BlockStatus = 'incomplete' | 'in-progress' | 'complete';

const ConstitutionWizard: React.FC = () => {
  const [formData, setFormData] = useState<ConstitutionFormData>({});
  const [openBlockId, setOpenBlockId] = useState<number | null>(1); // Start with block 1 open
  const [blockStatus, setBlockStatus] = useState<Record<number, BlockStatus>>({}); // State for block completion status

  const updateFormData = (field: keyof ConstitutionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
     // When data changes, if the block was 'complete', maybe reset to 'in-progress'?
    // Or only update status on explicit save/complete actions. Let's stick to explicit for now.
  };

  const toggleAccordion = (id: number) => {
    setOpenBlockId(prevId => (prevId === id ? null : id));
  };

  // Handler for the "Save Progress" button in blocks
  const handleSaveProgress = (blockNumber: number) => {
    console.log('Progress saved for block:', blockNumber, formData);
    setBlockStatus(prevStatus => ({
      ...prevStatus,
      [blockNumber]: prevStatus[blockNumber] === 'complete' ? 'complete' : 'in-progress', // Don't overwrite 'complete'
    }));
    // TODO: Add actual persistence logic here if needed (e.g., localStorage)
  };

  // Handler for the "Mark as Complete" button in blocks (replaces old onComplete logic)
  const handleCompleteBlock = (blockNumber: number) => {
    console.log('Block marked as complete:', blockNumber);
    setBlockStatus(prevStatus => ({
      ...prevStatus,
      [blockNumber]: 'complete',
    }));
    setOpenBlockId(null); // Close the accordion
  };

  // Helper to get status color
  const getStatusColor = (status: BlockStatus | undefined): string => {
    switch (status) {
      case 'complete':
        return 'text-green-500'; // Use fill for solid color
      case 'in-progress':
        return 'text-yellow-500';
      case 'incomplete':
      default:
        return 'text-gray-400';
    }
  };

  // Helper to check if a field has a meaningful value
  const isFieldFilled = (key: keyof ConstitutionFormData, data: ConstitutionFormData): boolean => {
    const value = data[key];
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    // Add other checks if necessary (e.g., for numbers, boolean specifically false)
    // For boolean 'false' counts as filled, 'null' or 'undefined' does not.
    if (typeof value === 'boolean') return true;
    return true;
  };

  // Dynamically calculate mandatory fields based on conditions if needed (more complex)
  // For now, uses the static list from the block definition.
  const getMandatoryFieldsForBlock = (blockNumber: number, data: ConstitutionFormData): (keyof ConstitutionFormData)[] => {
      const blockConfig = blocks.find(b => b.number === blockNumber);
      if (!blockConfig?.mandatoryFields) return [];

      // Basic implementation: return static list
      return blockConfig.mandatoryFields;

      // --- Advanced Example (Conditional Logic) ---
      // let dynamicMandatoryFields = [...(blockConfig.mandatoryFields || [])];
      // if (blockNumber === 1) {
      //     if (data.block1_specifyOfficeMethod === true) {
      //         dynamicMandatoryFields.push('block1_officeMethodText');
      //     } else if (data.block1_specifyOfficeMethod === false) {
      //         dynamicMandatoryFields.push('block1_meetingLocation');
      //     }
      //     if (data.block1_charitableStatus === 'Yes') {
      //         dynamicMandatoryFields.push('block1_charitablePurposeDetails');
      //     }
      //      // Remove potentially non-mandatory fields if condition not met
      //      if (data.block1_specifyOfficeMethod !== true) dynamicMandatoryFields = dynamicMandatoryFields.filter(f => f !== 'block1_officeMethodText');
      //      if (data.block1_specifyOfficeMethod !== false) dynamicMandatoryFields = dynamicMandatoryFields.filter(f => f !== 'block1_meetingLocation');
      //      if (data.block1_charitableStatus !== 'Yes') dynamicMandatoryFields = dynamicMandatoryFields.filter(f => f !== 'block1_charitablePurposeDetails');
      // }
      // // Add logic for other blocks...
      // return dynamicMandatoryFields;
      // --- End Advanced Example ---
  };


  return (
    <div className="">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Constitution Builder</h2>
      <div className="space-y-4">
        {blocks.map((block) => {
          // Keep the component type general here
          const BlockComponent = block.component as React.FC<any>;
          const isCurrentBlockOpen = openBlockId === block.number;
          const status = blockStatus[block.number] || 'incomplete';

          // Calculate progress only for blocks 1-10
          const mandatoryFields = block.number < 11 ? getMandatoryFieldsForBlock(block.number, formData) : [];
          const completedCount = mandatoryFields.filter(key => isFieldFilled(key, formData)).length;
          const totalMandatory = mandatoryFields.length;
          const progressText = block.number < 11 && totalMandatory > 0 ? `(${completedCount}/${totalMandatory} Mandatory)` : '';

          return (
            <div key={block.number} className="border border-gray-200 rounded-md overflow-hidden">
              <button
                onClick={() => toggleAccordion(block.number)}
                className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
              >
                <div className="flex items-center space-x-2">
                   <Circle size={12} className={`${getStatusColor(status)} fill-current`} />
                   <span>{block.number}. {block.title}</span>
                </div>
                <div className="flex items-center">
                   <span className="text-sm font-normal text-gray-500 mr-2">{progressText}</span>
                   <ChevronDown
                      className={cn('w-5 h-5 text-gray-400 transition-transform', {
                         'transform rotate-180': isCurrentBlockOpen,
                      })}
                    />
                 </div>
              </button>

              {isCurrentBlockOpen && (
                <div className="p-6 border-t border-gray-200">
                  {/* Removed H2 heading that displayed screenTitle */}
                  {/* <h2 className="text-xl font-medium mb-4">{block.screenTitle}</h2> */}
                  {/* Check specifically for block 10 (new review block number) */}
                  {block.number === 10 ? (
                     <BlockComponent formData={formData} />
                  ) : (
                    // Render blocks 1-9 with standard StepProps
                    <BlockComponent
                      blockNumber={block.number}
                      formData={formData}
                      updateFormData={updateFormData}
                      onComplete={handleCompleteBlock}
                      onSaveProgress={handleSaveProgress}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ConstitutionWizard;