import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea"; // For 8.02 custom description

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
}

const subSectionsForBlock8: SubSectionData[] = [
  {
    id: '8.01',
    number: '8.01',
    title: 'Meanings of disputes and complaints',
    isS26Compulsory: false,
    actReferenceLabel: 'S38-44',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS532560.html?search=sw_096be8ed81dce6e4_38_25_se&p=1',
    helpText: `A dispute means a conflict involving the Society or MEMBERs about specific allegations...`,
  },
  {
    id: '8.02',
    number: '8.02',
    title: 'Complaint Procedures',
    isS26Compulsory: true,
    actReferenceLabel: 'S38-44',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS532560.html?search=sw_096be8ed81dce6e4_38_25_se&p=1',
    helpText: `When your society incorporates or reregisters under the Act, it must have dispute resolution processes documented...`,
  },
  {
    id: '8.03',
    number: '8.03',
    title: 'Types of dispute resolution',
    isS26Compulsory: false,
    actReferenceLabel: 'S38-44',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS532560.html?search=sw_096be8ed81dce6e4_38_25_se&p=1',
    helpText: `Some societies prefer to resolve disputes through formal hearings...`,
  },
];

const clause801 = `A dispute is a disagreement or conflict involving the Society and/or its MEMBERs in relation to specific allegations set out below... [FULL TEXT FROM USER PROMPT] ...Where mediation or arbitration is agreed on, the parties will sign a suitable mediation or arbitration agreement.`;

const safeHarbourClauses = [
  {
    id: 'howComplaintMade',
    title: '1. How complaint is made',
    text: `(1) A member or an officer may make a complaint by giving to the committee (or a complaints subcommittee) a notice in writing that—
• states that the member or officer is starting a procedure for resolving a dispute in accordance with the society's constitution; and
• sets out the allegation to which the dispute relates and whom the allegation is against; and
• sets out any other information reasonably required by the society.
(2) The society may make a complaint involving an allegation against a member or an officer by giving to the member or officer a notice in writing that—
• states that the society is starting a procedure for resolving a dispute in accordance with the society's constitution; and
• sets out the allegation to which the dispute relates.
(3) The information given under subclause (1)(b) or (2)(b) must be enough to ensure that a person against whom an allegation is made is fairly advised of the allegation concerning them, with sufficient details given to enable them to prepare a response.
(4) A complaint may be made in any other reasonable manner permitted by the society's constitution.`
  },
  {
    id: 'investigatingDispute',
    title: '2. Investigating and determining dispute',
    text: `(1) A society must, as soon as is reasonably practicable after receiving or becoming aware of a complaint made in accordance with its constitution, ensure that the dispute is investigated and determined.
(2) Disputes must be dealt with under the constitution in a fair, efficient, and effective manner.`
  },
  {
    id: 'rightToBeHeard',
    title: '3. Person who makes complaint has right to be heard',
    text: `(1) A member or an officer who makes a complaint has a right to be heard before the complaint is resolved or any outcome is determined.
(2) If the society makes a complaint,—
(a) the society has a right to be heard before the complaint is resolved or any outcome is determined; and
(b) an officer may exercise that right on behalf of the society.
(3) Without limiting the manner in which the member, officer, or society may be given the right to be heard, they must be taken to have been given the right if—
(a) they have a reasonable opportunity to be heard in writing or at an oral hearing (if one is held); and
(b) an oral hearing is held if the decision maker considers that an oral hearing is needed to ensure an adequate hearing; and
(c) an oral hearing (if any) is held before the decision maker.`
  },
  {
    id: 'respondentRight',
    title: '4. Person who is subject of complaint has right to be heard',
    text: `(1) This clause applies if a complaint involves an allegation that a member, an officer, or the society (the respondent)—
(a) has engaged in misconduct; or
(b) has breached, or is likely to breach, a duty under the society's constitution or bylaws or this ACT; or
(c) has damaged the rights or interests of a member or the rights or interests of members generally.
(2) The respondent has a right to be heard before the complaint is resolved or any outcome is determined.
(3) If the respondent is the society, an officer may exercise the right on behalf of the society.
(4) Without limiting the manner in which a respondent may be given a right to be heard, a respondent must be taken to have been given the right if—
(a) the respondent is fairly advised of all allegations concerning the respondent, with sufficient details and time given to enable the respondent to prepare a response; and
(b) the respondent has a reasonable opportunity to be heard in writing or at an oral hearing (if one is held); and
(c) an oral hearing is held if the decision maker considers that an oral hearing is needed to ensure an adequate hearing; and
(d) an oral hearing (if any) is held before the decision maker; and
(e) the respondent's written statement or submissions (if any) are considered by the decision maker.`
  },
  {
    id: 'investigatingDispute2',
    title: '5. Investigating and determining dispute',
    text: `(1) A society must, as soon as is reasonably practicable after receiving or becoming aware of a complaint made in accordance with its constitution, ensure that the dispute is investigated and determined.
(2) Disputes must be dealt with under the constitution in a fair, efficient, and effective manner.
Society may decide not to proceed further with complaint
Despite clause 5, a society may decide not to proceed further with a complaint if—
(a) the complaint is trivial; or
(b) the complaint does not appear to disclose or involve any allegation of the following kind:
(i) that a member or an officer has engaged in material misconduct:
(ii) that a member, an officer, or the society has materially breached, or is likely to materially breach, a duty under the society's constitution or bylaws or this ACT:
(iii) that a member's rights or interests or members' rights or interests generally have been materially damaged:
(c) the complaint appears to be without foundation or there is no apparent evidence to support it; or
(d) the person who makes the complaint has an insignificant interest in the matter; or
(e) the conduct, incident, event, or issue giving rise to the complaint has already been investigated and dealt with under the constitution; or
(f) there has been an undue delay in making the complaint.`
  },
  {
    id: 'referComplaint',
    title: '6. Society may refer complaint',
    text: `(1) A society may refer a complaint to—
(a) a subcommittee or an external person to investigate and report; or
(b) a subcommittee, an arbitral tribunal, or an external person to investigate and make a decision.
(2) A society may, with the consent of all parties to a complaint, refer the complaint to any type of consensual dispute resolution (for example, mediation, facilitation, or a tikanga-based practice).`
  },
  {
    id: 'decisionMakers',
    title: '7. Decision makers',
    text: `A person may not act as a decision maker in relation to a complaint if 2 or more members of the committee or a complaints subcommittee consider that there are reasonable grounds to believe that the person may not be—
(a) impartial; or
(b) able to consider the matter without a predetermined view.`
  }
];

