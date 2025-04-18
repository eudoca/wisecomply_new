import React, { useState } from 'react';
import ProgressBar from './ProgressBar'; // Path is now correct
import { FilterIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from 'lucide-react';

// Mock data for compliance obligations
const complianceObligations = [
  {
    id: 'IS-1',
    title: 'Annual Financial Statement Submission',
    description: 'Prepare and submit annual financial statements as required by the Incorporated Societies Act',
    category: 'Incorporated Societies Act',
    priority: 'high',
    progress: 75,
    steps: [
      { id: 1, title: 'Gather financial records', completed: true },
      { id: 2, title: 'Prepare financial statements', completed: true },
      { id: 3, title: 'Review by committee', completed: true },
      { id: 4, title: 'Submit to regulatory body', completed: false }
    ]
  },
  {
    id: 'IS-2',
    title: 'Member Register Maintenance',
    description: 'Maintain an up-to-date register of members as required by the Incorporated Societies Act',
    category: 'Incorporated Societies Act',
    priority: 'medium',
    progress: 100,
    steps: [
      { id: 1, title: 'Create member database', completed: true },
      { id: 2, title: 'Update member details', completed: true },
      { id: 3, title: 'Annual verification of records', completed: true }
    ]
  },
  {
    id: 'HS-1',
    title: 'Workplace Hazard Assessment',
    description: 'Conduct regular workplace hazard assessments as required by Health and Safety regulations',
    category: 'Health and Safety',
    priority: 'high',
    progress: 33,
    steps: [
      { id: 1, title: 'Identify potential hazards', completed: true },
      { id: 2, title: 'Assess risks of each hazard', completed: false },
      { id: 3, title: 'Implement control measures', completed: false }
    ]
  },
   {
    id: 'HS-2',
    title: 'First Aid Training',
    description: 'Ensure designated staff members have current first aid certifications',
    category: 'Health and Safety',
    priority: 'medium',
    progress: 50,
    steps: [
      { id: 1, title: 'Identify required staff members', completed: true },
      { id: 2, title: 'Schedule training sessions', completed: true },
      { id: 3, title: 'Complete training', completed: false },
      { id: 4, title: 'Document certifications', completed: false }
    ]
  },
  {
    id: 'PR-1',
    title: 'Privacy Policy Update',
    description: "Ensure the organisation's privacy policy is up-to-date with current regulations",
    category: 'Privacy',
    priority: 'medium',
    progress: 25,
    steps: [
      { id: 1, title: 'Review current privacy policy', completed: true },
      { id: 2, title: 'Identify areas needing updates', completed: false },
      { id: 3, title: 'Draft updated policy', completed: false },
      { id: 4, title: 'Legal review of policy', completed: false }
    ]
  },
  {
    id: 'PR-2',
    title: 'Data Breach Response Plan',
    description: 'Develop and maintain a data breach response plan',
    category: 'Privacy',
    priority: 'high',
    progress: 0,
    steps: [
      { id: 1, title: 'Develop response procedures', completed: false },
      { id: 2, title: 'Assign response team roles', completed: false },
      { id: 3, title: 'Create notification templates', completed: false },
      { id: 4, title: 'Conduct response drill', completed: false }
    ]
  }
];

const ComplianceObligations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedObligations, setExpandedObligations] = useState<string[]>([]);

  const categories = ['All', 'Incorporated Societies Act', 'Health and Safety', 'Privacy'];

  const toggleExpand = (id: string) => {
    setExpandedObligations(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredObligations = selectedCategory === 'All'
    ? complianceObligations
    : complianceObligations.filter(obligation => obligation.category === selectedCategory);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Compliance Obligations</h2>
        <div className="flex items-center">
          <FilterIcon className="w-4 h-4 mr-2 text-gray-500" />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md text-sm p-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredObligations.map(obligation => (
          <div key={obligation.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
            <div className="p-4 flex justify-between items-center cursor-pointer" onClick={() => toggleExpand(obligation.id)}>
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-md">
                  <span className="font-mono text-sm font-medium">
                    {obligation.id}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{obligation.title}</h3>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className={`px-2 py-0.5 text-xs rounded-full ${
                      obligation.priority === 'high' ? 'bg-red-100 text-red-800' : 
                      obligation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {obligation.priority.charAt(0).toUpperCase() + obligation.priority.slice(1)} Priority
                    </span>
                    <span className="text-xs text-gray-500">
                      {obligation.category}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                 <div className="w-32">
                    <ProgressBar progress={obligation.progress} showPercentage={true} />
                 </div>
                 {expandedObligations.includes(obligation.id) ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                 ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                 )}
              </div>
            </div>
            
            {expandedObligations.includes(obligation.id) && (
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <p className="text-gray-600 mb-4">{obligation.description}</p>
                <h4 className="font-medium mb-2">Required Steps:</h4>
                <div className="space-y-2">
                  {obligation.steps.map(step => (
                    <div key={step.id} className="flex items-center">
                      <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
                        step.completed ? 'bg-purple-600' : 'border border-gray-300 bg-white'
                      }`}>
                        {step.completed && (
                          <CheckIcon className="w-3 h-3 text-white" strokeWidth={3} />
                        )}
                      </div>
                      <span className={step.completed ? 'text-gray-600' : 'text-gray-800'}>
                        {step.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceObligations; 