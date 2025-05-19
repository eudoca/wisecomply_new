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

const subSectionsForBlock5: SubSectionData[] = [
  {
    id: '5.01',
    number: '5.01',
    title: 'Meeting procedures and frequency',
    isS26Compulsory: true,
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates committee meetings. This is a constitution-level governance choice.\nThe COMMITTEE's meeting arrangements must be detailed in the Society's constitution. This ensures clarity in how meetings will be held, including whether they occur in person, virtually, or through other communication methods like audio or video.\nThe COMMITTEE can meet physically or virtually, as arranged by the CHAIRPERSON or SECRETARY, with all members constituting a quorum participating. This flexibility supports hybrid or remote meeting formats, ensuring the COMMITTEE can function efficiently regardless of location or format.\nFailing to clearly define meeting logistics and procedures can lead to confusion, unintentional breaches of governance standards, and challenges in decision-making. Properly outlined meeting procedures ensure consistent governance and legal compliance.`
  },
  {
    id: '5.02',
    number: '5.02',
    title: 'Quorum requirements',
    isS26Compulsory: true,
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates quorums for committee meetings. This is a constitution-level governance choice.\nThe quorum for COMMITTEE meetings ensures that decisions are made by a sufficient number of members, reflecting the legitimate governance of the Society. Setting a quorum ensures meetings are valid, preventing a small group from making decisions that affect the broader membership.\nThe quorum for COMMITTEE meetings is defined as at least [half, two-thirds] the number of COMMITTEE members. The CONSTITUTION should specify the exact number required for decisions to be valid and to maintain fairness in the decision-making process.\nIf the quorum is not met, decisions cannot be made. This ensures that no major decisions are taken by too few people, preserving the integrity of the Society's governance and preventing the risk of decisions being dominated by a small group.`
  },
  {
    id: '5.03',
    number: '5.03',
    title: 'Voting procedures',
    isS26Compulsory: true,
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates quorums for committee meetings. This is a constitution-level governance choice.\nEach COMMITTEE member has one equal vote to ensure fair and democratic decision-making. This promotes fairness, equality, and avoids undue influence by giving all members an equal say. It guarantees that decisions reflect the collective will of the COMMITTEE, with no special privileges for individual members unless specified.\nA resolution passes when the majority of votes cast are in favour of the decision. Every OFFICER on the COMMITTEE has one vote. Voting can take place via voice, show of hands, or ballot, depending on the circumstances.\nThe decision is only valid if the majority supports it. If voting is done by show of hands or ballot, it ensures that the process is flexible to the situation at hand. It prevents any one individual from having undue control over the decision-making process.`
  },
  {
    id: '5.04',
    number: '5.04',
    title: 'Casting vote of the chair',
    isS26Compulsory: true,
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates casting vote of the chair. This is a constitution-level governance choice.\nWhen your committee votes on a decision, there may be situations where the votes are tied. How your society handles these ties - especially whether the Chair can break the deadlock - needs to be set out clearly in your constitution.\nYou're being asked to decide whether the Chair of your committee will have a casting vote (a second, deciding vote) in the event of a tie. If you allow it, the Chair can make the final call; if you don't, the motion simply fails.\nThis choice affects the balance of decision-making power in your committee. Giving the Chair a casting vote can help keep things moving, but it also places significant authority in one person's hands. The Act lets societies choose either option - just make sure the rule is clearly stated.`
  },
];

const clause501_part1 = `The COMMITTEE shall meet `;
const clause501_part2 = ` and in such places and in such manner (including by audio, audio and visual, or electronic communication) as it may determine and otherwise where and as convened by the CHAIRPERSON or SECRETARY.\nA meeting of the COMMITTEE may be held either:\n• by a number of the members of the COMMITTEE who constitute a quorum, being assembled together at the place, date and time appointed for the meeting; or\n• by means of audio, or audio and visual, communication by which all members of the COMMITTEE participating and constituting a quorum can simultaneously engage as required throughout the meeting.\nThe SECRETARY, or other COMMITTEE member nominated by the COMMITTEE, shall give to all COMMITTEE members not less than 5 WORKING DAYS' notice of COMMITTEE meetings, but in cases of urgency a shorter period of notice shall suffice.`;

