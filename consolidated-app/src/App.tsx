import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Public Pages
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ConfirmEmailPage } from './pages/ConfirmEmailPage';
import { WizardPage } from './pages/WizardPage';

// Dashboard Pages
// import { DashboardPage } from './pages/DashboardPage'; // Removed
import { ComplianceActivitiesPage } from './pages/ComplianceActivitiesPage';
import { CalendarPage } from './pages/CalendarPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { OfficersPage } from './pages/OfficersPage';
import { ConstitutionPage } from './pages/ConstitutionPage';
import { MembershipPage } from './pages/MembershipPage';
import { DisputesPage } from './pages/DisputesPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdviceSupportPage } from './pages/AdviceSupportPage';

const App: React.FC = () => {
  // For demo purposes only - in a real app, this would be determined from auth state
  // Set to true to view the dashboard screens directly, or false to start at the login flow
  const isAuthenticated = true;

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />
      </Route>

      {/* Wizard Route - outside standard layouts */}
      <Route path="/wizard" element={<WizardPage />} />

      {/* Protected Routes */}
      <Route
        element={
          isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" replace />
        }
      >
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/compliance" element={<ComplianceActivitiesPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/officers" element={<OfficersPage />} />
        <Route path="/constitution" element={<ConstitutionPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/disputes" element={<DisputesPage />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/advice" element={<AdviceSupportPage />} />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;