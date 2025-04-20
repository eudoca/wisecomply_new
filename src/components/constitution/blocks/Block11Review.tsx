import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '../../../utils/cn';
import { ConstitutionFormData } from '../ConstitutionWizard';
import { AlertCircleIcon } from 'lucide-react';

// Define the props for the Review component
interface Block11ReviewProps {
    formData: ConstitutionFormData;
    // Add confirmation state/handler props from parent if needed
    // isConfirmed: boolean;
    // onConfirmChange: (confirmed: boolean) => void;
    // onGenerate?: () => void;
}

// Helper to display boolean values nicely
const formatBoolean = (value: boolean | null | undefined): string => {
    if (value === true) return 'Yes';
    if (value === false) return 'No';
    return 'Not specified';
};

// Helper to display array values
const formatArray = (value: string[] | undefined | null): string => {
    if (!value || value.length === 0) return 'None specified';
    return value.join(', ');
};

// Helper to display potentially undefined/null values or empty strings
const formatValue = (value: any): string | JSX.Element => {
    if (value === undefined || value === null || value === '') return <span className="text-gray-500 italic">Not specified</span>;
    if (typeof value === 'boolean') return formatBoolean(value);
    if (Array.isArray(value)) return formatArray(value);
    // Handle number values that might be 0
    if (typeof value === 'number') return String(value);
    // For strings, return as is (already checked for empty)
    if (typeof value === 'string') return value;
    // Fallback for other types
    return String(value);
};

// Simple display component for a key-value pair in the review
const ReviewItem: React.FC<{ label: string; value: any }> = ({ label, value }) => (
    <div className="mb-2 grid grid-cols-3 gap-4 border-b border-gray-100 pb-2">
        <dt className="text-sm font-medium text-gray-500 col-span-1">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900 col-span-2">{formatValue(value)}</dd>
    </div>
);

