import React from 'react';
import { StepProps } from '../ConstitutionWizard';
import { ExternalLinkIcon, HelpCircle, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SubSectionData {
  id: string;
  number: string;
  title: string;
  isS26Compulsory: boolean;
  actReferenceLabel?: string;
  actReferenceLink?: string;
}

const subSectionsForBlock1: SubSectionData[] = [
  { id: '1.01', number: '1.01', title: 'Name', isS26Compulsory: true, actReferenceLabel: 'S11', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100866.html?search=sw_096be8ed81dce6e4_11_25_se&p=1&sr=2' },
  { id: '1.02', number: '1.02', title: 'Charitable status', isS26Compulsory: true, actReferenceLabel: 'S12', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100867.html?search=sw_096be8ed81dce6e4_11_25_se&p=1' },
  { id: '1.03', number: '1.03', title: 'Purposes', isS26Compulsory: true, actReferenceLabel: 'S12', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100867.html?search=sw_096be8ed81dce6e4_purpose_25_se&p=1&sr=7' },
  { id: '1.04', number: '1.04', title: 'Definitions', isS26Compulsory: false, actReferenceLabel: 'S5', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100858.html?search=sw_096be8ed81dce6e4_5_25_se&p=1&sr=2' },
  { id: '1.05', number: '1.05', title: 'Contact person', isS26Compulsory: true, actReferenceLabel: 'S113', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS254711.html?search=sw_096be8ed81dce6e4_113_25_se&p=1&sr=3' },
  { id: '1.06', number: '1.06', title: 'Registered office', isS26Compulsory: false, actReferenceLabel: 'S110-111', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS101003.html?search=sw_096be8ed81dce6e4_%22registered+office%22_25_se&p=1' },
  { id: '1.07', number: '1.07', title: 'Restrictions on powers', isS26Compulsory: true, actReferenceLabel: 'S46', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100914.html?search=sw_096be8ed81dce6e4_46_25_se&p=1&sr=2' },
  { id: '1.08', number: '1.08', title: 'Balance date', isS26Compulsory: false, actReferenceLabel: 'S99-100', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100985.html?search=sw_096be8ed81dce6e4_%22Balance+Date%22_25_se&p=1&sr=0' },
  { id: '1.09', number: '1.09', title: 'Tikanga, kawa, culture or practice', isS26Compulsory: false, actReferenceLabel: 'S28', actReferenceLink: 'https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100893.html?search=sw_096be8ed81dce6e4_Tikanga%2c+kawa%2c+culture+or+practice+and+other+matters_25_se&p=1&sr=16' },
];

const helpText101a = `Every society must have a legal name that clearly identifies it and appears in its constitution and official records. Your chosen name will affect how your society is officially recognised and needs to be unique.
For new societies, enter the full legal name exactly as intended for registration. For existing societies, select the name from the dropdown menu.
Be aware that the name you choose:
• can include macrons
• must end with one or more of the following words - 'Manatōpū', 'Incorporated' or 'Inc'.
• must be included in your constitution
• cannot be identical or almost identical to the name of another incorporated society or entity (for example, a charitable trust board or a company), unless that organisation gives its written consent. Note, you will need to give us with a copy of that consent when you apply for incorporation.
• cannot contain certain words which are prohibited by other pieces of legislation (for example, ANZAC, Royal).
• cannot be likely to mislead the society's members or the public about the society's nature or identity.
Selecting an appropriate name that meets these requirements will ensure your registration can proceed without rejection or requests for amendment from the Registrar.`;

const helpText102a = `Some societies choose to register as charities to access tax exemptions and public funding, but this comes with stricter purpose and reporting rules.
Select whether your society intends to register or reregister under the Charities Act 2005 as a charitable entity. This must reflect your society's actual purpose and ongoing compliance commitments.
Charities must meet the obligations of both the Charities Act 2005 and the Incorporated Societies Act 2022, including limits on financial gain, mandatory reporting, and public benefit tests.`;

const helpText103a = `Every society must have clearly stated purposes in its constitution. If your society is or aims to be a charity, these purposes must align with legally recognised charitable purposes under the Charities ACT.\nState your society's primary purpose, and if applicable, describe how it contributes to relieving poverty, advancing education or religion or benefiting the community. Even if not a charity, your society must not exist for the financial gain of its members, though it may still pay fair wages, reimburse expenses and offer hardship or scholarship support.\nVague or private-benefit-driven purposes may lead to rejection by the Registrar or Charities Services. Your purposes guide what your society can do, so clarity and alignment with public benefit are critical.`;

const helpText103b = `Even if your society is not a registered charity, it must still operate for a legitimate purpose and cannot be set up for the private financial gain of its members.\nClearly state what your society exists to do. You can include income-generating activities and fair payments (e.g. wages, reimbursements, scholarships), as long as these support your society's broader purpose and not personal profit.\nSocieties that appear to benefit individual members financially risk rejection or deregistration. The Act allows reasonable benefits, but your purposes must serve the wider group or community, not private interests.`;

const helpText104a = `Some terms used throughout this constitution are legally defined and included here to ensure consistency with the Incorporated Societies Act 2022. These standard terms are drawn directly from the Act or support its structure, and they help clarify roles, processes, and responsibilities.\nYou may add new terms or refine descriptions, but do not change the legal meaning of existing terms unless you are confident doing so won't conflict with the ACT. The provided definitions have been carefully reviewed for compliance and will help avoid ambiguity in governance or disputes.\nDefined terms should be shown in bold wherever they appear in the constitution. This helps users recognise that these words have a specific, consistent meaning grounded in law.`;

const helpText105a = `The contact person(s) are the official points of contact between the Society and the Registrar of Incorporated Societies. Their role is to ensure that the Registrar can reach the Society when needed, even though their details won't appear publicly.\nYour contact person should be reliable and easy to reach, ideally someone who knows how the Society is run - such as a COMMITTEE member, OFFICER or administrator. They must be 18 or older and ordinarily resident in New Zealand.\nKeep their details current. If anything changes - name, address or phone number - the Society must notify the Registrar within 20 working days of becoming aware of it. Failure to do so may affect your ability to receive official communications.`;

const helpText106a = `Every society must have a registered office in New Zealand. This is the official address used for delivering legal documents, notices, and communications to the Society.\nChoose an address where someone from the Society can reliably receive and manage documents. If the Society changes its registered office, it must notify the Registrar at least five working days before the change takes effect.\nNot updating the address correctly or on time may result in missed legal notices or penalties. The address must always reflect where documents can actually be delivered.`;

const helpText107a = `The Society cannot exist to make money for its members. All income or benefits must support the Society's purpose. This reflects a core principle of the Act and helps maintain public trust and the Society's legal status.\nBy default, the Act gives societies broad legal powers. You should only include specific statements about powers in your constitution if you want to restrict or narrow them - for example, by stating that your Society cannot borrow money.\nIf your Society chooses to include such restrictions, be clear and deliberate. These clauses will limit what your Society is legally allowed to do.`;

const helpText108a = `Your society's financial year must have a defined start and end date. The final day of that financial year is known as the balance date and sets the timeline for key legal obligations.\nThe society must hold its annual general meeting and submit financial statements to the Registrar within 6 months of this balance date. Choosing a date that aligns with your operational or funding cycles can make compliance easier.\nThe Incorporated Societies Act and regulations also determine how financial statements must be prepared, and whether your society requires an audit.`;

const uneditableClause103bPart2 = `The Society must not operate for the purpose of, or with the effect of -\n• Distributing, any gain, profit, surplus, dividend or other similar financial benefit to any of its MEMBERs (whether in money or in kind); or\n• Having capital that is divided into shares or stock held by its MEMBERs; or\n• Holding, property in which its members have a disposable interest (whether directly, or in the form of shares or stock in the capital of the society or otherwise).\n\nHowever, the Society will not operate for the financial gain of MEMBERs simply if the Society—\n• Engages in trade,\n• Pays a MEMBER for matters that are incidental to the purposes of the Society, and the MEMBER is a not-for-profit entity,\n• Distributes funds to a MEMBER to further the purposes of the Society, and the MEMBER\n  o Is a not-for-profit entity, and\n  o Is affiliated or closely related to the Society, and\n  o Has the same, or substantially the same, purposes as those of the Society.\n• Reimburses a MEMBER for reasonable expenses legitimately incurred on behalf of the Society or while pursuing the Society\'s purposes,\n• Provides benefits to members of the public or of a class of the public, including MEMBERs or their families,\n• Provides benefits to MEMBERs or their families to alleviate hardship,\n• Provides educational scholarships or grants to MEMBERs or their families,\n• Pays a MEMBER a salary or wages or other payments for services to the Society on arm\'s length terms,\n• Provides a MEMBER with incidental benefits (e.g., trophies, prizes, or discounts) in accordance with the purposes of the Society.\n• On removal of the Society from the Register of Incorporated Societies, distributes its surplus assets to a not-for-profit entity.`;

const uneditableClause105 = `The Society shall have at least 1 but no more than 3 contact person(s) whom the Registrar can contact when needed.\n\nThe Society's contact person must be:\n• At least 18 years of age; and\n• Ordinarily resident in New Zealand.\n\nA contact person can be appointed by the COMMITTEE or elected by the MEMBERs at a GENERAL MEETING.\n\nEach contact person's name must be provided to the Registrar of Incorporated Societies, along with their contact details, including:\n• A physical address or electronic address; and\n• A telephone number.\n\nAny change in that contact person or that person's name or contact details shall be advised to the Registrar of Incorporated Societies within 20 WORKING DAYS of that change occurring, or the Society becoming aware of the change.`;

const uneditableClause106 = `The registered office of the Society shall be at such place in New Zealand as the COMMITTEE from time to time determines.\n\nAny change to the registered office shall be notified to the Registrar of Incorporated Societies:\n• at least 5 WORKING DAYS before the change is to take effect; and\n• in the form and manner required by the Incorporated Societies Act 2022.`;

const standardDefinitionsText = `<strong>'Act'</strong> means the Incorporated Societies Act 2022 or any Act which replaces it (including amendments to it from time to time), and any regulations made under the Act or under any Act which replaces it.
<strong>'Annual General Meeting'</strong> means a meeting of the Members of the Society held once per year which, among other things, will receive and consider reports on the Society\'s activities and finances.
<strong>'Chairperson'</strong> means the Officer responsible for chairing General Meetings and committee meetings, and who provides leadership for the Society.
<strong>'Committee'</strong> means the Society\'s governing body.
<strong>'Constitution'</strong> means the rules in this document.
<strong>'Deputy Chairperson'</strong> means the Officer elected or appointed to deputise in the absence of the Chairperson.
<strong>'General Meeting'</strong> means either an Annual General Meeting or a Special General Meeting of the Members of the Society.
<strong>'Interested Member'</strong> means a Member who is interested in a matter for any of the reasons set out in section 62 of the Act.
<strong>'Interests Register'</strong> means the register of interests of Officers, kept under this Constitution and as required by section 73 of the Act.
<strong>'Matter'</strong> means—\n1. the Society\'s performance of its activities or exercise of its powers; or\n2. an arrangement, agreement, or contract (a transaction) made or entered into, or proposed to be entered into, by the Society.
<strong>'Member'</strong> means a natural person or entity who has consented to become a Member of the Society and has been properly admitted to the Society and who has not ceased to be a Member of the Society.
<strong>'Membership'</strong> means the status of being a Member of the Society, including any rights, obligations, and category of association with the Society.
<strong>'Membership Register'</strong> means the register of Members kept under this Constitution as required by section 79 of the Act.
<strong>'Membership Types'</strong> means the various categories of Membership as defined in this Constitution, which may include regular, honorary, lifetime, or other classifications of Membership.
<strong>'Notice'</strong> to Members includes any notice given by email, post, or courier.
<strong>'Officer'</strong> means a natural person who is:\n• a member of the Committee, or\n• occupying a position in the Society that allows them to exercise significant influence over the management or administration of the Society, including any Chief Executive or Treasurer.
<strong>'Secretary'</strong> means the Officer responsible for the matters specifically noted in this Constitution.
<strong>'Special General Meeting'</strong> means a meeting of the Members, other than an Annual General Meeting, called for a specific purpose or purposes.
<strong>'Working Days'</strong> mean as defined in the Legislation Act 2019. Examples of days that are not Working Days include, but are not limited to, the following — a Saturday, a Sunday, Waitangi Day, Good Friday, Easter Monday, ANZAC Day, the Sovereign\'s birthday, Te Rā Aro ki a Matariki/Matariki Observance Day and Labour Day.`;

const helpText109a = `Your society may include statements about its tikanga, kawa, cultural values or practices, especially if these shape how it governs itself or interprets rules. This provides space to reflect your identity and way of working.\nYou can set out specific tikanga or culturally relevant processes here. These can influence how the CONSTITUTION is interpreted, but must not override or conflict with the Incorporated Societies Act or other applicable laws.\nThis section gives your COMMITTEE flexibility to support custom practices without needing to amend the CONSTITUTION every time. Keep it focused on principles or expectations that matter most to your members.`;

const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
const months = [
  { value: "0", label: "January" }, { value: "1", label: "February" }, { value: "2", label: "March" },
  { value: "3", label: "April" }, { value: "4", label: "May" }, { value: "5", label: "June" },
  { value: "6", label: "July" }, { value: "7", label: "August" }, { value: "8", label: "September" },
  { value: "9", label: "October" }, { value: "10", label: "November" }, { value: "11", label: "December" }
];

const Block1SocietyInformation: React.FC<StepProps> = ({ blockNumber, formData, updateFormData, onComplete, onSaveProgress }) => {

  const handleCheckboxChange = (
    field: keyof Pick<typeof formData, 'block1_03a_isRelievingPoverty' | 'block1_03a_isAdvancingEducation' | 'block1_03a_isAdvancingReligion' | 'block1_03a_isBenefittingCommunity'>,
    textInputKey: keyof Pick<typeof formData, 'block1_03a_relievingPovertyBy' | 'block1_03a_advancingEducationBy' | 'block1_03a_advancingReligionBy' | 'block1_03a_benefittingCommunityBy'>,
    checked: boolean | 'indeterminate'
  ) => {
    updateFormData(field, checked === true);
    if (checked !== true) {
      updateFormData(textInputKey, '');
    }
  };

  const renderCharitablePurposeOption = (
    mainField: keyof Pick<typeof formData, 'block1_03a_isRelievingPoverty' | 'block1_03a_isAdvancingEducation' | 'block1_03a_isAdvancingReligion' | 'block1_03a_isBenefittingCommunity'>,
    textField: keyof Pick<typeof formData, 'block1_03a_relievingPovertyBy' | 'block1_03a_advancingEducationBy' | 'block1_03a_advancingReligionBy' | 'block1_03a_benefittingCommunityBy'>,
    label: string
  ) => (
    <div className="flex items-start space-x-2 mt-1">
      <Checkbox 
        id={mainField}
        checked={!!formData[mainField]}
        onCheckedChange={(checked: boolean | 'indeterminate') => handleCheckboxChange(mainField, textField, checked)}
      />
      <Label htmlFor={mainField} className="text-sm font-normal text-gray-700 flex-grow">
        {label}
        {formData[mainField] && (
          <Textarea
            value={formData[textField] || ''}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData(textField, e.target.value)}
            placeholder="Describe how..."
            className="mt-1 w-full text-sm p-2 border-gray-300 rounded-md"
            rows={2}
          />
        )}
      </Label>
    </div>
  );

  const handleAdditionalTermChange = (index: number, field: 'term' | 'definition', value: string) => {
    const existingTerms = formData.block1_04_additionalTerms || [];
    const updatedTerms = existingTerms.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    updateFormData('block1_04_additionalTerms', updatedTerms);
  };

  const addAdditionalTerm = () => {
    const existingTerms = formData.block1_04_additionalTerms || [];
    if (existingTerms.length < 50) {
      const newTerms = [...existingTerms, { id: Date.now().toString(), term: '', definition: '' }];
      updateFormData('block1_04_additionalTerms', newTerms);
    }
  };

  const removeAdditionalTerm = (idToRemove: string) => {
    const existingTerms = formData.block1_04_additionalTerms || [];
    const filteredTerms = existingTerms.filter(term => term.id !== idToRemove);
    updateFormData('block1_04_additionalTerms', filteredTerms);
  };

  const handleGenericCheckboxChange = (field: keyof typeof formData, checked: boolean | 'indeterminate') => {
    updateFormData(field, checked === true);
  };

  const handleRestrictionsOptionChange = (value: string) => {
    updateFormData('block1_07_restrictionsOption', value as 'noAdditionalRestrictions' | 'hasSpecificRestrictions');
    if (value === 'noAdditionalRestrictions') {
      updateFormData('block1_07_specificRestrictions', []); // Clear specific restrictions if none are chosen
    }
  };

  const handleSpecificRestrictionChange = (index: number, value: string) => {
    const existingRestrictions = formData.block1_07_specificRestrictions || [];
    const updatedRestrictions = existingRestrictions.map((item, i) => 
      i === index ? { ...item, description: value } : item
    );
    updateFormData('block1_07_specificRestrictions', updatedRestrictions);
  };

  const addSpecificRestriction = () => {
    const existingRestrictions = formData.block1_07_specificRestrictions || [];
    if (existingRestrictions.length < 20) {
      const newRestrictions = [...existingRestrictions, { id: Date.now().toString(), description: '' }];
      updateFormData('block1_07_specificRestrictions', newRestrictions);
    }
  };

  const removeSpecificRestriction = (idToRemove: string) => {
    const existingRestrictions = formData.block1_07_specificRestrictions || [];
    const filteredRestrictions = existingRestrictions.filter(term => term.id !== idToRemove);
    updateFormData('block1_07_specificRestrictions', filteredRestrictions);
  };

  const getCalculatedStartDate = (endDay?: string, endMonth?: string): string => {
    if (!endDay || !endMonth || endDay === '' || endMonth === '') return "dd month";
    const day = parseInt(endDay, 10);
    const monthIndex = parseInt(endMonth, 10); // 0-indexed from select value

    if (isNaN(day) || isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11 || day < 1 || day > 31) {
      return "Invalid Date";
    }

    // Create a date object for the balance date (end of financial year)
    // Using a non-leap year to avoid Feb 29 issues
    const balanceDate = new Date(2001, monthIndex, day);

    // The financial year starts on the day after the balance date
    const startDate = new Date(balanceDate);
    startDate.setDate(balanceDate.getDate() + 1);
    
    // Format for "dd month" display
    const startDay = startDate.getDate();
    const startMonthName = months[startDate.getMonth()].label;
    
    return `${startDay} ${startMonthName}`;
  };

  return (
    <div className="space-y-6">
      {subSectionsForBlock1.map((subSection) => (
        <div key={subSection.id} className="p-4 rounded-lg bg-gray-50 shadow-sm space-y-4">
          {/* Sub-section Header */}
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
                <a href={subSection.actReferenceLink} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-800 transition-colors"
                  title={`View ${subSection.actReferenceLabel} in the Act`}>
                  {subSection.actReferenceLabel}
                  <ExternalLinkIcon className="w-3 h-3 ml-1 flex-shrink-0" />
                </a>
              )}
            </div>
          </div>

          {/* Content for the specific sub-section */}
          <div className="pl-1 space-y-3">
            {subSection.id === '1.01' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.01a" className="border-b-0">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md">
                      <div className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                        Helpful information for this question
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                      {/* Split help text into paragraphs for better spacing */}
                      {helpText101a.split(/\n+/).map((paragraph, index) => (
                        <p key={index} className={index > 0 ? "mt-2" : ""}> {/* Add margin-top to subsequent paragraphs */}
                          {paragraph.trim()}
                        </p>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-gray-700 my-3">
                  <span className="mr-1">The name of the society is</span>
                  <Input 
                    type="text" 
                    placeholder="Start typing to search, or enter a new society name here..." 
                    value={formData.block1_01_societyName || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateFormData('block1_01_societyName', e.target.value)}
                    className="block w-full max-w-lg p-2 mt-1 mb-1 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic focus:border-purple-500 focus:ring-purple-500 text-sm"
                  />
                  <span>(in this CONSTITUTION referred to as the "Society")</span>
                </div>

                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => console.log(`Update constitution for 1.01. Name:`, formData.block1_01_societyName)}
                    className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]"
                  >
                    Update Constitution
                  </button>
                </div>
              </>
            )}

            {subSection.id === '1.02' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.02a" className="border-b-0">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md">
                      <div className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                        Helpful information for this question
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                      {helpText102a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <RadioGroup 
                  value={formData.block1_02_charitableStatusIntent}
                  onValueChange={(value) => updateFormData('block1_02_charitableStatusIntent', value as 'intendsToRegister' | 'doesNotIntendToRegister')}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="intendsToRegister" id={`${subSection.id}-intendsToRegister`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-intendsToRegister`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society intends to become or remain registered as a charitable society after incorporation under the 2022 ACT.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="doesNotIntendToRegister" id={`${subSection.id}-doesNotIntendToRegister`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-doesNotIntendToRegister`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society does not intend to be registered as a charitable entity under the Charities Act 2005.
                    </Label>
                  </div>
                </RadioGroup>
                
                <div className="flex justify-end mt-4">
                  <button 
                    onClick={() => console.log(`Update constitution for 1.02. Intent:`, formData.block1_02_charitableStatusIntent)}
                    className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]"
                  >
                    Update Constitution
                  </button>
                </div>
              </>
            )}

            {subSection.id === '1.03' && (
              <>
                {formData.block1_02_charitableStatusIntent === 'intendsToRegister' && (
                  <>
                    <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                      <AccordionItem value="help-1.03a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText103a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                    </Accordion>
                    <p className="text-sm text-gray-700">Select and update the charitable purpose/s that apply to your society</p>
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-gray-700 space-y-2">
                      <p>The Society is established and maintained exclusively for charitable purposes (including any purposes ancillary to those charitable purposes), namely:</p>
                      {renderCharitablePurposeOption('block1_03a_isRelievingPoverty', 'block1_03a_relievingPovertyBy', 'Relieving poverty by ')}
                      {renderCharitablePurposeOption('block1_03a_isAdvancingEducation', 'block1_03a_advancingEducationBy', 'Advancing education by ')}
                      {renderCharitablePurposeOption('block1_03a_isAdvancingReligion', 'block1_03a_advancingReligionBy', 'Advancing religion by ')}
                      {renderCharitablePurposeOption('block1_03a_isBenefittingCommunity', 'block1_03a_benefittingCommunityBy', 'Benefitting the community by ')}
                      <p className="pt-2">Any income, benefit, or advantage must be used exclusively to advance the charitable purposes of the Society.</p>
                    </div>
                  </>
                )}
                {formData.block1_02_charitableStatusIntent === 'doesNotIntendToRegister' && (
                  <>
                    <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                      <AccordionItem value="help-1.03b" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText103b.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                    </Accordion>
                    <p className="text-sm text-gray-700">Modify and select to include the clause in your constitution</p>
                    <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-gray-700">
                      <Textarea 
                        placeholder="Describe your society's purpose here …"
                        value={formData.block1_03b_primaryPurposesDescription || ''}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block1_03b_primaryPurposesDescription', e.target.value)}
                        className="block w-full p-2 my-1 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic focus:border-purple-500 focus:ring-purple-500 text-sm"
                        rows={3}
                      />
                      <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-3">Financial Gain Restrictions</h4>
                      <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-1">
                        <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                          {uneditableClause103bPart2.split(/\n+/).map((line, idx) => {
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
                    </div>
                  </>
                )}
                {/* Render if no selection made in 1.02 yet */}
                {!formData.block1_02_charitableStatusIntent && (
                    <p className="text-sm text-orange-600 italic">Please complete section 1.02 Charitable status first to see relevant purpose questions.</p>
                )}
                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.03. Data:', formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.04' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.04a" className="border-b-0">
                    <AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md">
                      <div className="flex items-center">
                        <HelpCircle className="w-4 h-4 mr-2 text-purple-600" />
                        Helpful information for this question
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">
                      <div className="bg-white border border-slate-200 rounded-md p-4 mb-3">
                        <div className="md:grid md:grid-cols-2 md:gap-x-8">
                          <div>
                            <h5 className="font-semibold text-violet-700 mb-2 flex items-center">
                              <span className="inline-block w-4 h-4 mr-1"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" /></svg></span>
                              Why are definitions important?
                            </h5>
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                              <li>Definitions ensure everyone interprets key terms the same way.</li>
                              <li>They help avoid confusion and disputes about society rules.</li>
                              <li>Standard terms are drawn from the Incorporated Societies Act 2022.</li>
                              <li>Clear definitions support compliance and good governance.</li>
                            </ul>
                          </div>
                          <div className="mt-4 md:mt-0">
                            <h5 className="font-semibold text-violet-700 mb-2 flex items-center">
                              <span className="inline-block w-4 h-4 mr-1"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 3.5l4 4m-4-4L21 7.5M4 20h16M4 4h16" /></svg></span>
                              How should I use or edit these?
                            </h5>
                            <ul className="list-disc list-inside text-xs text-gray-700 space-y-1">
                              <li>You may add new terms or clarify descriptions for your society.</li>
                              <li>Do not change the legal meaning of standard terms unless you're sure it won't conflict with the Act.</li>
                              <li>Show defined terms in bold throughout your constitution for clarity.</li>
                              <li>Adding society-specific terms can help avoid ambiguity.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                
                <p className="text-sm text-gray-700">Select and modify to include these definitions in your constitution</p>
                {/* Enhanced Standard Definitions Box */}
                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Standard Definitions</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-800 mb-3 columns-1 md:columns-2 gap-x-4">
                  {(() => {
                    const definitions = [];
                    let currentDefinition = { term: '', meaningLines: [] as string[] };
                    const lines = standardDefinitionsText.split(/\n+/);

                    for (const line of lines) {
                      const trimmedLine = line.trim();
                      if (trimmedLine.startsWith('<strong>')) {
                        if (currentDefinition.term || currentDefinition.meaningLines.length > 0) {
                          definitions.push(currentDefinition);
                        }
                        currentDefinition = { term: trimmedLine, meaningLines: [] };
                      } else if (currentDefinition.term) {
                        currentDefinition.meaningLines.push(trimmedLine);
                      }
                    }
                    if (currentDefinition.term || currentDefinition.meaningLines.length > 0) {
                      definitions.push(currentDefinition);
                    }

                    return definitions.map((def, index) => {
                      // Extract the term from the <strong> tag
                      const termMatch = def.term.match(/<strong>(.*?)<\/strong>/);
                      const termText = termMatch ? termMatch[1] : def.term;
                      // The rest of the line after the term
                      const afterTerm = def.term.replace(/<strong>.*?<\/strong>/, '').replace(/^\s*[:-]?\s*/, '');
                      return (
                        <div
                          key={index}
                          className={cn(
                            "break-inside-avoid border-l-4 border-violet-300 px-3 py-2 mb-3",
                            index > 0 ? "mt-0" : ""
                          )}
                        >
                          <div className="block font-semibold text-[13px] text-violet-900 mb-0.5">{termText}</div>
                          {afterTerm && <div className="block text-xs font-normal text-gray-700 mb-0.5">{afterTerm}</div>}
                          {def.meaningLines.map((meaningLine, lineIdx) => {
                            const isBullet = meaningLine.startsWith('•') || meaningLine.match(/^\d+\.\s+/);
                            return (
                              <div
                                key={lineIdx}
                                className={cn(
                                  "block text-xs text-gray-700 font-normal leading-snug",
                                  isBullet ? "pl-4" : "pl-0 mt-1"
                                )}
                              >
                                {isBullet ? <span className="mr-1 text-violet-400">&bull;</span> : null}
                                <span dangerouslySetInnerHTML={{ __html: meaningLine.replace(/^•/, '').trim() }} />
                              </div>
                            );
                          })}
                        </div>
                      );
                    });
                  })()}
                </div>

                <p className="text-sm text-gray-700 mt-4">Add any additional terms here</p>
                <div className="space-y-3">
                  {(formData.block1_04_additionalTerms || []).map((item, index) => (
                    <div key={item.id} className="p-3 border border-dashed border-gray-300 rounded-md bg-white space-y-2">
                      <Label htmlFor={`term-${item.id}`} className="text-sm font-medium text-gray-700">Additional term {index + 1}</Label>
                      <Input 
                        id={`term-${item.id}`}
                        type="text" 
                        placeholder="Enter term..."
                        value={item.term}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAdditionalTermChange(index, 'term', e.target.value)}
                        className="w-full p-2 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic text-sm bg-white" />
                      <Label htmlFor={`definition-${item.id}`} className="text-sm font-medium text-gray-700 mt-1 block">Definition</Label>
                      <Textarea 
                        id={`definition-${item.id}`}
                        placeholder="Enter its definition…"
                        value={item.definition}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleAdditionalTermChange(index, 'definition', e.target.value)}
                        className="w-full p-2 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic text-sm bg-white"
                        rows={3}
                      />
                      <div className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => removeAdditionalTerm(item.id)} className="text-red-600 hover:text-red-700">
                          <Trash2Icon className="w-4 h-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  {(formData.block1_04_additionalTerms || []).length < 50 && (
                    <Button type="button" variant="outline" size="sm" onClick={addAdditionalTerm} className="mt-2">
                      <PlusCircleIcon className="w-4 h-4 mr-2" /> Add Term
                    </Button>
                  )}
                </div>

                <div className="flex justify-end mt-6">
                  <button onClick={() => console.log('Update constitution for 1.04. Data:', formData.block1_04_additionalTerms)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.05' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.05a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText105a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                </Accordion>

                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="includeContactPersonClause-1.05"
                    checked={!!formData.block1_05_includeContactPersonClause}
                    onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block1_05_includeContactPersonClause', checked)}
                  />
                  <Label htmlFor="includeContactPersonClause-1.05" className="text-sm font-medium leading-none">
                    Include standard clause for Contact Person requirements
                  </Label>
                </div>

                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Contact Person Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {uneditableClause105.split(/\n+/).map((line, idx) => {
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

                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.05. Clause included:', formData.block1_05_includeContactPersonClause)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.06' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.06a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText106a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                </Accordion>

                <p className="text-sm text-gray-700">Select to include the clause in your constitution</p>
                
                <div className="flex items-center space-x-2 py-2">
                  <Checkbox 
                    id="includeRegisteredOfficeClause-1.06"
                    checked={!!formData.block1_06_includeRegisteredOfficeClause}
                    onCheckedChange={(checked: boolean | 'indeterminate') => handleGenericCheckboxChange('block1_06_includeRegisteredOfficeClause', checked)}
                  />
                  <Label htmlFor="includeRegisteredOfficeClause-1.06" className="text-sm font-medium leading-none">
                    Include standard clause for Registered Office requirements
                  </Label>
                </div>

                <h4 className="text-xs font-semibold text-violet-800 mb-2 mt-2">Registered Office Requirements</h4>
                <div className="p-4 bg-violet-50 border border-violet-200 rounded-lg shadow-sm text-xs text-gray-700 mb-3">
                  <div className="break-inside-avoid border-l-4 border-violet-300 px-3 py-2">
                    {uneditableClause106.split(/\n+/).map((line, idx) => {
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

                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.06. Clause included:', formData.block1_06_includeRegisteredOfficeClause)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.07' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.07a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText107a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                </Accordion>

                <p className="text-sm text-gray-700">Select the appropriate statement</p>

                <RadioGroup 
                  value={formData.block1_07_restrictionsOption}
                  onValueChange={handleRestrictionsOptionChange}
                  className="space-y-2 pt-1"
                >
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="noAdditionalRestrictions" id={`${subSection.id}-noRestrictions`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-noRestrictions`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society's capacity, rights, powers, and privileges are subject to no additional restrictions.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-3 rounded-md border bg-slate-100 border-slate-200 hover:border-purple-300 has-[:checked]:border-purple-500 has-[:checked]:bg-purple-50">
                    <RadioGroupItem value="hasSpecificRestrictions" id={`${subSection.id}-hasRestrictions`} className="mt-1" />
                    <Label htmlFor={`${subSection.id}-hasRestrictions`} className="flex-1 text-sm font-normal text-gray-700">
                      The Society's capacity, rights, powers, and privileges are subject to the following restrictions:
                      {formData.block1_07_restrictionsOption === 'hasSpecificRestrictions' && (
                        <div className="mt-3 space-y-3">
                          {(formData.block1_07_specificRestrictions || []).map((restriction, index) => (
                            <div key={restriction.id} className="p-3 border border-dashed border-gray-300 rounded-md bg-white space-y-2">
                              <Label htmlFor={`restriction-${restriction.id}`} className="text-sm font-medium text-gray-700">Restriction {index + 1}</Label>
                              <Textarea 
                                id={`restriction-${restriction.id}`}
                                placeholder="e.g. The Society does not have the power to borrow money"
                                value={restriction.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleSpecificRestrictionChange(index, e.target.value)}
                                className="w-full p-2 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic text-sm bg-white my-1"
                                rows={2}
                              />
                              <div className="text-right">
                                <Button variant="ghost" size="sm" onClick={() => removeSpecificRestriction(restriction.id)} className="text-red-600 hover:text-red-700">
                                  <Trash2Icon className="w-4 h-4 mr-1" /> Remove
                                </Button>
                              </div>
                            </div>
                          ))}
                          {(formData.block1_07_specificRestrictions || []).length < 20 && (
                            <Button type="button" variant="outline" size="sm" onClick={addSpecificRestriction} className="mt-2">
                              <PlusCircleIcon className="w-4 h-4 mr-2" /> Add Restriction
                            </Button>
                          )}
                        </div>
                      )}
                    </Label>
                  </div>
                </RadioGroup>

                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.07. Data:', formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.08' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.08a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText108a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                </Accordion>

                <p className="text-sm text-gray-700 mb-2">Enter your Society balance date and select to include the clause in your constitution</p>
                
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-gray-700">
                  The Society's financial year shall commence on <span className="font-semibold">{getCalculatedStartDate(formData.block1_08_balanceDateDay, formData.block1_08_balanceDateMonth)}</span> of each year and end on 
                  <div className="inline-flex space-x-2 mx-1 my-1 align-baseline">
                    <Select 
                        value={formData.block1_08_balanceDateDay || undefined}
                        onValueChange={(value: string) => updateFormData('block1_08_balanceDateDay', value)}
                    >
                        <SelectTrigger className="w-[100px] h-8 text-sm p-1 bg-white placeholder-gray-400">
                            <SelectValue placeholder="Day..." />
                        </SelectTrigger>
                        <SelectContent>
                            {days.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select
                        value={formData.block1_08_balanceDateMonth || undefined}
                        onValueChange={(value: string) => updateFormData('block1_08_balanceDateMonth', value)}
                    >
                        <SelectTrigger className="w-[130px] h-8 text-sm p-1 bg-white placeholder-gray-400">
                            <SelectValue placeholder="Month..." />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(m => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                        </SelectContent>
                    </Select>
                  </div>
                  (the latter date being the Society's balance date).
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.08. Data:', formData)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id === '1.09' && (
              <>
                <Accordion type="single" collapsible className="w-full bg-white rounded-md border mb-3">
                  <AccordionItem value="help-1.09a" className="border-b-0"><AccordionTrigger className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-t-md"><div className="flex items-center"><HelpCircle className="w-4 h-4 mr-2 text-purple-600" />Helpful information for this question</div></AccordionTrigger><AccordionContent className="px-4 pb-3 pt-1 text-sm text-gray-600">{helpText109a.split(/\n+/).map((p, i) => (<p key={i} className={i > 0 ? "mt-2" : ""}>{p.trim()}</p>))}</AccordionContent></AccordionItem>
                </Accordion>

                <p className="text-sm text-gray-700 mb-2">Modify and select to include the clause in your constitution</p>
                
                <div className="p-3 bg-slate-100 border border-slate-200 rounded-md text-sm text-gray-700">
                  The tikanga or culture of the Society is as follows:
                  <Textarea 
                    placeholder="Describe your tikanga, kawa, culture or practice here…" 
                    value={formData.block1_09_tikangaDescription || ''}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateFormData('block1_09_tikangaDescription', e.target.value)}
                    className="block w-full p-2 my-1 border-gray-300 rounded-md placeholder-gray-400 placeholder:italic focus:border-purple-500 focus:ring-purple-500 text-sm bg-white"
                    rows={4}
                  />
                  and this CONSTITUTION shall be interpreted having regard to that tikanga, kawa, culture or practice.
                </div>

                <div className="flex justify-end mt-4">
                  <button onClick={() => console.log('Update constitution for 1.09. Data:', formData.block1_09_tikangaDescription)} className="px-4 py-2 bg-[#8065F2] text-white text-sm font-medium rounded-md hover:bg-[#6d54d1]">Update Constitution</button>
                </div>
              </>
            )}

            {subSection.id !== '1.01' && subSection.id !== '1.02' && subSection.id !== '1.03' && subSection.id !== '1.04' && subSection.id !== '1.05' && subSection.id !== '1.06' && subSection.id !== '1.07' && subSection.id !== '1.08' && subSection.id !== '1.09' && (
              <p>Questions for {subSection.title} will be built here.</p>
            )}
          </div>
        </div>
      ))}

      {/* Main Block Save/Complete buttons */}
      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <button onClick={() => onSaveProgress(blockNumber)} className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Save Progress</button>
        <button onClick={() => onComplete(blockNumber)} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700">Mark Block as Complete</button>
      </div>
    </div>
  );
};

export default Block1SocietyInformation; 