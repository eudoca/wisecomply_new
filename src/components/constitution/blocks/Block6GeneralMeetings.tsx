import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
}

const subSectionsForBlock6: SubSectionData[] = [
  {
    id: '6.01',
    number: '6.01',
    title: 'AGM frequency, notice and business',
    isS26Compulsory: true,
    actReferenceLabel: 'S84-93',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100964.html?search=sw_096be8ed81dce6e4_84_25_se&p=1&sr=2',
    helpText: `ANNUAL GENERAL MEETINGs (AGMs) are a key part of good governance...`,
  },
  {
    id: '6.02',
    number: '6.02',
    title: 'Quorum and voting',
    isS26Compulsory: true,
    actReferenceLabel: 'S84-93',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100964.html?search=sw_096be8ed81dce6e4_84_25_se&p=1&sr=2',
    helpText: `Quorum and voting rules are fundamental to the legitimacy...`,
  },
  {
    id: '6.03',
    number: '6.03',
    title: 'Written resolutions',
    isS26Compulsory: true,
    actReferenceLabel: 'S89',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS238718.html?search=sw_096be8ed81dce6e4_89_25_se&p=1&sr=3',
    helpText: `Holding a general meeting isn\'t always practical...`,
  },
  {
    id: '6.04',
    number: '6.04',
    title: 'Participation methods',
    isS26Compulsory: true,
    actReferenceLabel: 'S84',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100964.html?search=sw_096be8ed81dce6e4_quorum_25_se&p=1',
    helpText: 'Incorporating flexible participation methods...',
  },
  {
    id: '6.05',
    number: '6.05',
    title: 'Meeting chair',
    isS26Compulsory: true,
    actReferenceLabel: 'S87',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100967.html?search=sw_096be8ed81dce6e4_quorum_25_se&p=1&sr=2',
    helpText: 'The chairperson plays a pivotal role...',
  },
  {
    id: '6.06',
    number: '6.06',
    title: "Chair's powers",
    isS26Compulsory: true,
    helpText: 'Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates chairperson powers or elections...',
  },
  {
    id: '6.07',
    number: '6.07',
    title: 'Motions',
    isS26Compulsory: true,
    helpText: 'Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates committee or member motions. This is a constitution-level governance choice.',
  },
  {
    id: '6.08',
    number: '6.08',
    title: 'Meeting minutes',
    isS26Compulsory: true,
    actReferenceLabel: 'S84',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100964.html?search=sw_096be8ed81dce6e4_quorum_25_se&p=1',
    helpText: 'Accurate and accessible meeting minutes are essential...',
  },
  {
    id: '6.09',
    number: '6.09',
    title: 'Special general meetings',
    isS26Compulsory: true,
    helpText: 'Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates special general meetings...',
  },
];

const clause601_part1 = `An ANNUAL GENERAL MEETING shall be held once a year on a date and at a location and/or using any electronic communication determined by the COMMITTEE and consistent with any requirements in the ACT, and the CONSTITUTION relating to the procedure to be followed at GENERAL MEETINGs shall apply.\nThe ANNUAL GENERAL MEETING must be held no later than the earlier of the following:\n• 6 months after the balance date of the Society\n• 15 months after the previous annual meeting.\nThe COMMITTEE shall give all MEMBERs at least `;
const clause601_part2 = ` WORKING DAYS' written NOTICE of any GENERAL MEETING and of the business to be conducted at that GENERAL MEETING.\nThat NOTICE will be addressed to the MEMBER at the contact address notified to the Society and recorded in the Society's register of members.\nThe business of an ANNUAL GENERAL MEETING shall be to—\n• confirm the minutes of the last ANNUAL GENERAL MEETING and any SPECIAL GENERAL MEETING(s) held since the last ANNUAL GENERAL MEETING,\n• adopt the annual report on the operations and affairs of the Society,\n• adopt the COMMITTEE's report on the finances of the Society, and the annual financial statements,\n• set any subscriptions for the current financial year,\n• consider any motions of which prior notice has been given to MEMBERs with notice of the Meeting, and\n• consider any general business.\nThe COMMITTEE must, at each ANNUAL GENERAL MEETING, present the following information:\n• an annual report on the operation and affairs of the Society during the most recently completed accounting period,\n• the annual financial statements for that period, and\n• notice of any disclosures of conflicts of interest made by OFFICERs during that period (including a summary of the matters, or types of matters, to which those disclosures relate).\nThe GENERAL MEETING and its business will not be invalidated simply because one or more MEMBERs do not receive the NOTICE of the GENERAL MEETING.`;