const clause803 = `The Society supports the use of different types of dispute resolution, including both consensual methods (such as mediation, facilitation or tikanga-based practices) and determinative methods (such as arbitration under the Arbitration Act 1996), as appropriate to the circumstances... [FULL TEXT FROM USER PROMPT] ...Any dispute resolution process used by the Society must comply with the principles of natural justice.`;

// Extend the ConstitutionFormData type to include our new field
type ConstitutionFormDataWithSafeHarbour = {
  block8_01_includeMeaningsClause?: boolean;
  block8_02_disputeResolutionOption?: 'deviseOwn' | 'safeHarbour';
  block8_02_ownDisputeProcessDescription?: string;
  block8_02_selectedSafeHarbourClauses?: string[];
  block8_03_includeTypesOfResolutionClause?: boolean;
  [key: string]: any;
};

const Block8Disputes: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  // Use type assertion to add the new field to the existing formData
  const typedFormData = formData as ConstitutionFormDataWithSafeHarbour;
  const typedUpdateFormData = updateFormData as (field: keyof ConstitutionFormDataWithSafeHarbour, value: any) => void;

  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  
  const handleSafeHarbourClauseChange = (clauseId: string, checked: boolean | 'indeterminate') => {
    const currentSafeHarbourClauses = typedFormData.block8_02_selectedSafeHarbourClauses || [];
    
    if (checked === true && !currentSafeHarbourClauses.includes(clauseId)) {
      typedUpdateFormData('block8_02_selectedSafeHarbourClauses', [...currentSafeHarbourClauses, clauseId]);
    } else if (checked === false && currentSafeHarbourClauses.includes(clauseId)) {
      typedUpdateFormData('block8_02_selectedSafeHarbourClauses', 
        currentSafeHarbourClauses.filter((id: string) => id !== clauseId));
    }
  };

  const handleDisputeResolutionOptionChange = (value: string) => {
    updateFormData('block8_02_disputeResolutionOption', value as 'deviseOwn' | 'safeHarbour');
    if (value === 'safeHarbour') {
      updateFormData('block8_02_ownDisputeProcessDescription', ''); // Clear custom description if safe harbour chosen
    }
  };

  // Helper function to check if a safe harbour clause is selected
  const isSafeHarbourClauseSelected = (clauseId: string): boolean => {
    const selectedClauses = typedFormData.block8_02_selectedSafeHarbourClauses || [];
    return selectedClauses.includes(clauseId);
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock8.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">{subSection.number} {subSection.title}</h3>
            <div className="flex items-center space-x-2">
              <span 
                className={cn(
                  "flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium border",
                  subSection.isS26Compulsory 
                    ? "bg-[#8065F2] text-white border-[#8065F2]" 
                    : "bg-gray-200 text-gray-500 border-gray-300"
                )}
                title={subSection.isS26Compulsory ? "Compulsory under Section 26 ISA 2022" : "Not compulsory under Section 26 ISA 2022"}
              >
                S26
              </span>
              {subSection.actReferenceLabel && subSection.actReferenceLink && (
                <a 
                  href={subSection.actReferenceLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                  title={`View ${subSection.actReferenceLabel} in the Act`}
                >
                  {subSection.actReferenceLabel}
                  <ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" />
                </a>
              )}
            </div>
          </div>
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

            {subSection.id === '8.01' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block8_01_includeMeaningsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block8_01_includeMeaningsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Meanings of Disputes and Complaints</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause801.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '8.02' && (
              <>
                <RadioGroup value={formData.block8_02_disputeResolutionOption} onValueChange={handleDisputeResolutionOptionChange} className="space-y-2 pt-1">
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="deviseOwn" id={`${subSection.id}-deviseOwn`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-deviseOwn`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society will devise its own dispute resolution processes that are consistent with the principles of natural justice
                      {formData.block8_02_disputeResolutionOption === 'deviseOwn' && (
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-gray-600">Describe the dispute resolution steps your Society will follow — including how complaints will be raised, how parties will be heard, how decisions will be made and how natural justice will be upheld.</p>
                          <Textarea className="w-full p-2 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic text-sm bg-white" rows={5}/>
                        </div>
                      )}
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="safeHarbour" id={`${subSection.id}-safeHarbour`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-safeHarbour`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society will adopt the 'safe harbour' processes under section 41 and Schedule 2 of the Act. 
                      {formData.block8_02_disputeResolutionOption === 'safeHarbour' && (
                        <>
                          <p className="text-sm mt-2 text-gray-700">Select which safe harbour clauses to include:</p>
                          <div className="mt-2 space-y-3">
                            {safeHarbourClauses.map((clause) => (
                              <div key={clause.id} className="space-y-2">
                                <div className="flex items-start space-x-2">
                                  <Checkbox 
                                    id={`safe-harbour-${clause.id}`}
                                    checked={isSafeHarbourClauseSelected(clause.id)}
                                    onCheckedChange={(checked: boolean | 'indeterminate') => handleSafeHarbourClauseChange(clause.id, checked)}
                                    className="mt-1"
                                  />
                                  <Label 
                                    htmlFor={`safe-harbour-${clause.id}`} 
                                    className="text-sm font-medium text-gray-700"
                                  >
                                    {clause.title}
                                  </Label>
                                </div>
                                
                                {isSafeHarbourClauseSelected(clause.id) && (
                                  <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 ml-6">
                                    <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                                      {clause.text.split(/\n+/).map((line, idx) => {
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
                                        } else if (trimmedLine.startsWith('(')) {
                                          // For lines starting with parenthetical notation like (1), (2), etc.
                                          return (
                                            <div 
                                              key={idx} 
                                              className="block text-xs text-gray-700 font-normal leading-snug pl-0 mt-1"
                                            >
                                              <span dangerouslySetInnerHTML={{ __html: trimmedLine }} />
                                            </div>
                                          );
                                        } else if (trimmedLine.startsWith('(a)') || trimmedLine.startsWith('(b)') || 
                                                  trimmedLine.startsWith('(c)') || trimmedLine.startsWith('(d)') || 
                                                  trimmedLine.startsWith('(e)') || trimmedLine.startsWith('(f)')) {
                                          // For lines starting with letter parenthetical notation (a), (b), etc.
                                          return (
                                            <div 
                                              key={idx} 
                                              className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1"
                                            >
                                              <span dangerouslySetInnerHTML={{ __html: trimmedLine }} />
                                            </div>
                                          );
                                        } else if (trimmedLine.startsWith('(i)') || trimmedLine.startsWith('(ii)') || 
                                                  trimmedLine.startsWith('(iii)')) {
                                          // For lines starting with roman numeral parenthetical notation (i), (ii), etc.
                                          return (
                                            <div 
                                              key={idx} 
                                              className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1"
                                            >
                                              <span dangerouslySetInnerHTML={{ __html: trimmedLine }} />
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
                                )}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </Label>
                  </div>
                </RadioGroup>
              </>
            )}
            {subSection.id === '8.03' && (
              <>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block8_03_includeTypesOfResolutionClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block8_03_includeTypesOfResolutionClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Select this clause to include in your constitution</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Types of Dispute Resolution</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause803.split(/\n+/).map((line, idx) => {
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

            {!['8.01', '8.02', '8.03'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
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
export default Block8Disputes; 