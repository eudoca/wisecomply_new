import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
  helpText: string;
}

const subSectionsForBlock4: SubSectionData[] = [
  {
    id: '4.01',
    number: '4.01',
    title: 'Officer duties',
    isS26Compulsory: false,
    actReferenceLabel: 'S54',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100929.html?search=sw_096be8ed81dce6e4_54_25_se&p=1&sr=1',
    helpText: `OFFICERs must act honestly and in the Society's best interests. This prevents self-serving decisions and ensures alignment with the Society's purpose. OFFICERs cannot use their position for personal gain or allow the Society to act unlawfully.\nOFFICERs must meet an objective "reasonable person" standard. This means acting carefully, with due thought and responsibility. OFFICERs are legally accountable for reckless or careless conduct, especially when the Society's financial wellbeing or compliance is at risk.\nOFFICERs must not agree to commitments the Society cannot meet. This includes financial obligations or risky decisions that could endanger the Society or its creditors. These protections help maintain integrity and trust in the Society's governance.`,
  },
  {
    id: '4.02',
    number: '4.02',
    title: 'Officer qualifications and consent',
    isS26Compulsory: true,
    actReferenceLabel: 'S47',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100915.html?search=sw_096be8ed81dce6e4_47_25_se&p=1&sr=2',
    helpText: `Every officer must formally consent in writing to their appointment and certify that they are not disqualified from holding office. This ensures that all officers are aware of their responsibilities and meet the legal eligibility criteria.\nThe Incorporated Societies Act 2022 specifies that an officer must be a natural person who is not disqualified under section 47(3) of the ACT. Disqualifications include being under 16 years of age, being an undischarged bankrupt, or having certain criminal convictions, among others. Note that being an officer of a charitable entity may affect how certain disqualifications apply.\nMaintaining written records of each officer's consent and certification is essential. These records provide evidence of compliance with legal requirements and support the society's governance integrity.`,
  },
  {
    id: '4.03',
    number: '4.03',
    title: 'Election and appointment of officers',
    isS26Compulsory: true,
    actReferenceLabel: 'S47',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100915.html?search=sw_096be8ed81dce6e4_47_25_se&p=1&sr=2',
    helpText: `Some societies elect officers during the AGM by nominations from the floor. Others gather nominations ahead of time and share information before the meeting. A third option is remote ballot, with voting and nomination managed by post or email.\nEach method lets the society choose how formal and structured the process should be. Floor nominations are flexible. Pre-distributed bios support informed votes. Remote ballots improve access for dispersed members.\nYour choice will affect how far in advance nominations close, who is eligible to vote, and what documents must be sent to members. It also affects how ties are resolved and whether officers can be appointed between elections.`,
  },
  {
    id: '4.04',
    number: '4.04',
    title: 'Terms of office',
    isS26Compulsory: true,
    actReferenceLabel: 'S47',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100915.html?search=sw_096be8ed81dce6e4_47_25_se&p=1&sr=2',
    helpText: `Please note: While this clause must be contained in the constitution per section 26 pf the Act, there is no direct reference in the Act that requires or regulates terms of office. This is a constitution-level governance choice.\nSocieties often want to balance continuity with leadership renewal. That's why it's common to set a fixed term length for OFFICERs and define how many terms someone can serve in a row. This helps prevent burnout and ensures planned turnover.\nThink about how long you want OFFICERs, including the CHAIRPERSON, to serve before needing re-election. You'll need to set a standard term in years, and decide whether to cap the number of consecutive terms or years in certain roles. Be clear and consistent.\nIf you leave this open or poorly defined, you risk leaders staying in place indefinitely, which can lead to stagnation, power imbalances or disputes. Term limits make it easier to bring in new voices and reduce governance risk.`,
  },
  {
    id: '4.05',
    number: '4.05',
    title: 'Cessation of office',
    isS26Compulsory: true,
    actReferenceLabel: 'S50',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100924.html?search=sw_096be8ed81dce6e4_50_25_se&p=1&sr=3',
    helpText: `An OFFICER ceases to hold office when they resign (by notice in writing to the COMMITTEE), are removed, die, or otherwise vacate office in accordance with section 50(1) of the ACT. The Society must also have clear procedures for what happens when OFFICERs leave, to ensure governance continuity.\nOFFICERs stop being in office if they resign, are removed, die, or otherwise vacate their position under the ACT. This clause sets clear expectations about how and when an OFFICER's term ends, ensuring the process aligns with legal requirements and protecting governance stability.\nThe rule ensures that when an OFFICER leaves, the Society has a formal process in place for transition and accountability. This includes the return of all Society property and books, safeguarding the Society's assets and ensuring that governance is not disrupted when OFFICERs leave.`,
  },
  {
    id: '4.06',
    number: '4.06',
    title: 'Grounds for removal',
    isS26Compulsory: true,
    actReferenceLabel: 'S50',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100924.html?search=sw_096be8ed81dce6e4_50_25_se&p=1&sr=3',
    helpText: `An OFFICER can be removed from their position for various reasons, including failure to attend meetings, conflicts of interest, or bringing the Society into disrepute. These grounds are crucial for ensuring accountability and maintaining good governance within the Society.\nThe grounds for removal include repeated absence from meetings without permission, failure to disclose conflicts of interest, damaging the Society's reputation, and a no-confidence vote from the COMMITTEE. The constitution should clearly define these grounds to ensure transparency and fairness.\nIf these grounds are met, an OFFICER can be removed from their position. This ensures that the Society can address leadership issues promptly and effectively. Properly defined removal grounds also protect the Society's reputation and legal standing.`,
  },
  {
    id: '4.07',
    number: '4.07',
    title: 'Conflicts of interest',
    isS26Compulsory: false,
    actReferenceLabel: 'S62-73',
    actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100937.html?search=sw_096be8ed81dce6e4_%22conflict+of+interest%22_25_se&p=1',
    helpText: `OFFICERs and sub-committee members must disclose any conflict of interest when it arises. This ensures that decisions are made transparently and in the best interests of the Society, preventing decisions that could be influenced by personal gain or bias.\nAny OFFICER or sub-committee member with an interest in a matter being considered must declare the details of that interest. They must abstain from voting, signing documents, or participating in decisions unless all non-interested members consent. The Society must keep a register of all disclosed interests.\nFailure to disclose conflicts of interest undermines the Society's governance. Disclosing interests ensures that all decisions are made in the open and prevents conflicts from affecting the integrity of the Society. This also ensures that any major decisions influenced by conflicts are escalated appropriately.`,
  },
];