export const Block11Review: React.FC<Block11ReviewProps> = ({ formData }) => {

    // Confirmation state would likely live in the parent ConstitutionWizard
    // and be passed down if the button enablement depends on it.

    return (
        <div className="border border-gray-300 rounded-lg p-6 mb-6 bg-white shadow-sm">
            {/* Removed H3 heading */}
            {/* <h3 className="text-lg font-semibold mb-4 text-gray-800">Review & Generate</h3> */}
            <p className="mb-6 text-sm text-gray-600">Please carefully review all the details you have entered below. Ensure everything is correct before proceeding to generate the constitution document. You can click on a block title to expand/collapse it.</p>

            {/* Render summaries for each block using <details> for collapsibility */} 
            <div className="space-y-4">

                 {/* Block 1 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group" open>
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 1: Foundation & Identity
                         <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                     </summary>
                     <dl className="mt-4 space-y-2">
                         <ReviewItem label="Society Name" value={formData.block1_societyName} />
                         <ReviewItem label="Society Purposes" value={formData.block1_societyPurposes} />
                         <ReviewItem label="Charitable Status" value={formData.block1_charitableStatus} />
                         {formData.block1_charitableStatus === 'Yes' && <ReviewItem label="Charitable Purpose Details" value={formData.block1_charitablePurposeDetails} /> }
                         <ReviewItem label="Office/Meeting Location" value={formData.block1_specifyOfficeMethod === true ? `Method Specified: ${formData.block1_officeMethodText || 'Not specified'}` : `Primary Location: ${formData.block1_meetingLocation || 'Not specified'}`} />
                         <ReviewItem label="Include Definitions Section?" value={formData.block1_includeDefinitions} />
                     </dl>
                 </details>

                 {/* Block 2 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 2: Membership
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                     </summary>
                     <dl className="mt-4 space-y-2">
                        <ReviewItem label="Membership Open?" value={formData.block2_membershipOpen}/>
                        {formData.block2_membershipOpen === 'No' && <ReviewItem label="Membership Criteria" value={formData.block2_membershipCriteria}/>}
                        <ReviewItem label="Application Steps" value={formData.block2_applicationSteps}/>
                        <ReviewItem label="Application Consent Method" value={formData.block2_consentMethod}/>
                        <ReviewItem label="Approving Body" value={formData.block2_approvingBody}/>
                        <ReviewItem label="Can Refuse Membership?" value={formData.block2_canRefuseMembership}/>
                        <ReviewItem label="Fee Setting Method" value={formData.block2_feeSettingMethod}/>
                        <ReviewItem label="Fee Due Date" value={formData.block2_feeDueDate}/>
                        <ReviewItem label="Non-Payment Consequence" value={formData.block2_nonPaymentConsequence}/>
                        <ReviewItem label="Resignation Steps" value={formData.block2_resignationSteps}/>
                        <ReviewItem label="Termination Grounds" value={formData.block2_terminationGrounds}/>
                        <ReviewItem label="Register Maintainer" value={formData.block2_registerMaintainer}/>
                     </dl>
                 </details>

                 {/* Block 3 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                      <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 3: Governance - Committee
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                     </summary>
                     <dl className="mt-4 space-y-2">
                        <ReviewItem label="Committee Size" value={`Min ${formatValue(formData.block3_committeeMinSize)}, Max ${formatValue(formData.block3_committeeMaxSize)}`}/>
                        <ReviewItem label="Officer Roles" value={formData.block3_officerRoles}/>
                        <ReviewItem label="Election Method" value={formData.block3_electionMethod}/>
                        <ReviewItem label="Term of Office" value={formData.block3_termOfOffice}/>
                        <ReviewItem label="Meeting Frequency" value={formData.block3_meetingFrequency}/>
                        <ReviewItem label="Committee Quorum" value={`${formatValue(formData.block3_committeeQuorumValue)}${formData.block3_committeeQuorumType === 'percentage' ? '%' : ' members'}`}/>
                        <ReviewItem label="Committee Chair" value={formData.block3_committeeChair}/>
                        <ReviewItem label="Chair Has Casting Vote?" value={formData.block3_chairCastingVote}/>
                        <ReviewItem label="Removal Grounds" value={formData.block3_removalGrounds}/>
                        <ReviewItem label="Conflict of Interest Method" value={formData.block3_conflictOfInterestMethod}/>
                        <ReviewItem label="Contact Person Appointment" value={formData.block3_contactPersonAppointment}/>
                     </dl>
                 </details>

                 {/* Block 4 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                        Block 4: General Meetings
                         <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                     <dl className="mt-4 space-y-2">
                         <ReviewItem label="AGM Timing" value={formData.block4_agmTiming} />
                         <ReviewItem label="AGM Notice Period (Days)" value={formData.block4_agmNoticePeriod} />
                         <ReviewItem label="GM Quorum" value={`${formatValue(formData.block4_meetingQuorumValue)}${formData.block4_meetingQuorumType === 'percentage' ? '%' : ' members'}`} />
                         <ReviewItem label="GM Chairperson" value={formData.block4_chairperson} />
                         <ReviewItem label="Chair Has Casting Vote (GM)?" value={formData.block4_chairCastingVoteGm} />
                         <ReviewItem label="Voting Rights" value={formData.block4_votingRights} /> // Note: Needs update if block4_votingRights isn't the final key
                         <ReviewItem label="Voting Methods" value={formData.block4_votingMethods} />
                         <ReviewItem label="Proxies Allowed?" value={formData.block4_proxyAllowed} />
                         <ReviewItem label="SGM Trigger Method(s)" value={formData.block4_sgmTriggerMethod} /> // Note: Needs update if block4_sgmTriggerMethod isn't the final key
                         <ReviewItem label="Minutes Recorded?" value={formData.block4_minutesRecorded} />
                     </dl>
                 </details>

                 {/* Block 6 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                        Block 6: Amendments & Bylaws
                         <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                     </summary>
                     <dl className="mt-4 space-y-2">
                        <ReviewItem label="Amendment Procedure" value={formData.block6_amendmentProcedure}/>
                        <ReviewItem label="Has Common Seal?" value={formData.block6_hasCommonSeal}/>
                        {formData.block6_hasCommonSeal && <ReviewItem label="Seal Custody" value={formData.block6_commonSealCustody}/>}
                        {formData.block6_hasCommonSeal && <ReviewItem label="Seal Use" value={formData.block6_commonSealUse}/>}
                        <ReviewItem label="Committee Can Make Bylaws?" value={formData.block6_committeeCanMakeBylaws}/>
                     </dl>
                 </details>

                  {/* Block 7 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 7: Disputes & Notices
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                     <dl className="mt-4 space-y-2">
                         <ReviewItem label="Dispute Procedure Approach" value={formData.block7_disputeProcedure} />
                          {/* Conditionally show details based on approach */} 
                         <ReviewItem label="Include Notices Clause?" value={formData.block7_includeNoticesClause} />
                          {formData.block7_includeNoticesClause && <ReviewItem label="Notices Clause Text" value={formData.block7_noticesClauseText} />}
                         <ReviewItem label="Include Indemnity Clause?" value={formData.block7_includeIndemnityClause} />
                         <ReviewItem label="Committee Can Arrange Insurance?" value={formData.block7_committeeCanArrangeInsurance} />
                     </dl>
                 </details>

                 {/* Block 8 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 8: Finances
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                     </summary>
                     <dl className="mt-4 space-y-2">
                        <ReviewItem label="Financial Year End" value={formData.block8_financialYearEnd}/>
                        <ReviewItem label="Bank Account Required?" value={formData.block8_bankAccountRequired}/>
                        {formData.block8_bankAccountRequired && <ReviewItem label="Authorised Signatories" value={formData.block8_whoSignsCheques}/>}
                        {formData.block8_bankAccountRequired && <ReviewItem label="Minimum Signatories Required" value={formData.block8_minSignatories}/>}
                        <ReviewItem label="Borrowing Powers" value={formData.block8_borrowingPowers}/>
                        {(formData.block8_borrowingPowers !== 'none' && formData.block8_borrowingPowers) && <ReviewItem label="Borrowing Limit ($)" value={formData.block8_borrowingLimit}/>}
                        <ReviewItem label="Use of Funds/Property" value={formData.block8_propertyAndFundsUsage}/>
                     </dl>
                 </details>

                 {/* Block 9 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                      <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 9: Dissolution
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                     <dl className="mt-4 space-y-2">
                        <ReviewItem label="Dissolution Trigger" value={formData.block9_dissolutionTrigger}/>
                         {formData.block9_dissolutionTrigger === 'member_request' && <ReviewItem label="Member Request Threshold" value={`${formatValue(formData.block9_dissolutionMemberRequestPercent)}% or ${formatValue(formData.block9_dissolutionMemberRequestNumber)} members`} />}
                        <ReviewItem label="Meeting Type for Vote" value={formData.block9_dissolutionMeetingType}/>
                        <ReviewItem label="Vote Threshold" value={formData.block9_dissolutionVoteThreshold}/>
                        <ReviewItem label="Dissolution Quorum Override" value={formData.block9_dissolutionQuorumType ? `${formatValue(formData.block9_dissolutionQuorumValue)} (${formData.block9_dissolutionQuorumType})` : 'Use Standard GM Quorum'}/>
                        <ReviewItem label="Surplus Asset Distribution" value={formData.block5_windingUpDistribution}/>
                         {(formData.block5_windingUpDistribution === 'specified_org' || formData.block5_windingUpDistribution === 'Other (specify)') && <ReviewItem label="Distribution Details" value={formData.block5_windingUpDistributionOther} />}
                     </dl>
                 </details>

                {/* Block 10 Summary */}
                 <details className="bg-slate-50 p-4 rounded border border-slate-200 group">
                     <summary className="font-semibold cursor-pointer list-none flex justify-between items-center">
                         Block 10: Transitional Provisions
                          <span className="text-gray-500 text-sm group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                     <dl className="mt-4 space-y-2">
                         <ReviewItem label="Replacing Existing Constitution?" value={formData.block10_isReplacingConstitution} />
                          {formData.block10_isReplacingConstitution && <ReviewItem label="Include Transitional Provisions?" value={formData.block10_includeTransitionalProvisions} />}
                          {(formData.block10_isReplacingConstitution && formData.block10_includeTransitionalProvisions) && <ReviewItem label="Transitional Provisions Text" value={formData.block10_transitionalProvisionsText} />}
                     </dl>
                 </details>

            </div>

            {/* Confirmation & Generate Button - Functionality requires parent state/handlers */} 
             <div className="mt-8 pt-6 border-t border-gray-200">
                 <div className="flex items-start mb-4">
                     <input
                         id="confirmation-checkbox"
                         name="confirmation-checkbox"
                         type="checkbox"
                         className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mt-1 cursor-pointer"
                         // checked={isConfirmed} // Controlled by parent
                         // onChange={(e) => onConfirmChange(e.target.checked)} // Notify parent
                     />
                     <label htmlFor="confirmation-checkbox" className="ml-2 block text-sm text-gray-900 cursor-pointer">
                         I have reviewed all the details above and confirm they are correct.
                     </label>
                 </div>

                <Button
                    // onClick={onGenerate}
                    // disabled={!isConfirmed}
                    type="button"
                    className={cn(
                       // !isConfirmed ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700',
                       'bg-green-600 hover:bg-green-700', // Keep enabled for now
                       'text-white font-bold py-2 px-4 rounded w-full sm:w-auto'
                    )}
                >
                    Generate Constitution Document (Preview)
                </Button>
                 <p className="mt-2 text-xs text-gray-500">Note: Generation functionality is not yet implemented.</p>
            </div>
        </div>
    );
};

export default Block11Review; 