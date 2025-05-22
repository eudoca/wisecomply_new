import React from 'react';
import { ClipboardCheck, CheckCircle, Clock, AlertCircle, Building, User, MapPin, Settings, FileText, Users, Briefcase, DollarSign, GitBranch } from 'lucide-react';
import { SocietyActivityDashboard } from '../components/society/SocietyActivityDashboard';
import { Tabs, Tab } from '../components/ui/Tabs';

interface ContactPerson {
  name: string;
  email: string;
  phone: string;
  verificationStatus: 'completed' | 'pending' | 'overdue';
  lastUpdated: string;
}

interface OfficeAddress {
  street: string;
  city: string;
  postalCode: string;
  effectiveDate: string;
}

const contactPerson: ContactPerson = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  phone: '+64 21 123 4567',
  verificationStatus: 'completed',
  lastUpdated: '2024-02-15',
};

const officeAddress: OfficeAddress = {
  street: '123 Main Street',
  city: 'Auckland',
  postalCode: '1010',
  effectiveDate: '2024-01-01',
};

const StatusBadge: React.FC<{ status: 'completed' | 'pending' | 'overdue' }> = ({ status }) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
  };

  const text = {
    completed: 'Completed',
    pending: 'Pending',
    overdue: 'Overdue',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {text[status]}
    </span>
  );
};

const StatusIcon: React.FC<{ status: 'completed' | 'pending' | 'overdue' }> = ({ status }) => {
  const icons = {
    completed: <CheckCircle className="h-5 w-5 text-green-500" />,
    pending: <Clock className="h-5 w-5 text-yellow-500" />,
    overdue: <AlertCircle className="h-5 w-5 text-red-500" />,
  };

  return icons[status];
};

export const SocietyInfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'contact' | 'address'>('contact');
  const [mainTab, setMainTab] = React.useState<string>('society-info');

  // Define tabs for Society Information and Change Wizard Answers
  const mainTabs: Tab[] = [
    { id: 'society-info', label: 'Society Information' },
    { id: 'wizard-answers', label: 'Change my Wizard Answers' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Building className="h-6 w-6 text-purple-600" />
        <h1 className="text-2xl font-semibold text-purple-600">Society Information</h1>
      </div>

      {/* Blue information box */}
      <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-100 flex mb-4">
        <div className="flex-shrink-0 mr-2">
          <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="text-xs text-blue-700">
          <p>
            This page contains essential information about your society:
          </p>
          <ol className="mt-1 list-decimal pl-4 space-y-0.5">
            <li>The <strong>Society Details</strong> section displays your legal registration information, including your society's name, type, and registration numbers.</li>
            <li>The <strong>Society Management</strong> section helps you track and manage society-related tasks and updates.</li>
            <li>The <strong>Contact & Address</strong> section maintains your registered contact person and office address details, which are crucial for official correspondence.</li>
          </ol>
        </div>
      </div>

      {/* Society Details Section with Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
        <Tabs activeTab={mainTab} onTabChange={setMainTab} tabs={mainTabs} />
        
        <div className="p-6">
          {mainTab === 'society-info' && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Registration Details</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Name</span>
                    <span className="text-sm text-gray-900 font-medium">Auckland Community Society</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Type</span>
                    <span className="text-sm text-gray-900">Incorporated Society</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">NZBN</span>
                    <span className="text-sm text-gray-900 font-mono">9429041234567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Inc. Number</span>
                    <span className="text-sm text-gray-900 font-mono">1234567</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Registration</span>
                    <span className="text-sm text-gray-900">15 Jan 2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Under 2022 Act</span>
                    <span className="text-sm text-gray-900 font-medium text-green-600">Yes ✓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">Charities Reg</span>
                    <span className="text-sm text-gray-900 font-mono">CC12345</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {mainTab === 'wizard-answers' && (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Setup Configuration</h3>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-4">
                    Review and update the answers you provided during the initial setup wizard. These answers help customize your compliance requirements.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-purple-600" />
                        <h4 className="text-sm font-semibold text-gray-900">Organization Size</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Members</span>
                          <span className="text-sm font-medium text-gray-900">156</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Paid Employees</span>
                          <span className="text-sm font-medium text-gray-900">3</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <DollarSign className="h-4 w-4 text-purple-600" />
                        <h4 className="text-sm font-semibold text-gray-900">Financial Details</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Annual Revenue</span>
                          <span className="text-sm font-medium text-gray-900">$150k - $500k</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase className="h-4 w-4 text-purple-600" />
                        <h4 className="text-sm font-semibold text-gray-900">Activities</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Primary</span>
                          <span className="text-sm font-medium text-gray-900">Community Services</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Secondary</span>
                          <span className="text-sm font-medium text-gray-900">Education</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-2 mb-3">
                        <GitBranch className="h-4 w-4 text-purple-600" />
                        <h4 className="text-sm font-semibold text-gray-900">Structure</h4>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Has Branches</span>
                          <span className="text-sm font-medium text-gray-900">No</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    <Settings className="h-4 w-4" />
                    Re-run Setup Wizard
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Society Activity Dashboard */}
      <div className="mb-6">
        <SocietyActivityDashboard />
      </div>

      {/* Contact & Address Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <Tabs 
          activeTab={activeTab} 
          onTabChange={(tabId) => setActiveTab(tabId as 'contact' | 'address')} 
          tabs={[
            { id: 'contact', label: 'Registered Contact Person' },
            { id: 'address', label: 'Registered Office Address' }
          ]} 
        />
        
        <div className="p-6">
          {activeTab === 'contact' ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Contact Details</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                    <p className="text-sm text-gray-900 font-medium">{contactPerson.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <p className="text-sm text-gray-900">{contactPerson.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <p className="text-sm text-gray-900">{contactPerson.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Verification Status</label>
                    <StatusBadge status={contactPerson.verificationStatus} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Last Updated</label>
                    <p className="text-sm text-gray-900">{contactPerson.lastUpdated}</p>
                  </div>
                  <div className="md:col-span-2">
                    <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Update Contact Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Office Location</h3>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
                    <p className="text-sm text-gray-900 font-medium">{officeAddress.street}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                    <p className="text-sm text-gray-900">{officeAddress.city}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Postal Code</label>
                    <p className="text-sm text-gray-900">{officeAddress.postalCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Effective Date</label>
                    <p className="text-sm text-gray-900">{officeAddress.effectiveDate}</p>
                  </div>
                  <div className="md:col-span-2">
                    <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      Update Address
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocietyInfoPage; 