const clause401 = `At all times each OFFICER shall act in good faith and in what they believe to be the best interests of the Society.\nEach OFFICER must exercise all powers for a proper purpose.\nEach OFFICER must not act, or agree to the Society acting, in a manner that contravenes the Act or this CONSTITUTION.\nWhen exercising powers or performing duties as an OFFICER, each must exercise the care and diligence that a reasonable person with the same responsibilities would exercise in the same circumstances taking into account, but without limitation: \n• the nature of the Society; \n• the nature of the decision; and \n• the position of the OFFICER and the nature of the responsibilities undertaken by him or her.\nEach OFFICER must not agree to the activities of the Society being carried on in a manner likely to create a substantial risk of serious loss to the Society or to the Society's creditors, or cause or allow the activities of the Society to be carried on in a manner likely to create a substantial risk of serious loss to the Society or to the Society's creditors.\nEach OFFICER must not agree to the Society incurring an obligation unless he or she believes at that time on reasonable grounds that the Society will be able to perform the obligation when it is required to do so.\nThe Act provides that an officer of a society has a duty of care in exercising their responsibilities.`;

const clause402 = `Every officer must: consent to being elected or appointed, and certify that they are not disqualified from becoming an officer.\nEvery OFFICER must be a natural person who has consented in writing to be an officer of the Society, and certifies that they are not disqualified from being elected or appointed or otherwise holding office as an OFFICER of the Society.\nEach such consent and certificate must be in writing and retained in the society's records.\nOFFICERs must not be disqualified under section 47(3) of the Act or section 36B of the Charities Act 2005 from being appointed or holding office as an OFFICER of the Society, namely —\n• a person who is under 16 years of age\n• a person who is an undischarged bankrupt\n• a person who is prohibited from being a director or promoter of, or being concerned or taking part in the management of, an incorporated or unincorporated body under the Companies Act 1993, the Financial Markets Conduct Act 2013, or the Takeovers Act 1993, or any other similar legislation.\n• a person who is disqualified from being a member of the governing body of a charitable entity under the Charities Act 2005.\n• a person who has been convicted of any of the following, and has been sentenced for the offence, within the last 7 years: an offence under subpart 6 of Part 4 of the ACT; a crime involving dishonesty (within the meaning of section 2(1) of the Crimes Act 1961); an offence under section 143B of the Tax Administration Act 1994; an offence, in a country other than New Zealand, that is substantially similar to an offence specified in subparagraphs (i) to (iii); a money laundering offence or an offence relating to the financing of terrorism, whether in New Zealand or elsewhere.\n• a person subject to: a banning order under subpart 7 of Part 4 of the ACT; or an order under section 108 of the Credit Contracts and Consumer Finance Act 2003; or a forfeiture order under the Criminal Proceeds (Recovery) Act 2009; or a property order made under the Protection of Personal and Property Rights Act 1988, or whose property is managed by a trustee corporation under section 32 of that ACT.\n• a person who is subject to an order that is substantially similar to an order referred to above under a law of a country, State, or territory outside New Zealand that is prescribed by regulations (if any) of the ACT.`;

