import React from 'react';
import { ClipboardList, AlertTriangle, Info, CheckCircle, Download } from 'lucide-react';
import { Button } from '../ui/Button'; // Import shared Button

interface SummaryProps {
  formData: any; // Consider defining a proper type
  handleDownloadPlan: () => void;
}

export const Summary: React.FC<SummaryProps> = ({ formData, handleDownloadPlan }) => {

  // Log incoming formData
  console.log("Rendering Summary component with formData:", formData);

  // Generate action plan items based on form data
  const generateActionItems = () => {
    const actions: any[] = []; // Define type for actions if possible
    
    // Member requirements
    if (formData.hasMinimumMembers === false) {
      actions.push({
        title: "Increase membership to at least 10 members",
        description: "The 2022 Act requires a minimum of 10 members for registration and compliance.",
        priority: "high"
      });
    }
    
    // Committee requirements
    if (formData.hasMinimumCommittee === false) {
      actions.push({
        title: "Establish a committee with at least 3 members",
        description: "Every society must have a governing committee with a minimum of three members.",
        priority: "high"
      });
    }
    
    // Contact person
    if (formData.hasContactPerson === false) {
      actions.push({
        title: "Appoint at least one Contact Person",
        description: "The 2022 Act mandates each society to have 1 to 3 'contact persons' who are the primary contacts for the Registrar.",
        priority: "high"
      });
    }
    
    // Constitution
    if ((formData.organisationType === 'new' || formData.organisationType === 'reregistering') && 
        formData.hasCompliantConstitution === false) {
      actions.push({
        title: "Draft or amend constitution to comply with 2022 Act",
        description: "Your constitution must include required clauses such as member consent, dispute resolution process, and contact person appointment method.",
        priority: "high",
        resources: ["Constitution Builder Tool"]
      });
    }
    
    // Officer eligibility
    if (formData.officersEligible === false) {
      actions.push({
        title: "Obtain signed officer consent forms",
        description: "Each officer must sign a consent and certification that they are not disqualified from holding office.",
        priority: "medium"
      });
    }
    
    // Officer awareness
    if (formData.officersAware === false) {
      actions.push({
        title: "Educate officers on their statutory duties",
        description: "Hold a briefing or provide resources about the six duties defined in the 2022 Act.",
        priority: "medium",
        resources: ["Officer Duties Guide"]
      });
    }
    
    // Financial reporting
    if (formData.annualSpending) {
      let tier;
      switch(formData.annualSpending) {
        case 'under50k': tier = "simplified financial statements"; break;
        case '50k-140k': tier = "XRB Tier 4 standard"; break;
        case '140k-2m': tier = "XRB Tier 3 reporting"; break;
        case '2m-30m': tier = "XRB Tier 2 standards"; break;
        case 'over30m': tier = "XRB Tier 1 standards"; break;
        default: tier = "appropriate standards";
      }
      actions.push({
        title: `Prepare annual financial statements using ${tier}`,
        description: "All societies must prepare and file annual financial statements under the 2022 Act.",
        priority: "medium",
        resources: ["XRB Reporting Standards Guide"]
      });
    }
    
    // Audit requirements
    if (formData.expenditureOverThreshold === true || formData.requiresAudit === true) {
      actions.push({
        title: "Arrange annual audit or review of financial statements",
        description: formData.isCharity 
          ? "Your charity requires an audit due to its size under the Charities Act."
          : "Your society requires an audit due to its size or stakeholder requirements.",
        priority: "medium"
      });
    }
    
    // Privacy considerations
    if (formData.handlesPersonalInfo === true) {
      actions.push({
        title: "Ensure compliance with Privacy Act 2020",
        description: "Develop a privacy statement and follow the 13 information privacy principles.",
        priority: "medium",
        resources: ["Privacy Act Compliance Guide"]
      });
    }
    
    // Default items for all societies
    actions.push({
      title: "File annual return with Registrar",
      description: "All societies must file an annual return with the Registrar of Incorporated Societies.",
      priority: "medium"
    });
    
    if (formData.isCharity === true) {
      actions.push({
        title: "File annual return with Charities Services",
        description: "All registered charities must file an annual return with Charities Services.",
        priority: "medium"
      });
    }
    
    if (formData.hasExternalFunding === true) {
      actions.push({
        title: "Prepare funder accountability reports",
        description: "Meet reporting requirements for any grants or external funding received.",
        priority: "medium"
      });
    }
    
    // Add a default low priority item if list is empty or only has defaults
    const nonDefaultActions = actions.filter(a => a.priority === 'high');
    if (nonDefaultActions.length === 0 && actions.length <= 3) {
       actions.push({
         title: "Review society activities against constitution",
         description: "Regularly ensure your society's operations align with its stated purposes and rules.",
         priority: "low"
       });
    }
    
    console.log("Generated action items:", actions); // Log generated actions
    return actions;
  };

  const actionItems = generateActionItems();
  
  // Log the final action items array
  console.log("Final actionItems to render:", actionItems);
  
  const priorityOrder: { [key: string]: number } = { high: 0, medium: 1, low: 2 };

  const priorityIcons: { [key: string]: React.ReactElement } = {
    high: <AlertTriangle className="text-red-500 w-4 h-4" />, // Use red for high priority
    medium: <Info className="text-blue-500 w-4 h-4" />,
    low: <CheckCircle className="text-green-500 w-4 h-4" />
  };

  // Add a check for empty action items
  if (!actionItems || actionItems.length === 0) {
    console.warn("No action items generated for summary.");
    return (
      <div className="text-center py-10 text-gray-500">
        <p>Could not generate action plan based on the provided answers.</p>
        <p>Please go back and ensure all steps are completed.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center text-center mb-8">
        <ClipboardList className="text-brand-primary w-9 h-9 mb-2" />
        <h3 className="text-xl font-semibold mb-2 text-gray-900">Your Compliance Roadmap</h3>
        <p className="text-gray-600">
          Based on your answers, we've created a personalized action plan to help your society comply with the Incorporated Societies Act 2022.
        </p>
      </div>

      {/* Priority Legend */}
      <div className="flex flex-wrap gap-4 mb-4 pb-2 border-b border-gray-200 text-xs text-gray-600">
        <div className="flex items-center gap-1">{priorityIcons.high} <span>Critical</span></div>
        <div className="flex items-center gap-1">{priorityIcons.medium} <span>Important</span></div>
        <div className="flex items-center gap-1">{priorityIcons.low} <span>Recommended</span></div>
      </div>

      <div className="space-y-4">
        {actionItems
          .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]) // Sort by priority
          .map((action, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-md border-l-4 ${
                action.priority === 'high' ? 'bg-red-50 border-red-500' : 
                action.priority === 'medium' ? 'bg-blue-50 border-blue-500' : 
                'bg-green-50 border-green-500'}`}
            >
              <div className="flex items-center gap-2 mb-2">
                {priorityIcons[action.priority]}
                <h4 className="font-semibold text-gray-800">{action.title}</h4>
              </div>
              <p className="text-sm mb-2 text-gray-700">{action.description}</p>
              {action.resources && action.resources.length > 0 && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Resources: </span>
                  {action.resources.map((resource: string, i: number) => (
                    <React.Fragment key={i}>
                      {/* TODO: Add actual resource links */}
                      <a href="#" className="text-brand-primary hover:underline">{resource}</a>
                      {i < action.resources.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h4 className="font-semibold mb-3 text-gray-800">Additional Resources</h4>
        {/* TODO: Add actual resource links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <a href="#" className="text-brand-primary hover:underline text-sm">Incorporated Societies Act 2022 Overview</a>
          <a href="#" className="text-brand-primary hover:underline text-sm">Constitution Builder Tool</a>
          <a href="#" className="text-brand-primary hover:underline text-sm">Financial Reporting Requirements Guide</a>
          <a href="#" className="text-brand-primary hover:underline text-sm">Officer Duties Handbook</a>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex justify-center mt-8">
        <Button onClick={handleDownloadPlan} leftIcon={<Download className="w-4 h-4"/>}>
          Download Action Plan (PDF)
        </Button>
      </div>
    </div>
  );
}; 