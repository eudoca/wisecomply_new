import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '../../wizard/RadioGroup';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { HelpCircle, AlertTriangle, BookOpen } from 'lucide-react';
import { Tooltip } from '../../wizard/Tooltip';
import { cn } from '@/lib/utils';

interface Step1SocietyInfoProps {
  onComplete: () => void;
}

// Define the structure for the form data
interface Step1FormData {
  currentNameConfirmed?: boolean | null;
  charityStatusSelection?: 'a' | 'b' | null;
  selectedCharitableCategory?: 'poverty' | 'education' | 'religion' | 'community' | null;
  charitablePurposeDescription?: string | null;
  primaryPurposes?: string;
  hasRestrictions?: boolean | null;
  restrictionsDescription?: string;
  // financialYearStart?: string; // Replaced by day/month
  financialYearStartDay?: string | null;
  financialYearStartMonth?: string | null; // Store month number (0-11) or name
  tikangaDetails?: string;
  definitionsContent?: string | null; // Added for editable definitions
  // Acknowledged flags
  charityPurposeAcknowledged?: boolean;
  nonProfitAcknowledged?: boolean;
  contactPersonAcknowledged?: boolean;
  contactPersonDetailsAcknowledged?: boolean;
  registerOfficeChangeAcknowledged?: boolean;
  registerOfficeLocationAcknowledged?: boolean; // Added for 1.4a button
}

// Initial definitions content
const defaultDefinitions = `Act means the Incorporated Societies Act 2022 or any Act which replaces it (including amendments to it from time to time), and any regulations made under the Act or under any Act which replaces it.
Annual General Meeting means a meeting of the Members of the Society held once per year which, among other things, will receive and consider reports on the Society's activities and finances.
Chairperson means the Officer responsible for chairing General Meetings and committee meetings, and who provides leadership for the Society.
Committee means the Society's governing body.
Constitution means the rules in this document.
Deputy Chairperson means the Officer elected or appointed to deputise in the absence of the Chairperson.
General Meeting means either an Annual General Meeting or a Special General Meeting of the Members of the Society.
Interested Member means a Member who is interested in a matter for any of the reasons set out in section 62 of the Act.
Interests Register means the register of interests of Officers, kept under this Constitution and as required by section 73 of the Act.
Matter means—
  the Society's performance of its activities or exercise of its powers; or
  an arrangement, agreement, or contract (a transaction) made or entered into, or proposed to be entered into, by the Society.
Member means a person who has consented to become a Member of the Society and has been properly admitted to the Society who has not ceased to be a Member of the Society.
Notice to Members includes any notice given by email, post, or courier.
Officer means a natural person who is:
  a member of the Committee, or
  occupying a position in the Society that allows them to exercise significant influence over the management or administration of the Society, including any Chief Executive or Treasurer.
Register of Members means the register of Members kept under this Constitution as required by section 79 of the Act.
Secretary means the Officer responsible for the matters specifically noted in this Constitution.
Special General Meeting means a meeting of the Members, other than an Annual General Meeting, called for a specific purpose or purposes.
Working Days mean as defined in the Legislation Act 2019. Examples of days that are not Working Days include, but are not limited to, the following — a Saturday, a Sunday, Waitangi Day, Good Friday, Easter Monday, ANZAC Day, the Sovereign's birthday, Te Rā Aro ki a Matariki/Matariki Observance Day, and Labour Day.`;