const clause403_floor_part1 = `The election of OFFICERs shall be conducted as follows.\nOFFICERs shall be elected during ANNUAL GENERAL MEETINGs.\nHowever, if a vacancy in the position of any OFFICER occurs between ANNUAL GENERAL MEETINGs, that vacancy shall be filled by resolution of the COMMITTEE (and any such appointee must, before appointment, supply a signed consent to appointment and a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above)).\nAny such appointment must be ratified at the next ANNUAL GENERAL MEETING.\nA candidate's written nomination, accompanied by the written consent of the nominee with a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above) shall be received by the Society at least`;
const clause403_floor_part2 = `WORKING DAYS before the date of the ANNUAL GENERAL MEETING.\nIf there are insufficient valid nominations received, further nominations may be received from the floor at the ANNUAL GENERAL MEETING.\nVotes shall be cast in such a manner as the person chairing the meeting determines.\nIn the event of any vote being tied, the tie shall be resolved by the incoming COMMITTEE (excluding those in respect of whom the votes are tied).\nTwo MEMBERs (who are not nominees) or non-MEMBERs appointed by the CHAIRPERSON shall act as scrutineers for the counting of the votes and destruction of any voting papers.\nThe failure for any reason of any financial MEMBER to receive such NOTICE of the general meeting shall not invalidate the election.\nIn addition to OFFICERs elected under the foregoing provisions of this rule, the COMMITTEE may appoint other OFFICERs for a specific purpose, or for a limited period, or generally until the next ANNUAL GENERAL MEETING.\nUnless otherwise specified by the COMMITTEE any person so appointed shall have full speaking and voting rights as an OFFICER of the Society.\nAny such appointee must, before appointment, supply a signed consent to appointment and a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above).`;

const clause403_ahead = `The election of OFFICERs shall be conducted as follows.\nAt least 7 WORKING DAYS before the date of the ANNUAL GENERAL MEETING, the Society shall give NOTICE to all MEMBERs by posting or emailing to them such information (not exceeding one side of an A4 sheet of paper) as may be supplied to the Society by or on behalf of each nominee, in support of the nomination.\nOnly nominees who are not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above) may stand for election and vote in elections.\nIf there are insufficient valid nominations received under this rule, but not otherwise, further nominations may be received from the floor at the ANNUAL GENERAL MEETING.\nVotes shall be cast in such a manner as the CHAIRPERSON of the ANNUAL GENERAL MEETING shall determine.\nTwo MEMBERs (who are not nominees) or non-MEMBERs appointed by the CHAIRPERSON of the ANNUAL GENERAL MEETING shall act as scrutineers for the counting of the votes and destruction of any voting papers.\nThe failure for any reason of any financial MEMBER to receive such NOTICE shall not invalidate the election.\nIn the event of any vote being tied the tie shall be resolved by the incoming COMMITTEE (excluding those in respect of whom the votes are tied).\nIn addition to OFFICERs elected under the foregoing provisions of this rule, the COMMITTEE may appoint other OFFICERs for a specific purpose, or for a limited period, or generally until the next ANNUAL GENERAL MEETING.\nUnless otherwise specified by the COMMITTEE any person so appointed shall have full speaking and voting rights as an OFFICER of the Society.\nAny such appointee must, before appointment, supply a signed consent to appointment and a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above).`;

