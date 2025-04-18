import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};