const Step1SocietyInfo: React.FC<Step1SocietyInfoProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState<Step1FormData>({ 
    selectedCharitableCategory: null,
    charitablePurposeDescription: null,
    definitionsContent: defaultDefinitions, // Initialize with default definitions
  });
  const societyName = "Wellington Community Sports Club";

  const handleChange = (name: keyof Step1FormData, value: string | boolean | number | null | undefined) => { 
    setFormData(prev => ({
      ...prev,
      [name]: value === undefined ? null : value 
    }));
  };
  
  const handleSelectChange = (name: keyof Step1FormData) => (value: string) => {
    // Ensure null is passed if value is empty string for selects
    handleChange(name, value === '' ? null : value as Step1FormData[typeof name]); 
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof Step1FormData, value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof Step1FormData, value);
  };
  
   const handleWizardRadioChange = (name: keyof Step1FormData, value: string | boolean | number) => {
     if (name === 'selectedCharitableCategory' && value !== formData.selectedCharitableCategory) {
       setFormData(prev => ({
         ...prev,
         selectedCharitableCategory: value as Step1FormData['selectedCharitableCategory'],
         charitablePurposeDescription: null
       }));
     } else {
       handleChange(name, value);
     }
   };

  const handleAcknowledgement = (field: keyof Step1FormData) => {
    console.log(`${field} acknowledged.`);
    // Optionally set state: setFormData(prev => ({ ...prev, [field]: true }));
  };
  
  // Updated function to generate balance date description
  const getBalanceDateDescription = (startDay: string | undefined | null, startMonth: string | undefined | null): string => {
    if (!startDay || !startMonth) return 'Not set';
    
    const day = parseInt(startDay, 10);
    const monthIndex = parseInt(startMonth, 10); // Assuming month is stored as 0-11

    if (isNaN(day) || isNaN(monthIndex) || monthIndex < 0 || monthIndex > 11) {
        return 'Invalid selection';
    }

    // Create a date just to format the start month/day correctly
    // Use a non-leap year like 2001 to avoid issues with Feb 29
    const tempStartDate = new Date(2001, monthIndex, day);
    
    // Calculate the day before
    const balanceDate = new Date(tempStartDate);
    balanceDate.setDate(tempStartDate.getDate() - 1);

    const startDayFormatted = tempStartDate.toLocaleDateString('en-NZ', { day: 'numeric' });
    const startMonthFormatted = tempStartDate.toLocaleDateString('en-NZ', { month: 'long' });
    const balanceDayFormatted = balanceDate.toLocaleDateString('en-NZ', { day: 'numeric' });
    const balanceMonthFormatted = balanceDate.toLocaleDateString('en-NZ', { month: 'long' });

    return `${balanceDayFormatted} ${balanceMonthFormatted}`;
  };

  const handleSaveAndComplete = () => {
    console.log('Saving Step 1 Data:', formData);
    onComplete();
  };

  // New handler for just saving data
  const handleSaveOnly = () => {
    console.log('Saving Step 1 Data (Save Only):', formData);
    // Optionally, you might add logic here to actually persist the data 
    // via an API call without triggering the onComplete callback.
  };

  const helpText = (text: React.ReactNode) => (
    <div className="bg-white p-4 my-5 rounded-md relative text-xs text-gray-700">
      <div className="flex items-center mb-2">
        <BookOpen className="w-5 h-5 mr-2 flex-shrink-0 text-blue-600" />
        <h4 className="font-semibold text-gray-800">Relevant Sections</h4>
      </div>
      <div>{text}</div>
    </div>
  );
  
  const uneditableBox = (content: React.ReactNode, acknowledgeField?: keyof Step1FormData) => (
    <div className="bg-purple-50 border border-purple-200 rounded-md p-4 text-sm text-purple-900 mb-4">
      {content}
      {acknowledgeField && (
        <div className="mt-3 text-right">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => handleAcknowledgement(acknowledgeField)} 
          >
            Update constitution
          </Button>
        </div>
      )}
    </div>
  );
  
  // New helper function for the alert/context box
  const alertBox = (text: React.ReactNode) => (
    <div className="bg-yellow-50 p-4 my-5 rounded-md relative text-xs text-yellow-800">
      <div className="flex items-center mb-2">
        <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 text-yellow-500" />
        <h4 className="font-semibold text-yellow-900">Further Context</h4>
      </div>
      <div>{text}</div>
    </div>
  );
  
  // Options for day and month selects
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = [
    { value: "0", label: "January" }, { value: "1", label: "February" }, { value: "2", label: "March" },
    { value: "3", label: "April" }, { value: "4", label: "May" }, { value: "5", label: "June" },
    { value: "6", label: "July" }, { value: "7", label: "August" }, { value: "8", label: "September" },
    { value: "9", label: "October" }, { value: "10", label: "November" }, { value: "11", label: "December" }
  ];

  return (
    <div className="space-y-8">
      {/* === NEW SECTION: 1.01 Name === */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.01 Name</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
            {/* Content from original 1.1a */}
            <div className="pb-4">
              <div className="mb-2">
                <span 
                  className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                  style={{ backgroundColor: '#8065F2' }}
                >1.01a</span>
                <label className="font-medium text-gray-700 block">{`The current name of your registered Society is: ${societyName}`}</label>
              </div>
              <div className="pl-8">
                <RadioGroup
                  label="" 
                  name="currentNameConfirmed"
                  options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                  value={formData.currentNameConfirmed}
                  onChange={(value: string | boolean | number) => handleWizardRadioChange('currentNameConfirmed', value)}
                />
              </div>
            </div>
          </div>
          {/* Right Column (1/3) - Add info boxes */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {/* Added helpText */}
            {helpText(
              "For full naming requirements, refer to Section 11 of the Incorporated Societies Act 2022."
            )}
             {/* Added alertBox */}
            {alertBox(
              "The Incorporated Societies Act 2022 requires every society to have a legal name that clearly identifies it. This name must appear in the constitution and be used consistently in all official matters."
            )}
          </div>
        </div>
      </div>

      {/* === NEW SECTION: 1.02 Charitable Status === */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.02 Charitable Status</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
            {/* Content from original 1.1b */}
            <div className="pb-4">
              <div className="mb-2">
                <span 
                  className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                  style={{ backgroundColor: '#8065F2' }}
                >1.02a</span>
                <label className="font-medium text-gray-700 block">Select which statement best applies to your society:</label>
              </div>
              <div className="pl-8">
                <RadioGroup
                    label=""
                    name="charityStatusSelection"
                    options={[
                        { value: 'a', label: 'a. The Society is currently registered, or intends after incorporation, to be registered as a charitable entity under the Charities Act 2005.' }, 
                        { value: 'b', label: 'b. The Society is not currently registered as a charitable entity under the Charities Act 2005, but may choose to apply for registration as a charitable entity in the future.' }
                    ]}
                    value={formData.charityStatusSelection}
                    onChange={(value) => handleWizardRadioChange('charityStatusSelection', value)}
                 />
              </div>
            </div>
          </div>
          {/* Right Column (1/3) */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
             {/* Info box originally from 1.1b */}
             {alertBox(
               "If the society qualifies as a charity under the Charities Act, it must meet ongoing reporting and purpose requirements under both that Act and the Incorporated Societies Act. If not registered, the society avoids charity-specific obligations but must still comply with general Incorporated Societies Act rules. This distinction affects governance, tax status and reporting."
             )}
          </div>
        </div>
      </div>

      {/* === NEW SECTION: 1.03 Purposes === */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.03 Purposes</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
             {/* Conditional Content moved from original 1.1 - based on selection in 1.02 */}
             {formData.charityStatusSelection === 'a' && (
              <div className="pl-4 border-l-4 border-slate-300 py-4 space-y-4">
                 {/* 1.03a */}
                <div>
                  <div className="mb-1">
                    <span 
                      className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2 flex-shrink-0" 
                      style={{ backgroundColor: '#8065F2' }}
                    >1.03a</span>
                    <label htmlFor="charitablePurposes" className="font-medium text-gray-700 block">The Society is established and maintained exclusively for charitable purposes. Select the primary category:</label>
                  </div>
                  <div className="pl-8 space-y-4">
                    <RadioGroup
                      label="Select one category:"
                      name="selectedCharitableCategory"
                      options={[
                        { value: 'poverty', label: 'Relieving poverty' }, 
                        { value: 'education', label: 'Advancing education' }, 
                        { value: 'religion', label: 'Advancing religion' }, 
                        { value: 'community', label: 'Benefitting the community' }
                      ]}
                      value={formData.selectedCharitableCategory}
                      onChange={(value) => handleWizardRadioChange('selectedCharitableCategory', value)}
                    />
                    {formData.selectedCharitableCategory && (
                      <div>
                        <label htmlFor="charitablePurposeDescription" className="block text-sm font-medium text-gray-700 mb-1">
                          Describe how the society achieves this purpose (e.g., "by providing free meals..."): 
                        </label>
                        <Textarea
                          id="charitablePurposeDescription"
                          name="charitablePurposeDescription"
                          rows={3} 
                          value={formData.charitablePurposeDescription || ''}
                          onChange={handleTextChange}
                          className="mt-1 bg-white"
                          placeholder={`Describe how the society will ${formData.selectedCharitableCategory}...`}
                        />
                      </div>
                    )}
                  </div>
                </div>
                 {/* 1.03b */}
                <div>
                  <div className="mb-1">
                    <span 
                      className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                      style={{ backgroundColor: '#8065F2' }}
                    >1.03b</span>
                  </div>
                  {uneditableBox(
                    <p>Any income, benefit, or advantage must be used exclusively to advance the charitable purposes of the Society.</p>,
                    'charityPurposeAcknowledged'
                  )}
                </div>
              </div>
            )}

            {formData.charityStatusSelection === 'b' && (
              <div className="pl-4 border-l-4 border-slate-300 py-4 space-y-4">
                {/* 1.03c */}
                <div>
                  <div className="mb-1">
                    <span 
                      className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                      style={{ backgroundColor: '#8065F2' }}
                    >1.03c</span>
                    <label htmlFor="primaryPurposes" className="font-medium text-gray-700 block">The primary purposes of the Society is to:</label>
                  </div>
                  <div className="pl-8">
                    <Textarea
                      id="primaryPurposes"
                      name="primaryPurposes"
                      rows={3}
                      value={formData.primaryPurposes || ''}
                      onChange={handleTextChange}
                      placeholder="Add description of purpose"
                      className="mt-1 bg-white"
                    />
                  </div>
                </div>
                {/* 1.03d */}
                <div>
                  <div className="mb-1">
                    <span 
                      className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                      style={{ backgroundColor: '#8065F2' }}
                    >1.03d</span>
                    <label className="font-medium text-gray-700 block">The Society must not operate for the purpose of, or with the effect of -</label>
                  </div>
                  {uneditableBox(
                    <div>
                      <ul className="list-disc pl-5 space-y-1 mb-3">
                        <li>Distributing, any gain, profit, surplus, dividend, or other similar financial benefit to any of its Members (whether in money or in kind); or</li>
                        <li>Having capital that is divided into shares or stock held by its Members; or</li>
                        <li>Holding, property in which its members have a disposable interest (whether directly, or in the form of shares or stock in the capital of the society or otherwise).</li>
                      </ul>
                      <p className="mb-2 font-medium">However, the Society will not operate for the financial gain of Members simply if the Society—</p>
                      <ul className="list-disc pl-5 space-y-1">
                          <li>Engages in trade,</li>
                          <li>Pays a Member for matters that are incidental to the purposes of the Society, and the Member is a not-for-profit entity,</li>
                          <li>Distributes funds to a Member to further the purposes of the Society, and the Member—
                              <ul className="list-circle pl-5 space-y-1">
                                <li>Is a not-for-profit entity, and</li>
                                <li>Is affiliated or closely related to the Society, and</li>
                                <li>Has the same, or substantially the same, purposes as those of the Society.</li>
                              </ul>
                          </li>
                          <li>Reimburses a Member for reasonable expenses legitimately incurred on behalf of the Society or while pursuing the Society's purposes,</li>
                          <li>Provides benefits to members of the public or of a class of the public, including Members or their families,</li>
                          <li>Provides benefits to Members or their families to alleviate hardship,</li>
                          <li>Provides educational scholarships or grants to Members or their families,</li>
                          <li>Pays a Member a salary or wages or other payments for services to the Society on arm's length terms,</li>
                          <li>Provides a Member with incidental benefits (e.g., trophies, prizes, or discounts) in accordance with the purposes of the Society.</li>
                          <li>On removal of the Society from the Register of Incorporated Societies, distributes its surplus assets to a not-for-profit entity.</li>
                        </ul>
                    </div>,
                    'nonProfitAcknowledged'
                  )}
                </div>
              </div>
            )}
          </div>
          {/* Right Column (1/3) */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {/* General help text moved from original 1.1 */}
             {helpText(
               <>
                 For further details regarding the purposes of the Society and non-profit operations, please refer to {' '}
                 <a 
                   href="https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100809.html?search=ts_act%40bill%40regulation%40deemedreg_society_resel_25_a&p=1#LMS621453"
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="text-blue-600 underline hover:text-blue-800"
                 >
                   Section 11 of the Incorporated Societies Act 2022
                 </a>.
               </>
             )}

             {/* Conditional Info Boxes moved from original 1.1 */}
             {formData.charityStatusSelection === 'a' && (
               <>
                 {helpText(
                   <>
                     For further details regarding charitable purposes, refer to {' '}
                     <a 
                       href="https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100809.html?search=ts_act%40bill%40regulation%40deemedreg_society_resel_25_a&p=1#LMS621453"
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-blue-600 underline hover:text-blue-800"
                     >
                       Section 11 of the Incorporated Societies Act 2022
                     </a> {' '}
                     and the {' '}
                     <a 
                       href="https://www.legislation.govt.nz/act/public/2005/0039/latest/DLM344361.html"
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-blue-600 underline hover:text-blue-800"
                     >
                       Charities Act 2005
                     </a>.
                   </>
                 )}
               </>
             )}
 
             {formData.charityStatusSelection === 'b' && (
               <>
                 {helpText(
                   <>
                     For further details regarding the purposes of the Society and non-profit operations, please refer to {' '}
                     <a 
                       href="https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100809.html?search=ts_act%40bill%40regulation%40deemedreg_society_resel_25_a&p=1#LMS621453"
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="text-blue-600 underline hover:text-blue-800"
                     >
                       Section 11 of the Incorporated Societies Act 2022
                     </a>.
                   </>
                 )}
                 {alertBox(
                   "Every society\'s constitution must set out its \'objects\' or purposes (what it intends to do or achieve). Importantly your society's purpose cannot be for the financial gain (benefit) of its members. The society exists only to serve charitable purposes. such as; The society aims to help people in financial hardship. The society aims to improve access to or quality of education. The society supports religious beliefs or practices. The society exists to provide benefit to the public or a section of the public. This aligns the society with the requirements of the Charities Act 2005, meaning all its activities must advance recognised charitable causes such as relief of poverty, education, religion, or other public benefit."
                 )}
                 {alertBox(
                   "Every society must have clear purposes in its constitution. While your society may not be a registered charity, it still cannot be set up for the private financial gain of its members. This means your society: Can have activities that generate income (e.g. running a bar, hosting events), Can pay members or staff fairly for services, Can reimburse expenses and offer reasonable benefits like scholarships, prizes or hardship support, …but it must always use its resources in ways that support its stated purposes—not to personally profit members. This structure is required under the Incorporated Societies Act 2022 to ensure that even non-charitable societies operate in a way that benefits their wider membership or community, not just individuals."
                 )}
               </>
             )}
           </div>
         </div>
       </div>
       {/* === END OF NEW SECTION 1.03 === */}

      {/* OLD Section 1.1 wrapper is removed */}
      {/* 
      <div className="space-y-4 p-6 rounded-lg"> 
         ... old content ...
      </div>
      */}

      {/* 1.04 Definitions */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.04 Definitions</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) - Interactive/Main Content */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
             {/* Replace uneditableBox with Textarea */}
            <div className="mb-4">
               <p className="mb-2 text-sm text-gray-600">Review and update the definitions as needed. Ensure they align with the Incorporated Societies Act 2022.</p>
               <Textarea 
                 id="definitionsContent"
                 name="definitionsContent"
                 rows={15} // Adjust rows as needed
                 value={formData.definitionsContent || ''}
                 onChange={handleTextChange}
                 className="w-full bg-white p-2 border border-gray-300 rounded-md text-sm"
                 placeholder="Enter definitions here..."
               />
             </div>
          </div>
          {/* Right Column (1/3) - Informational */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {helpText(
              <>
                For further details regarding the meanings and obligations of terms, please refer to {' '}
                <a 
                  href="https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100809.html?search=ts_act%40bill%40regulation%40deemedreg_society_resel_25_a&p=1#LMS621453"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Section 11 of the Incorporated Societies Act 2022
                </a>.
              </>
            )}
            {alertBox(
              "Some terms used throughout this constitution are part of a starter set of definitions. These terms are specifically defined in this section to ensure compliance with the Incorporated Societies Act 2022. If you choose to add new terms or modify any of the existing terms, please ensure that you do not alter their intended meaning. The default set of terms has been carefully selected to align with the requirements of the Act. Where any of these defined terms are used in the Society\'s constitution, they should appear in bold type to indicate that they are defined here."
            )}
          </div>
        </div>
      </div>

      {/* 1.05 Contact Person */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.05 Contact Person</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) - Interactive/Main Content */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
             {/* 1.05a */}
            <div className="mb-4">
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.05a</span>
                </div>
                <div>
                  {uneditableBox(
                    <p>The Society shall have at least 1 but no more than 3 contact person(s) whom the Registrar can contact when needed.</p>,
                    'contactPersonAcknowledged'
                  )}
                </div>
            </div>
             {/* 1.05b */}
            <div>
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.05b</span>
                </div>
                <div>
                  {uneditableBox(
                    <div>
                        <p className="mb-2">The Society's contact person must be:</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li><b>Contact Person – Minimum Age:</b> At least 18 years of age; and</li>
                            <li><b>Contact Person – Residency:</b> Ordinarily resident in New Zealand.</li>
                            <li><b>Contact Person – Appointment:</b> A contact person can be appointed by the Committee or elected by the Members at a General Meeting.</li>
                            <li><b>Contact Person – Details Provided:</b> Each contact person's name must be provided to the Registrar of Incorporated Societies, along with their contact details, including:
                                  <ul className="list-circle pl-5">
                                      <li>A physical address or electronic address</li>
                                      <li>A telephone number</li>
                                  </ul>
                            </li>
                            <li><b>Contact Person – Notification of Change:</b> Any change in that contact person or that person's name or contact details shall be advised to the Registrar of Incorporated Societies within 20 Working Days of that change occurring, or the Society becoming aware of the change.</li>
                        </ul>
                    </div>,
                      'contactPersonDetailsAcknowledged'
                    )}
                </div>
            </div>
          </div>
          {/* Right Column (1/3) - Informational */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {helpText(
              <>
                For more details on the requirements for contact persons, please refer to {' '}
                <a 
                  href="https://www.legislation.govt.nz/act/public/2022/0012/latest/LMS100809.html?search=ts_act%40bill%40regulation%40deemedreg_society_resel_25_a&p=1#LMS621717"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Section 112-116 of the Incorporated Societies Act 2022
                </a>
              </>
            )}
            {alertBox(
              "The contact person(s) serve as the main point(s) of contact between the Society and the Registrar of Incorporated Societies. Their details will not be published on the Incorporated Societies Register, but will be used by the Registrar to contact the Society when needed. The contact person(s) should be reliable and accessible, ideally someone familiar with the Society's operations, such as a Committee member, Officer, or an administrator. While the Act doesn\'t specify particular duties for the contact person(s) beyond being reachable, it's important that the Society ensures their contact details are up-to-date and that any changes are reported to the Registrar within 20 working days. This helps ensure that communication remains smooth and efficient."
            )}
          </div>
        </div>
      </div>

      {/* 1.06 Registered Office */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.06 Registered Office</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) - Interactive/Main Content */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
             {/* 1.06a */}
            <div className="mb-4">
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.06a</span>
                </div>
                <div>
                     {/* Add acknowledgeField for button */}
                    {uneditableBox(
                      <p>The registered office of the Society shall be at such place in New Zealand as the Committee from time to time determines.</p>,
                      'registerOfficeLocationAcknowledged'
                    )}
                </div>
            </div>
             {/* 1.06b */}
            <div>
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.06b</span>
                </div>
                <div>
                     {/* Alert box moved to right column */} 
                    {/* Wrap notification text in uneditableBox */}
                    {uneditableBox(
                      <div>
                        <p>Any change to the registered office shall be notified to the Registrar of Incorporated Societies:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>at least 5 Working Days before the change is to take effect; and</li>
                          <li>in the form and manner required by the Incorporated Societies Act 2022.</li>
                        </ul>
                      </div>,
                      'registerOfficeChangeAcknowledged'
                    )}
                </div>
            </div>
          </div>
           {/* Right Column (1/3) - Informational */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
             {helpText("For more details on the requirements for the registered office, please refer to Section [TODO: Find Section] of the Incorporated Societies Act 2022")}
             {alertBox(
               "Under the Incorporated Societies Act 2022, every society must have a street address for its registered office, which serves as the official place where documents, notices, and legal communications can be sent. This address is important because it is where official letters, legal notices, and documents can be delivered to the Society. In some cases, such as legal proceedings, documents can be served by leaving them at the registered office or delivering them to an officer or employee of the Society there."
             )}
             {/* Moved alertBox for 1.4b here */}
             <div className="text-xs font-semibold text-white uppercase mb-1">Info for 1.4b</div>
             {alertBox(
               "The Act requires timely updates to ensure accurate public records. Failure to notify may lead to penalties or communication breakdowns."
             )}
          </div>
        </div>
      </div>

      {/* 1.07 Restrictions on Powers */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.07 Restrictions on Powers</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
           {/* Left Column (2/3) - Interactive/Main Content */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
            {/* 1.07a */}
            <div className="mb-4 pb-4">
                <div className="mb-2">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.07a</span>
                  <label className="font-medium text-gray-700 block">Are the Society's capacity, rights, powers or privileges subject to any restrictions?</label>
                </div>
                <div className="pl-8">
                  <RadioGroup
                    label="" 
                    name="hasRestrictions"
                    options={[{ value: true, label: 'Yes' }, { value: false, label: 'No' }]}
                    value={formData.hasRestrictions}
                    onChange={(value: string | boolean | number) => handleWizardRadioChange('hasRestrictions', value)}
                  />
                   {/* Alert box moved to right column */}
                  {/* {alertBox(
                    "This reinforces that resources must stay inside the Society and be used for its stated purpose, not distributed privately."
                  )} */}
              </div>
            </div>

            {formData.hasRestrictions === true && (
              <div className="pl-4 border-l-4 border-blue-200 py-4 mb-4">
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.07b</span>
                  <label htmlFor="restrictionsDescription" className="font-medium text-gray-700 block">Any income, benefit, or advantage must be applied to further the purposes of the Society.</label>
                </div>
                <div className="pl-8">
                  <Textarea
                    id="restrictionsDescription"
                    name="restrictionsDescription"
                    rows={4}
                    value={formData.restrictionsDescription || 
    `The Society's capacity, rights, powers, and privileges are subject to the following restrictions:
    [] The Society does not have the power to borrow money.
    [] Other [insert as required]`}
                    onChange={handleTextChange}
                    className="mt-1 bg-white"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Right Column (1/3) - Informational */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {helpText("For more details on restrictions on powers, please refer to Section [TODO: Find Section] of the Incorporated Societies Act 2022")}
            {/* Moved alertBox for 1.5a here */}
            <div className="text-xs font-semibold text-white uppercase mb-1">Info for 1.5a</div>
            {alertBox(
              "This reinforces that resources must stay inside the Society and be used for its stated purpose, not distributed privately."
            )}
          </div>
        </div>
      </div>

      {/* 1.08 Balance Date */}
      <div className="space-y-4 p-6 rounded-lg">
         <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.08 Balance Date</h3>
         <div className="flex flex-col md:flex-row md:items-stretch">
           {/* Left Column (2/3) - Interactive/Main Content */}
           <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
            <div className="mb-4 space-y-3">
                <div className="mb-1">
                  <span 
                    className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                    style={{ backgroundColor: '#8065F2' }}
                  >1.08a</span>
                  <label className="font-medium text-gray-700 block">The Society's financial year shall commence on:</label>
                </div>
              <div className="flex items-center gap-4 pl-8">
                  <div className="w-1/2">
                    <label htmlFor="financialYearStartDay" className="block text-xs font-medium text-gray-700 mb-1">Day</label>
                    <Select 
                      onValueChange={handleSelectChange('financialYearStartDay')} 
                      value={formData.financialYearStartDay || undefined}
                    >
                      <SelectTrigger id="financialYearStartDay" className="bg-white">
                        <SelectValue placeholder="Day..." />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map(day => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="financialYearStartMonth" className="block text-xs font-medium text-gray-700 mb-1">Month</label>
                      <Select 
                      onValueChange={handleSelectChange('financialYearStartMonth')} 
                      value={formData.financialYearStartMonth || undefined}
                    >
                      <SelectTrigger id="financialYearStartMonth" className="bg-white">
                        <SelectValue placeholder="Month..." />
                      </SelectTrigger>
                      <SelectContent>
                          {months.map(month => (
                          <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <p className="mt-2 text-sm text-gray-600 pl-8">
                Balance date (end of financial year): {getBalanceDateDescription(formData.financialYearStartDay, formData.financialYearStartMonth)}
              </p>
            </div>
           </div>
           {/* Right Column (1/3) - Informational */}
           <div 
             className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
             style={{ backgroundColor: '#8065F2' }}
           >
             {helpText("For more details on the balance date, please refer to Section [TODO: Find Section] of the Incorporated Societies Act 2022")}
             {alertBox(
              "The balance date sets key deadlines: your society must hold its annual general meeting and file financial statements with the Registrar within 6 months of this date. The Act and Regulations determine your specific financial reporting and auditing requirements."
             )}
           </div>
         </div>
      </div>

      {/* 1.09 Tikanga, kawa, culture or practice */}
      <div className="space-y-4 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#8065F2' }}>1.09 Tikanga, kawa, culture or practice and other matters</h3>
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Left Column (2/3) - Interactive/Main Content */}
          <div className="w-full md:w-2/3 space-y-4 bg-gray-100 p-4 rounded-l-md">
             {/* 1.09a */}
            <div className="mb-1">
              <span 
                className="inline-flex items-center justify-center w-12 h-8 rounded-md text-white text-xs font-bold mb-2" 
                style={{ backgroundColor: '#8065F2' }}
              >1.09a</span>
              <label htmlFor="tikangaDetails" className="font-medium text-gray-700 block">The tikanga or culture of the Society is as follows:</label>
            </div>
            <div className="pl-8">
              <Textarea
                id="tikangaDetails"
                name="tikangaDetails"
                rows={4}
                value={formData.tikangaDetails || ''}
                onChange={handleTextChange}
                placeholder="Insert relevant details here"
                className="mt-1 bg-white"
              />
              <p className="mt-1 text-sm text-gray-600">and this Constitution shall be interpreted having regard to that tikanga, kawa, culture or practice.</p>
            </div>
          </div>
          {/* Right Column (1/3) - Informational */}
          <div 
            className="w-full md:w-1/3 flex flex-col space-y-4 p-4 rounded-r-md"
            style={{ backgroundColor: '#8065F2' }}
          >
            {helpText("For more details on these requirements, please refer to Section [TODO: Find Section] of the Incorporated Societies Act 2022")}
            {alertBox(
              "The Committee can create and update internal rules and cultural practices as needed, giving the Society flexibility to adopt operational procedures and culturally appropriate practices without amending the Constitution, provided such matters align with the Incorporated Societies Act 2022 and other applicable legislation."
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center pt-6 border-t border-gray-200 mt-8">
         {/* Add Save Only Button */}
        <Button onClick={handleSaveOnly} variant="outline" className="mr-2">Save</Button>
        <Button onClick={handleSaveAndComplete} variant="primary">Save & Mark Complete</Button>
      </div>
    </div>
  );
};

export default Step1SocietyInfo; 