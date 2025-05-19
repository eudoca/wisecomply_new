import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { Header } from '../components/layout/Header';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};