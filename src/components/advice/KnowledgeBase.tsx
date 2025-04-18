import React, { useState } from 'react';
import { SearchIcon, MicIcon, ThumbsUpIcon, ThumbsDownIcon, BookOpenIcon, UserIcon, LandmarkIcon, CalendarIcon, FileTextIcon, ClipboardListIcon } from 'lucide-react';

// Note: Renamed from default export to named export
export const KnowledgeBase = () => { 
  const [selectedCategory, setSelectedCategory] = useState('establishment');
  const commonQuestions = [{
    category: 'Administrative',
    questions: ['What if my society changes an address?', 'How do I update officer details?', 'What are the annual filing requirements?']
  }, {
    category: 'Financial',
    questions: ['What do I need for a bank account?', 'What grants can I get?', 'Do we need an audit?']
  }, {
    category: 'Governance',
    questions: ['How many committee members do we need?', 'What should be in our constitution?', 'How do we handle conflicts of interest?']
  }];
  const categories = [{
    id: 'establishment',
    title: 'Establishment & Registration',
    icon: LandmarkIcon,
    description: 'Formation requirements and registration process'
  }, {
    id: 'constitution',
    title: 'Constitutional Requirements',
    icon: FileTextIcon,
    description: '2022 Act compliance and constitutional components'
  }, {
    id: 'governance',
    title: 'Governance & Officers',
    icon: UserIcon,
    description: 'Committee structure and officer requirements'
  }, {
    id: 'financial',
    title: 'Financial Management',
    icon: BookOpenIcon,
    description: 'Financial reporting and accounting standards'
  }, {
    id: 'timeline',
    title: 'Compliance Timeline',
    icon: CalendarIcon,
    description: 'Key deadlines and filing requirements'
  }, {
    id: 'procedures',
    title: 'Common Procedures',
    icon: ClipboardListIcon,
    description: 'Meeting procedures and document management'
  }];
  return <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Knowledge Base
          </h1>
          <p className="mt-1 text-gray-600">
            Access compliance information and get answers to your questions
          </p>
        </div>
      </div>
      <div className="relative mb-4">
        <div className="flex items-center bg-white rounded-lg border border-gray-200 p-4">
          <SearchIcon className="w-5 h-5 text-gray-400 mr-3" />
          <input type="text" placeholder="Ask anything about incorporated societies, governance, or compliance..." className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400" />
          <button className="p-2 hover:bg-gray-50 rounded-full">
            <MicIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-sm font-medium text-gray-700 mb-3">
          Common Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {commonQuestions.map((category, idx) => <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-purple-800 mb-3">
                {category.category}
              </h3>
              <div className="space-y-2">
                {category.questions.map((question, qIdx) => <button key={qIdx} className="w-full text-left text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 rounded p-2 transition-colors">
                    {question}
                  </button>)}
              </div>
            </div>)}
        </div>
      </div>
      <div className="w-full"> {/* Ensure this takes full width */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Conversation
          </h2>
          <div className="space-y-6">
            {/* Conversation Block 1 (Original) */}
            <div className="border-l-4 border-purple-200 pl-4">
              <p className="text-sm text-gray-500">Your question</p>
              <p className="text-gray-900 mt-1">
                What are the main requirements for establishing an
                incorporated society?
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">
                To establish an incorporated society, you need:
              </p>
              <ul className="mt-2 space-y-2 text-gray-700">
                <li>• Minimum of 10 members</li>
                <li>• Written constitution</li>
                <li>• Unique society name</li>
                <li>• Registered office address</li>
              </ul>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsUpIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Helpful</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsDownIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Not helpful</span>
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Source: Incorporated Societies Act 2022, Section 8
                </span>
              </div>
            </div>

            {/* Conversation Block 2 (Added Example) */}
            <div className="border-l-4 border-purple-200 pl-4">
              <p className="text-sm text-gray-500">Your question</p>
              <p className="text-gray-900 mt-1">
                How do we update our constitution?
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">
                You need to follow the amendment procedure outlined in your society's current constitution. Generally, this involves proposing the changes, holding a general meeting, and passing a special resolution. Once passed, you must file the updated constitution with the Registrar.
              </p>
               <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsUpIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Helpful</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsDownIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Not helpful</span>
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  Source: Guide to Constitution Amendments
                </span>
              </div>
            </div>

             {/* Conversation Block 3 (Added Example) */}
            <div className="border-l-4 border-purple-200 pl-4">
              <p className="text-sm text-gray-500">Your question</p>
              <p className="text-gray-900 mt-1">
                Do committee members have personal liability?
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900">
                Incorporation generally provides limited liability. However, under the 2022 Act, officers can be held personally liable if they breach their duties, such as acting in bad faith, misusing powers, or allowing the society to incur debts recklessly.
              </p>
               <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsUpIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Helpful</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-gray-600">
                    <ThumbsDownIcon className="w-4 h-4 mr-1" />
                    <span className="text-sm">Not helpful</span>
                  </button>
                </div>
                 <span className="text-sm text-gray-500">
                  Source: Incorporated Societies Act 2022, Part 4
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
      
    </div>;
};
// export default KnowledgeBase; // Removed default export 