const clause403_remote = `OFFICERs shall be elected by remote ballot in accordance with the procedures for giving NOTICE.\nAt least 3 months prior to the proposed Election Date, the COMMITTEE shall: Set the Election Date for elections to the COMMITTEE, and Appoint a Returning OFFICER for those elections to the COMMITTEE.\nWithin 5 WORKING DAYS of determining the Election Date the Society shall give NOTICE to all financial MEMBERs calling for nominations for COMMITTEE positions requiring to be filled, and such NOTICE shall include a nomination form and shall specify the date such nominations must be in the hands of the Returning OFFICER appointed under sub-paragraph (a)(ii) above, such date being not less than 35 WORKING DAYS prior to the Election Date.\nA candidate's written nomination shall be accompanied by the written consent of the nominee with a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above) and may be accompanied by a signed biography not exceeding one A4 page.\nAt least 25 WORKING DAYS prior to the Election Date the SECRETARY shall give NOTICE to all financial MEMBERs of the nominations received for COMMITTEE positions and, in the event that there are a greater number than required for specific positions, forwarding a voting paper accompanied by the biographies of the candidates for election. The voting paper shall specify the latest date (not less than 3 WORKING DAYS prior to the Election Date) it must be in the hands of the Returning OFFICER appointed by the COMMITTEE to be counted as a valid vote.\nIn the event of a ballot being required under sub-paragraph (d) above the candidate/s polling the highest number of votes of financial MEMBERs shall be declared elected by the Society or the Returning OFFICER.\nThe failure for any reason of any financial MEMBER to receive such NOTICE shall not invalidate the election.\nIn the event of any vote being tied the tie shall be resolved by the incoming COMMITTEE (excluding those in respect of whom the votes are tied).\nIn addition to OFFICERs elected under the foregoing provisions of this rule, the COMMITTEE may appoint other OFFICERs for a specific purpose, or for a limited period, or generally until the next ANNUAL GENERAL MEETING.\nUnless otherwise specified by the COMMITTEE any person so appointed shall have full speaking and voting rights as an OFFICER of the Society.\nAny such appointee must, before appointment, supply a signed consent to appointment and a certificate that the nominee is not disqualified from being appointed or holding office as an OFFICER (as described in the 'Qualification of OFFICERs' rule above).`;

const clause404_part1 = `The term of office for all OFFICERs elected to the COMMITTEE shall be`;
const clause404_part2 = `year(s), expiring at the end of the ANNUAL GENERAL MEETING in the year corresponding with the last year of each OFFICER's term of office.\nNo OFFICER shall serve for more`;
const clause404_part3 = `consecutive terms.\nNo CHAIRPERSON shall serve for more than`;
const clause404_part4 = `consecutive years as CHAIRPERSON.`;

const clause405_part1 = `An OFFICER ceases to hold office when they resign (by notice in writing to the COMMITTEE), are removed, die, or otherwise vacate office in accordance with section 50(1) of the ACT.\nEach OFFICER shall within`;
const clause405_part2 = `WORKING DAYS of submitting a resignation or ceasing to hold office, deliver to the COMMITTEE all books, papers and other property of the Society held by such former OFFICER.`;

const clause406_part1 = `An OFFICER shall be removed as an OFFICER by resolution of the COMMITTEE or the Society where in the opinion of the COMMITTEE or the Society —\n• The OFFICER elected to the COMMITTEE has been absent from`;
const clause406_part2 = `committee meetings without leave of absence from the COMMITTEE.\n• The OFFICER has brought the Society into disrepute.\n• The OFFICER has failed to disclose a conflict of interest.\n• The COMMITTEE passes a vote of no confidence in the OFFICER.\nWith effect from (as applicable) the date specified in a resolution of the COMMITTEE or Society.`;