const clause602_part1 = `Only financial MEMBERs may attend, speak and vote at GENERAL MEETINGs"\n• in person, or\n• by a signed original written proxy (an email or copy not being acceptable) in favour of some individual entitled to be present at the meeting and received by, or handed to, the COMMITTEE before the commencement of the GENERAL MEETING, or\n• through the authorised representative of a body corporate as notified to the COMMITTEE, and\n• no other proxy shall be permitted.\nNo GENERAL MEETING may be held unless at least `;
const clause602_part2 = `% \'of\' eligible financial MEMBERs attend throughout the meeting and this will constitute a quorum.\nIf within half an hour after the time appointed for an AGM a quorum is not present, the meeting – if convened upon request of MEMBERs – shall be dissolved. In any other case it shall stand adjourned to the day, time and place determined by the CHAIRPERSON of the Society, and if at such adjourned meeting a quorum is not present those MEMBERs present in person or by proxy shall be deemed to constitute a sufficient quorum.\nA MEMBER is entitled to exercise one vote at any GENERAL MEETING in person or by proxy, and voting at a GENERAL MEETING shall be \n• by voices or by show of hands, or\n• on demand of the chairperson, or \n• of 2 or more MEMBERs present, by secret ballot.\nUnless otherwise required by this CONSTITUTION, all questions shall be decided by a simple majority of those in attendance in person or by proxy and voting at a GENERAL MEETING or voting by remote ballot.\nAny decisions made when a quorum is not present are not valid.`;

const clause603_notAllowed = `Written resolutions may not be passed in lieu of a GENERAL MEETING.`;
const clause603_allowed_part1 = `Written resolutions may be passed in lieu of a GENERAL MEETING and a written resolution is as valid for the purposes of the Act and this CONSTITUTION as if it had been passed at a GENERAL MEETING if it is approved by no less than `;
const clause603_allowed_part2 = `% of the MEMBERs who are entitled to vote on the resolution.\nA written resolution may consist of 1 or more documents in similar form (including letters, electronic mail, or other similar means of communication) each proposed by or on behalf of 1 or more MEMBERs.\nA MEMBER may give their approval to a written resolution by signing the resolution or giving approval to the resolution in any other manner permitted by the CONSTITUTION (for example, by electronic means).`;

const clause604 = `GENERAL MEETINGs may be held at one or more venues by MEMBERs present in person and/or using any real-time audio, audio and visual, or electronic communication that gives each MEMBER a reasonable opportunity to participate.`;
const clause605_part1 = `All GENERAL MEETINGs shall be chaired by the CHAIRPERSON. If the CHAIRPERSON is absent, `;
const clause605_part2 = ` shall chair that meeting.`;
const clause606_part1 = `Any person chairing a GENERAL MEETING has a deliberative and, in the event of a tied vote, `;
const clause606_part2 = ` casting vote.\nAny person chairing a GENERAL MEETING may:\n• with the consent of a simple majority of those present at any GENERAL MEETING adjourn the GENERAL MEETING from time to time and from place to place but no business shall be transacted at any adjourned GENERAL MEETING other than the business left unfinished at the meeting from which the adjournment took place.\n• direct that any person be removed from the GENERAL MEETING who \n  o is not entitled to be present at the GENERAL MEETING, or \n  o is obstructing the business of the GENERAL MEETING, or \n  o is behaving in a disorderly manner, or being abusive, or failing to abide by the directions of the chairperson \n• in the absence of a quorum or in the case of emergency, adjourn the GENERAL MEETING or declare it closed.`;

