import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HomePage = () => {
  const benefits = [
    'Real-time compliance updates',
    'Secure document access',
    'Team collaboration tools',
    'Automated reporting dashboard'
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/wisecomply-logo_color.png" 
              alt="WiseComply Logo" 
              className="h-16 w-auto"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Log in
            </Link>
            <Link to="/register">
              <Button size="sm">
                Sign up free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="lg:w-1/2 mb-12 lg:mb-0">
          <h1 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-secondary to-brand-primary text-transparent bg-clip-text">
              Simplifying compliance
            </span>
            <br />
            for NZ Non-Profits
          </h1>
          <p className="text-gray-600 mb-8 text-lg max-w-lg">
            WiseComply automates, tracks and helps you manage your compliance
            requirements with intelligent document generation, role management,
            and training delivery. Built specifically for New Zealand incorporated
            societies and community organisations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/register">
              <Button className="flex items-center justify-center gap-2" rightIcon={<ArrowRightIcon size={20} />}>
                Test My Current Compliance
              </Button>
            </Link>
            <p className="text-gray-500 text-center sm:text-left mt-2 sm:mt-0 sm:ml-4">
              or 
              <Link to="/contact" className="ml-1 text-brand-primary hover:underline">
                get a demo
              </Link>
            </p>
          </div>
        </div>
        
        <div className="lg:w-1/2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">WiseComply Dashboard</h2>
              <span className="text-sm text-gray-500">Last updated: Today</span>
            </div>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Compliance Score</p>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">92%</span>
                    <span className="text-green-500 text-sm">
                      +2.5% from last month
                    </span>
                  </div>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <span className="text-green-700 font-bold text-xl">A+</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Upcoming Tasks</h3>
                <span className="text-sm text-gray-500">3 pending</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Annual Report Due</p>
                      <p className="text-sm text-gray-500">Due in 14 days</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    High Priority
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div>
                      <p className="font-medium">Officer Training Required</p>
                      <p className="text-sm text-gray-500">Due in 7 days</p>
                    </div>
                  </div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                    Medium
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-medium">Policy Review</p>
                      <p className="text-sm text-gray-500">Due in 30 days</p>
                    </div>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Routine
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold mb-4">
                Ready to simplify your compliance journey?
              </h2>
              <p className="text-gray-600 mb-8">
                Join hundreds of New Zealand organisations that trust WiseComply to manage their regulatory requirements.
              </p>
              <Link to="/register">
                <Button size="lg">
                  Get Started Free
                </Button>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Trusted by organisations like yours
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-brand-primary" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};