const clause407 = `An OFFICER or member of a sub-committee who is an INTERESTED MEMBER in respect of any MATTER being considered by the Society, must disclose details of the nature and extent of the interest (including any monetary value of the interest if it can be quantified) - to the COMMITTEE and or sub-committee, and in an INTERESTS REGISTER kept by the COMMITTEE.\nDisclosure must be made as soon as practicable after the OFFICER or member of a sub-committee becomes aware that they are interested in the MATTER.\nAn OFFICER or member of a sub-committee who is an INTERESTED MEMBER regarding a MATTER - must not vote or take part in the decision of the COMMITTEE and/or sub-committee relating to the MATTER unless all members of the COMMITTEE who are not interested in the MATTER consent.\nAn OFFICER or member of a sub-committee who is an INTERESTED MEMBER regarding a MATTER - must not sign any document relating to the entry into a transaction or the initiation of the MATTER unless all members of the COMMITTEE who are not interested in the MATTER consent.\nAn OFFICER or member of a sub-committee who is an INTERESTED MEMBER regarding a MATTER - may take part in any discussion of the COMMITTEE and/or sub-committee relating to the MATTER and be present at the time of the decision of the COMMITTEE and/or sub-committee (unless the COMMITTEE and/or sub-committee decides otherwise).\nAn OFFICER or member of a sub-committee who is prevented from voting on a MATTER may still be counted for the purpose of determining whether there is a quorum at any meeting at which the MATTER is considered.\nWhere 50 per cent or more of OFFICERs are prevented from voting on a MATTER because they are interested in that MATTER, a SPECIAL GENERAL MEETING must be called to consider and determine the MATTER, unless all non-interested OFFICERs agree otherwise.\nWhere 50 per cent or more of the members of a sub-committee are prevented from voting on a MATTER because they are interested in that MATTER, the COMMITTEE shall consider and determine the MATTER.\nThe COMMITTEE shall at all times maintain an up-to-date register of the interests disclosed by OFFICERs and by members of any sub-committee.`;