const clause607a = `The COMMITTEE may propose motions for the Society to vote on (“COMMITTEE Motions”), which shall be notified to MEMBERs with the written NOTICE of the GENERAL MEETING (see 6.01a.)`;
const clause607b_part1 = `Any MEMBER may request that a motion be voted on (“MEMBER's Motion") at a GENERAL MEETING, by giving notice to the SECRETARY or COMMITTEE at least `;
const clause607b_part2 = ` WORKING DAYS before that meeting.\nThe notice must include the proposed motion and the MEMBER's reasons in support of the motion (“MEMBER's Information").\nIf notice of the motion is given to the SECRETARY or COMMITTEE before written NOTICE of the GENERAL MEETING is given to MEMBERs, notice of the motion shall be provided to MEMBERs with the written NOTICE of the GENERAL MEETING.`;
const clause608 = `The COMMITTEE must ensure that minutes are kept of all GENERAL MEETINGs.`;
const clause609_part1 = `SPECIAL GENERAL MEETINGs may be called at any time by the COMMITTEE by resolution.\nSPECIAL GENERAL MEETINGs must be called if by written request made to the COMMITTEE and signed by at least `;
const clause609_part2 = `% of eligible financial MEMBERs.\nThe rules in this CONSTITUTION relating to the procedure to be followed at GENERAL MEETINGs shall apply to a SPECIAL GENERAL MEETING, and a SPECIAL GENERAL MEETING shall only consider and deal with the business specified in the COMMITTEE's resolution or the written request by MEMBERs for the Meeting.`;