const clause502_part1 = `The quorum for COMMITTEE meetings is at least `;
const clause502_part2 = `.`;

const clause503 = `A resolution of the COMMITTEE is passed at any meeting of the COMMITTEE if a majority of the votes cast on it are in favour of the resolution. Every OFFICER on the COMMITTEE shall have one vote.\nExcept as otherwise provided in this CONSTITUTION, the COMMITTEE may regulate its own procedure.\nThe members of the COMMITTEE shall elect one of their number as chairperson of the COMMITTEE. \nIf at a meeting of the COMMITTEE, the chairperson is not present, the members of the COMMITTEE present may choose one of their number to be chairperson of the meeting. \nThe chairperson shall or shall not have a casting vote in accordance with the CONSTITUTION (see 5.04a).`;

const Block5CommitteeMeetings: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleTextInputChange = (field: keyof typeof formData, value: string) => {
    updateFormData(field, value);
  };
  const handleCastingVoteChange = (value: string) => {
    updateFormData('block5_04_chairCastingVote', value as 'hasCastingVote' | 'noCastingVote');
  };
  const handleMeetingFrequencyChange = (value: string) => {
    updateFormData('block5_01_meetingFrequency', value);
  };

  // Meeting frequency options
  const meetingFrequencyOptions = [
    { value: "at least once every month", label: "At least once every month" },
    { value: "at least once every two months", label: "At least once every two months" },
    { value: "at least once every quarter", label: "At least once every quarter (3 months)" },
    { value: "at least four times a year", label: "At least four times a year" },
    { value: "at least three times a year", label: "At least three times a year" },
    { value: "at least twice a year", label: "At least twice a year" },
    { value: "at least once a year", label: "At least once a year" },
    { value: "as required", label: "As required" }
  ];

  return (
    <div className="space-y-6">
      {subSectionsForBlock5.map((subSection) => (
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
              <AccordionItem value={`help-${subSection.id}`} className="border-b-0">
                <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                  {subSection.helpText.split(/\n+/).map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {subSection.id === '5.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block5_01_includeMeetingProceduresClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block5_01_includeMeetingProceduresClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Meeting Procedures and Frequency</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause501_part1.split(/\n+/).map((line, idx) => {
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
                      value={formData.block5_01_meetingFrequency || ""}
                      onValueChange={handleMeetingFrequencyChange}
                    >
                      <SelectTrigger className="inline-block w-auto min-w-[200px] h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm">
                        <SelectValue placeholder="Select meeting frequency..." />
                      </SelectTrigger>
                      <SelectContent>
                        {meetingFrequencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {clause501_part2.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '5.02' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block5_02_includeQuorumClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block5_02_includeQuorumClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Quorum Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause502_part1.split(/\n+/).map((line, idx) => {
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
                    <Input type="text" className="inline-block w-auto min-w-[100px] h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2 placeholder-gray-400 placeholder:italic" />
                    {clause502_part2.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '5.03' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block5_03_includeVotingProceduresClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block5_03_includeVotingProceduresClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Voting Procedures</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause503.split(/\n+/).map((line, idx) => {
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

            {subSection.id === '5.04' && (
              <>
                <RadioGroup 
                  value={formData.block5_04_chairCastingVote}
                  onValueChange={handleCastingVoteChange}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="hasCastingVote" id={`${subSection.id}-hasCastingVote`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-hasCastingVote`} className="flex-1 text-sm font-normal text-gray-700">
                      If there is an equality of votes, the Chair has a casting vote.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="noCastingVote" id={`${subSection.id}-noCastingVote`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-noCastingVote`} className="flex-1 text-sm font-normal text-gray-700">
                      If there is an equality of votes, the Chair does not have a casting vote.
                    </Label>
                  </div>
                </RadioGroup>
              </>
            )}

            {!['5.01', '5.02', '5.03', '5.04'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
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
export default Block5CommitteeMeetings; 