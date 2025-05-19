import React, { useState, useCallback, useMemo, useImperativeHandle, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { InfoIcon, PlusCircle, MinusCircle, CheckCircleIcon, HelpCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

// Import new block placeholders
import Block1SocietyInformation from './blocks/Block1SocietyInformation';
import Block2Members from './blocks/Block2Members';
import Block3Committee from './blocks/Block3Committee';
import Block4Officers from './blocks/Block4Officers';
import Block5CommitteeMeetings from './blocks/Block5CommitteeMeetings';
import Block6GeneralMeetings from './blocks/Block6GeneralMeetings';
import Block7Finances from './blocks/Block7Finances';
import Block8Disputes from './blocks/Block8Disputes';
import Block9ChangingTheConstitution from './blocks/Block9ChangingTheConstitution';
import Block10WindingUpOrRemoval from './blocks/Block10WindingUpOrRemoval';
import Block11Records from './blocks/Block11Records';
import Block12CommonSealAndBylaws from './blocks/Block12CommonSealAndBylaws';
// Removed imports for old block components

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import * as AccordionPrimitive from "@radix-ui/react-accordion";

// Define the completion stats interface
export interface CompletionStats {
  totalSectionsCompleted: number;
  totalSections: number;
  completedCompulsorySections: number;
  totalCompulsorySections: number;
  overallPercentage: number;
}

// Add new field for Block 11.01
export interface ConstitutionFormData {
  block11_01_includeAccessToInfoClause?: boolean;

  // Fields for Block 12: Common Seal and Bylaws
  block12_01_commonSealOption?: 'noSeal' | 'hasSeal';
  block12_01_sealCustody?: string; // e.g., "an OFFICER", "the CHAIRPERSON"
  block12_02_includeBylawsClause?: boolean;

  // Fields for Block 1: Society Information - Sub-section 1.01 Name
  block1_01_societyName?: string;

  // Fields for Block 1: Society Information - Sub-section 1.02 Charitable status
  block1_02_charitableStatusIntent?: 'intendsToRegister' | 'doesNotIntendToRegister';

  // Fields for Block 1: Society Information - Sub-section 1.03 Purposes
  // For 1.03a (Charitable)
  block1_03a_isRelievingPoverty?: boolean;
  block1_03a_relievingPovertyBy?: string;
  block1_03a_isAdvancingEducation?: boolean;
  block1_03a_advancingEducationBy?: string;
  block1_03a_isAdvancingReligion?: boolean;
  block1_03a_advancingReligionBy?: string;
  block1_03a_isBenefittingCommunity?: boolean;
  block1_03a_benefittingCommunityBy?: string;
  // For 1.03b (Non-Charitable)
  block1_03b_primaryPurposesDescription?: string;

  // Fields for Block 1: Society Information - Sub-section 1.04 Definitions
  block1_04_includeDefinitionsClause?: boolean;
  block1_04_additionalTerms?: Array<{ id: string; term: string; definition: string; }>;

  // Fields for Block 1: Society Information - Sub-section 1.05 Contact person
  block1_05_includeContactPersonClause?: boolean;

  // Fields for Block 1: Society Information - Sub-section 1.06 Registered office
  block1_06_includeRegisteredOfficeClause?: boolean;

  // Fields for Block 1: Society Information - Sub-section 1.07 Restrictions on powers
  block1_07_restrictionsOption?: 'noAdditionalRestrictions' | 'hasSpecificRestrictions';
  block1_07_specificRestrictions?: Array<{ id: string; description: string; }>;

  // Fields for Block 1: Society Information - Sub-section 1.08 Balance Date
  block1_08_balanceDateDay?: string; // e.g., "31"
  block1_08_balanceDateMonth?: string; // 0-indexed: "0" for Jan, "11" for Dec

  // Fields for Block 1: Society Information - Sub-section 1.09 Tikanga
  block1_09_includeTikangaClause?: boolean;
  block1_09_tikangaDescription?: string;

  // Fields for Block 2: Members - Sub-sections 2.01, 2.02, 2.03
  block2_01_includeMinMembersClause?: boolean;
  block2_02_includeMembershipTypesClause?: boolean;
  block2_02_lifeMemberMajority?: string; // e.g., "simple", "two thirds"
  block2_02_honoraryMemberMajority?: string; // e.g., "simple", "two thirds"
  block2_03_includeBecomingMemberClause?: boolean;

  // Fields for Block 2: Members - Sub-sections 2.04, 2.05, 2.06
  block2_04_includeObligationsRightsClause?: boolean;
  block2_05_otherRegisterInfo?: string;
  block2_06_includeSubscriptionsClause?: boolean;
  block2_06_unfinancialGracePeriodDays?: number;
  block2_06_terminationGracePeriodDays?: number;

  // Fields for Block 2: Members - Sub-sections 2.07, 2.08
  block2_07_includeCessationClause?: boolean;
  block2_07_cessationGracePeriodDays?: number;
  block2_08_includeReinstatementClause?: boolean;

  // Fields for Block 3: Committee - Sub-sections 3.01, 3.02, 3.03
  block3_01_officerNumberOption?: 'fixed' | 'range';
  block3_01_fixedOfficerCount?: number;
  block3_01_maxOfficerCount?: number; // Min is 3 if range is chosen
  block3_02_includeCompositionClause?: boolean;
  block3_03_includeFunctionsPowersClause?: boolean;

  // Fields for Block 3: Committee - Sub-sections 3.04, 3.05
  block3_04_includeSubcommitteesClause?: boolean;
  block3_05_includeGeneralProvisionsClause?: boolean;

  // Fields for Block 4: Officers - Sub-sections 4.01, 4.02, 4.03
  block4_01_includeOfficerDutiesClause?: boolean;
  block4_02_includeQualificationsConsentClause?: boolean;
  block4_03_electionMethod?: 'floorNominations' | 'aheadOfTime' | 'remoteBallot';
  block4_03_floorNominationsDays?: number;

  // Fields for Block 4: Officers - Sub-sections 4.04, 4.05, 4.06, 4.07
  block4_04_includeTermsClause?: boolean;
  block4_04_officerTermYears?: number;
  block4_04_maxConsecutiveTerms?: number;
  block4_04_chairMaxConsecutiveYears?: number;
  block4_05_includeCessationClause?: boolean;
  block4_05_cessationReturnPropertyDays?: number;
  block4_06_includeRemovalClause?: boolean;
  block4_06_removalAbsenceMeetings?: string; // Can be number or placeholder like 'xxx'
  block4_07_includeConflictsClause?: boolean;

  // Fields for Block 5: Committee Meetings - Sub-sections 5.01, 5.02, 5.03
  block5_01_includeMeetingProceduresClause?: boolean;
  block5_01_meetingFrequency?: string;
  block5_02_includeQuorumClause?: boolean;
  block5_02_quorumDefinition?: string;
  block5_03_includeVotingProceduresClause?: boolean;

  // Fields for Block 5: Committee Meetings - Sub-section 5.04
  block5_04_chairCastingVote?: 'hasCastingVote' | 'noCastingVote';

  // Fields for Block 6: General Meetings - Sub-sections 6.01, 6.02, 6.03
  block6_01_includeAgmRequirementsClause?: boolean;
  block6_01_agmNoticeDays?: number;
  block6_02_includeQuorumVotingClause?: boolean;
  block6_02_quorumPercentage?: number;
  block6_03_writtenResolutionsOption?: 'notAllowed' | 'allowed';
  block6_03_writtenResolutionPercentage?: number;

  // Fields for Block 6: General Meetings - Sub-sections 6.04, 6.05, 6.06
  block6_04_includeParticipationMethodsClause?: boolean;
  block6_05_includeMeetingChairClause?: boolean;
  block6_05_absentChairpersonReplacement?: string;
  block6_06_includeChairPowersClause?: boolean;
  block6_06_chairHasCastingVote?: string; // 'a' or 'no' - using string for direct input for now

  // Fields for Block 6: General Meetings - Sub-sections 6.07, 6.08, 6.09
  block6_07a_includeCommitteeMotionsClause?: boolean;
  block6_07b_includeMemberMotionsClause?: boolean;
  block6_07b_memberMotionNoticeDays?: number;
  block6_08_includeMinutesClause?: boolean;
  block6_09_includeSgmClause?: boolean;
  block6_09_sgmRequestPercentage?: number;

  // Fields for Block 7: Finances - Sub-section 7.01
  block7_01_includeFinancialControlClause?: boolean;
  block7_01_bankingReceiptDays?: number;

  // Fields for Block 8: Disputes - Sub-sections 8.01, 8.02, 8.03
  block8_01_includeMeaningsClause?: boolean;
  block8_02_disputeResolutionOption?: 'deviseOwn' | 'safeHarbour';
  block8_02_ownDisputeProcessDescription?: string;
  block8_03_includeTypesOfResolutionClause?: boolean;

  // Fields for Block 9: Changing the Constitution - Sub-section 9.01
  block9_01_includeChangeClause?: boolean;
  block9_01_amendmentMajority?: string; // e.g., "simple, two thirds"
  block9_01_memberProposalPercent?: number;
  block9_01_memberProposalNoticeDays?: number;
  block9_01_committeeNoticeToMembersDays?: number;

  // Fields for Block 10: Winding up or Removal - Sub-sections 10.01, 10.02, 10.03
  block10_01_includeLiquidationClause?: boolean;
  block10_01_liquidationNoticeDays?: number;
  block10_01_liquidationMajority?: string;
  block10_02_includeRemovalClause?: boolean;
  block10_02_removalNoticeDays?: number;
  block10_02_removalMajority?: string;
  block10_03_includeSurplusAssetsClause?: boolean;
  block10_03_surplusAssetRecipients?: Array<{ id: string; name: string; }>;
}

export interface ValidationErrors extends Partial<Record<keyof ConstitutionFormData, string>> {
  // committeeSize?: string; // Example, can be removed or adapted later
}

interface WizardStep {
  number: number;
  title: string; // Internal full title e.g. "Block 1: Society Information"
  shortTitle: string; // Display title e.g. "Society Information"
  screenTitle: string; // Title used inside the block content area
  component: React.FC<StepProps> | React.FC<{ formData: ConstitutionFormData }>; // Last block might be different
  mandatoryFields?: (keyof ConstitutionFormData)[];
}

export interface StepProps {
  blockNumber: number;
  formData: ConstitutionFormData;
  updateFormData: (field: keyof ConstitutionFormData, value: any) => void;
  onComplete: (blockNumber: number) => void;
  onSaveProgress: (blockNumber: number) => void;
}

const blocksConfig: WizardStep[] = [
  {
    number: 1,
    title: 'Block 1: Society Information',
    shortTitle: 'Society Information',
    screenTitle: 'Society Information & Purpose',
    component: Block1SocietyInformation,
    mandatoryFields: [
      'block1_01_societyName', 
      'block1_02_charitableStatusIntent',
      'block1_07_restrictionsOption',
      'block1_08_balanceDateDay',
      'block1_08_balanceDateMonth'
    ],
  },
  {
    number: 2,
    title: 'Block 2: Members',
    shortTitle: 'Members',
    screenTitle: 'Membership Structure and Process',
    component: Block2Members,
    mandatoryFields: [],
  },
  {
    number: 3,
    title: 'Block 3: Committee',
    shortTitle: 'Committee',
    screenTitle: 'Committee Structure and Governance',
    component: Block3Committee,
    mandatoryFields: ['block3_01_officerNumberOption'],
  },
  {
    number: 4,
    title: 'Block 4: Officers',
    shortTitle: 'Officers',
    screenTitle: 'Officer Roles and Responsibilities',
    component: Block4Officers,
    mandatoryFields: ['block4_03_electionMethod'],
  },
  {
    number: 5,
    title: 'Block 5: Committee Meetings',
    shortTitle: 'Committee Meetings',
    screenTitle: 'Committee Meeting Procedures',
    component: Block5CommitteeMeetings,
    mandatoryFields: ['block5_04_chairCastingVote'],
  },
  {
    number: 6,
    title: 'Block 6: General Meetings',
    shortTitle: 'General Meetings',
    screenTitle: 'Member Meeting Procedures (AGM/SGM)',
    component: Block6GeneralMeetings,
    mandatoryFields: ['block6_03_writtenResolutionsOption'],
  },
   {
    number: 7,
    title: 'Block 7: Finances',
    shortTitle: 'Finances',
    screenTitle: 'Financial Management and Controls',
    component: Block7Finances,
    mandatoryFields: [],
  },
  {
    number: 8,
    title: 'Block 8: Disputes',
    shortTitle: 'Disputes',
    screenTitle: 'Dispute Resolution Procedures',
    component: Block8Disputes,
    mandatoryFields: ['block8_02_disputeResolutionOption'],
  },
  {
    number: 9,
    title: 'Block 9: Changing the Constitution',
    shortTitle: 'Changing the Constitution',
    screenTitle: 'Constitution Amendment Process',
    component: Block9ChangingTheConstitution,
     mandatoryFields: [
      // Assuming these become mandatory if the user intends to define this section
      // Alternatively, could be conditional based on block9_01_includeChangeClause
      'block9_01_amendmentMajority',
      'block9_01_memberProposalPercent',
      'block9_01_memberProposalNoticeDays',
      'block9_01_committeeNoticeToMembersDays'
     ],
  },
  {
    number: 10,
    title: 'Block 10: Winding up or Removal',
    shortTitle: 'Winding up or Removal',
    screenTitle: 'Society Dissolution and Asset Distribution',
    component: Block10WindingUpOrRemoval,
    mandatoryFields: [],
  },
  {
    number: 11,
    title: 'Block 11: Records',
    shortTitle: 'Records',
    screenTitle: 'Record Keeping and Access',
    component: Block11Records,
    mandatoryFields: [],
  },
  {
    number: 12,
    title: 'Block 12: Common Seal and Bylaws',
    shortTitle: 'Common Seal and Bylaws',
    screenTitle: 'Official Seal and Additional Rules',
    component: Block12CommonSealAndBylaws,
    mandatoryFields: [],
  },
  // Consider if a 13th Review/Finalize block is needed, or if Block 12 is the last content block.
  // For now, assuming 12 content blocks.
];

type BlockStatusType = 'incomplete' | 'in-progress' | 'complete';

// Define the props interface for the component
export interface ConstitutionWizardProps {
  onCompletionStatsChange?: (stats: CompletionStats) => void;
}

// Define the ref interface
export interface ConstitutionWizardRef {
  openBlock: (blockNumber: number) => void;
}

const ConstitutionWizard = forwardRef<ConstitutionWizardRef, ConstitutionWizardProps>(({ onCompletionStatsChange }, ref) => {
  const [formData, setFormData] = useState<ConstitutionFormData>({});
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [blockStatus, setBlockStatus] = useState<Record<number, BlockStatusType>>({});

  // Expose methods via the ref
  useImperativeHandle(ref, () => ({
    openBlock: (blockNumber: number) => {
      if (blockNumber >= 1 && blockNumber <= blocksConfig.length) {
        setActiveBlock(blockNumber);
      }
    }
  }));

  const updateFormData = useCallback((field: keyof ConstitutionFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (activeBlock !== null && blockStatus[activeBlock] !== 'complete') {
      setBlockStatus(prevStatus => ({ ...prevStatus, [activeBlock]: 'in-progress' }));
    }
  }, [activeBlock, blockStatus]);

  const handleSaveProgress = useCallback((blockNumber: number) => {
    console.log('Progress saved for block:', blockNumber, formData);
    if (blockStatus[blockNumber] !== 'complete') {
        setBlockStatus(prevStatus => ({ ...prevStatus, [blockNumber]: 'in-progress' }));
    }
  }, [formData, blockStatus]);

  const handleCompleteBlock = useCallback((blockNumber: number) => {
    console.log('Block marked as complete:', blockNumber);
    setBlockStatus(prevStatus => ({ ...prevStatus, [blockNumber]: 'complete' }));
    setActiveBlock(null); 
  }, []);
  
  const isFieldFilled = (key: string, data: Record<string, any>): boolean => {
    const value = data[key];
    if (value === undefined || value === null) return false;
    if (typeof value === 'string' && value.trim() === '') return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (typeof value === 'boolean') return true;
    return true;
  };

  const getMandatoryFieldsForBlock = (blockNumber: number): string[] => {
      const blockConfig = blocksConfig.find(b => b.number === blockNumber);
      return (blockConfig?.mandatoryFields as string[] | undefined) || [];
  };

  // Calculate completion statistics
  const completionStats = useMemo(() => {
    // Calculate total sections
    const totalSections = blocksConfig.reduce((acc, block) => {
      let subSectionCount = 0;
      if (block.number === 1) subSectionCount = 9;
      else if (block.number === 2) subSectionCount = 8;
      else if (block.number === 3) subSectionCount = 5;
      else if (block.number === 4) subSectionCount = 7;
      else if (block.number === 5) subSectionCount = 4;
      else if (block.number === 6) subSectionCount = 9;
      else if (block.number === 7) subSectionCount = 1;
      else if (block.number === 8) subSectionCount = 3;
      else if (block.number === 9) subSectionCount = 1;
      else if (block.number === 10) subSectionCount = 3;
      else if (block.number === 11) subSectionCount = 1;
      else if (block.number === 12) subSectionCount = 2;
      return acc + subSectionCount;
    }, 0);

    // Estimate sections completed based on block status
    // This is a simple approximation - in a real application, we'd track individual subsection completion
    const totalSectionsCompleted = Object.values(blockStatus).filter(status => status === 'complete').length * 5;

    // Calculate compulsory fields stats
    const allMandatoryFields = blocksConfig.flatMap(block => block.mandatoryFields || []);
    const totalCompulsorySections = allMandatoryFields.length;
    
    const completedCompulsorySections = allMandatoryFields.filter(field => 
      isFieldFilled(field as string, formData)
    ).length;

    // Calculate overall percentage
    const overallPercentage = Math.min(
      Math.round(
        ((totalSectionsCompleted / totalSections) * 0.6 + 
        (completedCompulsorySections / totalCompulsorySections) * 0.4) * 100
      ), 
      100
    );

    return {
      totalSectionsCompleted: Math.min(totalSectionsCompleted, totalSections),
      totalSections,
      completedCompulsorySections,
      totalCompulsorySections,
      overallPercentage: isNaN(overallPercentage) ? 0 : overallPercentage
    };
  }, [blockStatus, formData]);

  // Notify parent component when completion stats change
  React.useEffect(() => {
    if (onCompletionStatsChange) {
      onCompletionStatsChange(completionStats);
    }
  }, [completionStats, onCompletionStatsChange]);

  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Constitution Builder</h1>
      </div>

      {/* New top sticky navigation bar for quick section jumping */}
      <div className="mb-6 sticky top-0 z-10 bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
        <h2 className="text-sm font-medium text-gray-700 mb-2">Jump to Section:</h2>
        <div className="flex flex-wrap gap-2">
          {blocksConfig.map((block) => {
            const status = blockStatus[block.number] || 'incomplete';
            return (
              <button
                key={block.number}
                onClick={() => setActiveBlock(activeBlock === block.number ? null : block.number)}
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full border transition-all duration-200",
                  activeBlock === block.number ? "bg-purple-600 text-white" : 
                  status === 'complete' ? "bg-green-100 text-green-800 border-green-300" :
                  status === 'in-progress' ? "bg-amber-100 text-amber-800 border-amber-300" :
                  "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                )}
              >
                {block.number}. {block.shortTitle}
              </button>
            );
          })}
        </div>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full space-y-4"
        value={activeBlock !== null ? `item-${activeBlock}` : undefined}
        onValueChange={(value) => {
          const newActiveBlock = value ? parseInt(value.split('-')[1]) : null;
          setActiveBlock(newActiveBlock);
        }}
      >
        {blocksConfig.map((block) => {
          const BlockComponent = block.component as React.FC<any>;
          const isCurrentBlockOpen = activeBlock === block.number;
          const status = blockStatus[block.number] || 'incomplete';

          const mandatoryFields = getMandatoryFieldsForBlock(block.number);
          const completedCount = mandatoryFields.filter(key => isFieldFilled(key, formData)).length;
          const totalMandatory = mandatoryFields.length;
          const fieldsProgressText = totalMandatory > 0 ? `${completedCount}/${totalMandatory}` : '0';
          
          let subSectionsProgressText = '0'; 
          if (block.number === 1) subSectionsProgressText = '0/9'; 
          else if (block.number === 2) subSectionsProgressText = '0/8'; 
          else if (block.number === 3) subSectionsProgressText = '0/5'; 
          else if (block.number === 4) subSectionsProgressText = '0/7'; 
          else if (block.number === 5) subSectionsProgressText = '0/4'; 
          else if (block.number === 6) subSectionsProgressText = '0/9'; 
          else if (block.number === 7) subSectionsProgressText = '0/1'; 
          else if (block.number === 8) subSectionsProgressText = '0/3'; 
          else if (block.number === 9) subSectionsProgressText = '0/1'; 
          else if (block.number === 10) subSectionsProgressText = '0/3'; 
          else if (block.number === 11) subSectionsProgressText = '0/1'; 
          else if (block.number === 12) subSectionsProgressText = '0/2';

          const progressPercentage = totalMandatory > 0 
            ? Math.round((completedCount / totalMandatory) * 100) 
            : 0;

          return (
            <AccordionItem 
              value={`item-${block.number}`} 
              key={block.number} 
              className={cn(
                "overflow-hidden rounded-lg border transition-all duration-200",
                status === 'complete' ? "border-green-300 bg-green-50" :
                status === 'in-progress' ? "border-amber-300 bg-amber-50" :
                "border-gray-200 bg-white"
              )}
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger asChild>
                  <button
                    type="button"
                    className="group flex items-center justify-between w-full p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-1 rounded-t-lg"
                  >
                    <div className="flex items-center flex-shrink-0">
                      {status === 'complete' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      ) : isCurrentBlockOpen ? (
                        <MinusCircle className="h-5 w-5 text-purple-600 mr-3 flex-shrink-0" />
                      ) : (
                        <PlusCircle className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0 group-hover:text-purple-600" />
                      )}
                      <span className={cn(
                        "text-base font-medium group-hover:text-purple-600",
                        status === 'complete' ? "text-green-800" :
                        status === 'in-progress' ? "text-amber-800" :
                        "text-gray-700"
                      )}>
                        {block.number}. {block.shortTitle}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 ml-auto">
                      {/* Status label */}
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-medium hidden sm:inline-block",
                        status === 'complete' ? "bg-green-100 text-green-800" :
                        status === 'in-progress' ? "bg-amber-100 text-amber-800" :
                        "bg-gray-100 text-gray-600"
                      )}>
                        {status === 'complete' ? "Complete" :
                         status === 'in-progress' ? "In Progress" :
                         "Not Started"}
                      </span>
                      
                      {/* Progress indicators */}
                      <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-1 sm:space-y-0 sm:space-x-3">
                        <div className="flex flex-col items-end sm:items-center">
                          <span className="text-xs text-gray-500">Sections</span>
                          <span className="text-sm font-medium text-gray-700">{subSectionsProgressText}</span>
                        </div>
                        <div className="flex flex-col items-end sm:items-center">
                          <span className="text-xs text-gray-500">Required</span>
                          <span className="text-sm font-medium text-gray-700">{fieldsProgressText}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              
              {/* Progress bar below header */}
              <div className="h-1 w-full bg-gray-200">
                <div 
                  className={cn(
                    "h-full transition-all duration-500 ease-in-out",
                    status === 'complete' ? "bg-green-500" :
                    status === 'in-progress' ? "bg-amber-500" :
                    "bg-purple-500"
                  )} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              
              <AccordionContent className="p-0 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {isCurrentBlockOpen && (
                  <div className="p-6 border-t border-gray-200">
                    <div className="mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">{block.screenTitle}</h2>
                      <p className="text-sm text-gray-600 mt-1">
                        Complete all required fields to move forward. Your progress is automatically saved.
                      </p>
                    </div>
                    <BlockComponent
                      blockNumber={block.number}
                      formData={formData}
                      updateFormData={updateFormData}
                      onComplete={handleCompleteBlock}
                      onSaveProgress={handleSaveProgress}
                    />
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      
      {/* Floating help button */}
      <div className="fixed bottom-6 right-6">
        <button 
          type="button"
          aria-label="Get help"
          className="bg-purple-600 text-white rounded-full p-3 shadow-lg hover:bg-purple-700 transition-colors"
        >
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
});

// Add display name for better debugging
ConstitutionWizard.displayName = 'ConstitutionWizard';

export default ConstitutionWizard;