const Block6GeneralMeetings: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => { updateFormData(field, checked === true); };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => { const num = parseInt(value, 10); updateFormData(field, isNaN(num) ? undefined : num); };
  const handleTextInputChange = (field: keyof typeof formData, value: string) => { updateFormData(field, value); };
  const handleWrittenResolutionOptionChange = (value: string) => {
    updateFormData('block6_03_writtenResolutionsOption', value as 'notAllowed' | 'allowed');
    if (value === 'notAllowed') {
      updateFormData('block6_03_writtenResolutionPercentage', undefined);
    }
  };
  
  // Add a handler for the chair's casting vote dropdown
  const handleChairCastingVoteChange = (value: string) => {
    updateFormData('block6_06_chairHasCastingVote', value);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock6.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">{subSection.number} {subSection.title}</h3>
            <div className="flex items-center space-x-2">
              <span className={cn("flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border", subSection.isS26Compulsory ? "bg-[#8065F2] text-white border-[#8065F2]" : "bg-gray-200 text-gray-500 border-gray-300")} title={subSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}>S26</span>
              {subSection.actReferenceLabel && subSection.actReferenceLink && (
                <a href={subSection.actReferenceLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors" title={`View ${subSection.actReferenceLabel} in the Act`}>{subSection.actReferenceLabel}<ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" /></a>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="pl-1 space-y-3">
            <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
              <AccordionItem value={`help-${subSection.id}`} className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{subSection.helpText.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
            </Accordion>

            {subSection.id === '6.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_01_includeAgmRequirementsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_01_includeAgmRequirementsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">AGM Frequency, Notice and Business</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause601_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Input type="number" value={formData.block6_01_agmNoticeDays === undefined ? '' : formData.block6_01_agmNoticeDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block6_01_agmNoticeDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause601_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.02' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_02_includeQuorumVotingClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_02_includeQuorumVotingClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Quorum and Voting</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause602_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Input type="number" value={formData.block6_02_quorumPercentage === undefined ? '' : formData.block6_02_quorumPercentage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block6_02_quorumPercentage', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" />
                    {clause602_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.03' && (
              <>
                <RadioGroup value={formData.block6_03_writtenResolutionsOption} onValueChange={handleWrittenResolutionOptionChange} className="space-y-2 pt-1">
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="notAllowed" id={`${subSection.id}-notAllowed`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-notAllowed`} className="flex-1 text-sm font-normal text-gray-700 whitespace-pre-line">
                      <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Written Resolutions - Not Allowed</h4>
                      <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                        <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                          {clause603_notAllowed.split(/\n+/).map((line, idx) => {
                            const trimmedLine = line.trim(); 
                            if (trimmedLine === "") return null;
                            
                            if (trimmedLine.startsWith('•')) { 
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">&bull;</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              ); 
                            } else if (trimmedLine.startsWith('o')) {
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">○</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              );
                            }
                            
                            return (
                              <div 
                                key={idx} 
                                className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                                dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                              />
                            );
                          })}
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="allowed" id={`${subSection.id}-allowed`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-allowed`} className="flex-1 text-sm font-normal text-gray-700">
                      <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Written Resolutions - Allowed</h4>
                      <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                        <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                          {clause603_allowed_part1.split(/\n+/).map((line, idx) => {
                            const trimmedLine = line.trim(); 
                            if (trimmedLine === "") return null;
                            
                            if (trimmedLine.startsWith('•')) { 
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">&bull;</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              ); 
                            } else if (trimmedLine.startsWith('o')) {
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">○</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              );
                            }
                            
                            return (
                              <div 
                                key={idx} 
                                className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                                dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                              />
                            );
                          })}
                          <Input 
                            type="number" 
                            value={formData.block6_03_writtenResolutionPercentage === undefined ? '' : formData.block6_03_writtenResolutionPercentage} 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block6_03_writtenResolutionPercentage', e.target.value)} 
                            className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2" 
                          />
                          {clause603_allowed_part2.split(/\n+/).map((line, idx) => {
                            const trimmedLine = line.trim(); 
                            if (trimmedLine === "") return null;
                            
                            if (trimmedLine.startsWith('•')) { 
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">&bull;</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              ); 
                            } else if (trimmedLine.startsWith('o')) {
                              return (
                                <div 
                                  key={idx} 
                                  className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                                >
                                  <span className="mr-1 text-violet-400">○</span>
                                  <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                                </div>
                              );
                            }
                            
                            return (
                              <div 
                                key={idx} 
                                className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                                dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                              />
                            );
                          })}
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </>
            )}

            {subSection.id === '6.04' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_04_includeParticipationMethodsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_04_includeParticipationMethodsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Participation Methods</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause604.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.05' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_05_includeMeetingChairClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_05_includeMeetingChairClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Meeting Chair</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause605_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Input type="text" placeholder="e.g., the DEPUTY CHAIRPERSON..." value={formData.block6_05_absentChairpersonReplacement || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange('block6_05_absentChairpersonReplacement', e.target.value)} className="inline-block w-auto min-w-[250px] h-7 px-2 text-xs mx-1 align-baseline bg-white placeholder-gray-400 placeholder:italic" />
                    {clause605_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.06' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_06_includeChairPowersClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_06_includeChairPowersClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Chair's Powers</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause606_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Select
                      value={formData.block6_06_chairHasCastingVote || ""}
                      onValueChange={handleChairCastingVoteChange}
                    >
                      <SelectTrigger className="inline-block w-16 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="a">a</SelectItem>
                        <SelectItem value="no">no</SelectItem>
                      </SelectContent>
                    </Select>
                    {clause606_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {subSection.id === '6.07' && (
              <>
                {/* Part A: Committee Motions */}
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClauseA`} checked={!!formData.block6_07a_includeCommitteeMotionsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_07a_includeCommitteeMotionsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClauseA`} className="text-sm font-normal leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Committee Motions</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause607a.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
                
                {/* Part B: Member's Motions */}
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClauseB`} checked={!!formData.block6_07b_includeMemberMotionsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_07b_includeMemberMotionsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClauseB`} className="text-sm font-normal leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Member's Motions</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause607b_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Input type="number" value={formData.block6_07b_memberMotionNoticeDays === undefined ? '' : formData.block6_07b_memberMotionNoticeDays} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block6_07b_memberMotionNoticeDays', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white" />
                    {clause607b_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.08' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_08_includeMinutesClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_08_includeMinutesClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Meeting Minutes</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause608.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '6.09' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block6_09_includeSgmClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block6_09_includeSgmClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Special General Meetings</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause609_part1.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                    <Input type="number" value={formData.block6_09_sgmRequestPercentage === undefined ? '' : formData.block6_09_sgmRequestPercentage} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block6_09_sgmRequestPercentage', e.target.value)} className="inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white" />
                    {clause609_part2.split(/\n+/).map((line, idx) => {
                      const trimmedLine = line.trim(); 
                      if (trimmedLine === "") return null;
                      
                      if (trimmedLine.startsWith('•')) { 
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                          >
                            <span className="mr-1 text-violet-400">&bull;</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        ); 
                      } else if (trimmedLine.startsWith('o')) {
                        return (
                          <div 
                            key={idx} 
                            className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                          >
                            <span className="mr-1 text-violet-400">○</span>
                            <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={idx} 
                          className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`}
                          dangerouslySetInnerHTML={{ __html: trimmedLine }} 
                        />
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {!['6.01', '6.02', '6.03', '6.04', '6.05', '6.06', '6.07', '6.08', '6.09'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
            <div className="flex justify-end mt-4"><button onClick={() => console.log(`Update constitution for ${subSection.number}. Data:`, formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button></div>
          </div>
        </div>
      ))}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button onClick={() => onSaveProgress(blockNumber)} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Progress</button>
        <button onClick={() => onComplete(blockNumber)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">Mark Block as Complete</button>
      </div>
    </div>
  );
};
export default Block6GeneralMeetings; 