const Block4Officers: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {
  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };
  const handleNumberInputChange = (field: keyof typeof formData, value: string) => {
    const num = parseInt(value, 10);
    updateFormData(field, isNaN(num) ? undefined : num);
  };
  const handleTextInputChange = (field: keyof typeof formData, value: string) => {
    updateFormData(field, value);
  };
  const handleElectionMethodChange = (value: string) => {
    updateFormData('block4_03_electionMethod', value as 'floorNominations' | 'aheadOfTime' | 'remoteBallot');
    if (value !== 'floorNominations') {
      updateFormData('block4_03_floorNominationsDays', undefined);
    }
  };

  // Updated helper to render clause parts with an Input in between (with new styling)
  const renderClauseWithInput = (part1: string, inputProps: React.ComponentProps<typeof Input>, part2: string) => {
    const renderText = (text: string) => {
      return text.split(/\n+/).map((line, idx) => {
        const trimmedLine = line.trim();
        if (trimmedLine === "") return null;
        
        if (trimmedLine.startsWith('•')) {
          return (
            <div key={idx} className="block text-xs text-gray-700 font-normal leading-snug pl-4 mt-1">
              <span className="mr-1 text-violet-400">&bull;</span>
              <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
            </div>
          );
        } else if (trimmedLine.startsWith('o')) {
          return (
            <div key={idx} className="block text-xs text-gray-700 font-normal leading-snug pl-8 mt-1">
              <span className="mr-1 text-violet-400">○</span>
              <span dangerouslySetInnerHTML={{ __html: trimmedLine.substring(1).trim() }} />
            </div>
          );
        }
        
        return (
          <div key={idx} className={`block text-xs text-gray-700 font-normal leading-snug ${idx > 0 ? "mt-2" : ""}`} dangerouslySetInnerHTML={{ __html: trimmedLine }} />
        );
      });
    };
    
    return (
      <>
        {renderText(part1)}
        <Input {...inputProps} />
        {renderText(part2)}
      </>
    );
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock4.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold text-gray-800">
              {subSection.number} {subSection.title}
            </h3>
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
                <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md">
                  <div className="flex items-center">
                    <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                    Helpful information for this question
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                  {subSection.helpText.split(/\n+/).map((p, i) => (
                    <p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {subSection.id === '4.01' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_01_includeOfficerDutiesClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_01_includeOfficerDutiesClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for officer duties</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Officer Duties</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause401.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '4.02' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_02_includeQualificationsConsentClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_02_includeQualificationsConsentClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for officer qualifications and consent</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Officer Qualifications and Consent</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause402.split(/\n+/).map((line, idx) => {
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
            {subSection.id === '4.03' && (
              <>
                <p className="text-sm text-gray-700">Choose the clause to include in your constitution</p>
                <RadioGroup value={formData.block4_03_electionMethod} onValueChange={handleElectionMethodChange} className="space-y-2 pt-1">
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="floorNominations" id={`${subSection.id}-floor`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-floor`} className="flex-1 text-sm font-normal text-gray-700">Option 1: Nominations from the floor</Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="aheadOfTime" id={`${subSection.id}-ahead`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-ahead`} className="flex-1 text-sm font-normal text-gray-700">Option 2: Gather nominations ahead of time</Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="remoteBallot" id={`${subSection.id}-remote`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-remote`} className="flex-1 text-sm font-normal text-gray-700">Option 3: Remote ballot</Label>
                  </div>
                </RadioGroup>
                
                {formData.block4_03_electionMethod === 'floorNominations' && (
                  <>
                    <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Officer Election Process - Floor Nominations</h4>
                    <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                      <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                        {renderClauseWithInput(
                          clause403_floor_part1,
                          { 
                            type: "number", 
                            value: formData.block4_03_floorNominationsDays === undefined ? '' : formData.block4_03_floorNominationsDays, 
                            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block4_03_floorNominationsDays', e.target.value), 
                            className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                          },
                          clause403_floor_part2
                        )}
                      </div>
                    </div>
                  </>
                )}
                {formData.block4_03_electionMethod === 'aheadOfTime' && (
                  <>
                    <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Officer Election Process - Ahead of Time</h4>
                    <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                      <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                        {clause403_ahead.split(/\n+/).map((line, idx) => {
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
                {formData.block4_03_electionMethod === 'remoteBallot' && (
                  <>
                    <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Officer Election Process - Remote Ballot</h4>
                    <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                      <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                        {clause403_remote.split(/\n+/).map((line, idx) => {
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
              </>
            )}

            {subSection.id === '4.04' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_04_includeTermsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_04_includeTermsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for terms of office</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Terms of Office</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {renderClauseWithInput(
                      clause404_part1, 
                      {
                        type: "number", 
                        value: formData.block4_04_officerTermYears === undefined ? '' : formData.block4_04_officerTermYears, 
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block4_04_officerTermYears', e.target.value), 
                        className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                      }, 
                      clause404_part2
                    )}
                    {renderClauseWithInput(
                      "", 
                      {
                        type: "number", 
                        value: formData.block4_04_maxConsecutiveTerms === undefined ? '' : formData.block4_04_maxConsecutiveTerms, 
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block4_04_maxConsecutiveTerms', e.target.value), 
                        className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                      }, 
                      clause404_part3
                    )}
                    {renderClauseWithInput(
                      "", 
                      {
                        type: "number", 
                        value: formData.block4_04_chairMaxConsecutiveYears === undefined ? '' : formData.block4_04_chairMaxConsecutiveYears, 
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block4_04_chairMaxConsecutiveYears', e.target.value), 
                        className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                      }, 
                      clause404_part4
                    )}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '4.05' && (
              <>
                <p className="text-sm text-gray-700">Modify and select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_05_includeCessationClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_05_includeCessationClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for cessation of office</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Cessation of Office</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {renderClauseWithInput(
                      clause405_part1, 
                      {
                        type: "number", 
                        value: formData.block4_05_cessationReturnPropertyDays === undefined ? '' : formData.block4_05_cessationReturnPropertyDays, 
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNumberInputChange('block4_05_cessationReturnPropertyDays', e.target.value), 
                        className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                      }, 
                      clause405_part2
                    )}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '4.06' && (
              <>
                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_06_includeRemovalClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_06_includeRemovalClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for grounds for removal</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Grounds for Removal</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {renderClauseWithInput(
                      clause406_part1, 
                      {
                        type: "text", 
                        placeholder: "xxx", 
                        value: formData.block4_06_removalAbsenceMeetings || '', 
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleTextInputChange('block4_06_removalAbsenceMeetings', e.target.value), 
                        className: "inline-block w-20 h-7 px-2 text-xs mx-1 align-baseline bg-white border-gray-300 rounded-sm p-2"
                      }, 
                      clause406_part2
                    )}
                  </div>
                </div>
              </>
            )}
            {subSection.id === '4.07' && (
              <>
                <p className="text-sm text-gray-700">Modify and select to include the clause in your constitution</p>
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox id={`${subSection.id}-includeClause`} checked={!!formData.block4_07_includeConflictsClause} onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block4_07_includeConflictsClause', checked)} />
                  <Label htmlFor={`${subSection.id}-includeClause`} className="text-sm font-medium leading-none">Include clause for conflicts of interest</Label>
                </div>
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Conflicts of Interest</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {clause407.split(/\n+/).map((line, idx) => {
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

            {!['4.01', '4.02', '4.03', '4.04', '4.05', '4.06', '4.07'].includes(subSection.id) && (<p>Questions for {subSection.title} will be built here.</p>)}
            <div className="flex justify-end mt-4">
              <button onClick={() => console.log(`Update constitution for ${subSection.number}. Data:`, formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
            </div>
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
export default Block4Officers; 