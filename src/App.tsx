/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { CustomersPage } from './pages/CustomersPage';
import { LeadsPage } from './pages/LeadsPage';
import { PipelinePage } from './pages/PipelinePage';
import { TasksPage } from './pages/TasksPage';
import { CommunicationPage } from './pages/CommunicationPage';
import { CallsPage } from './pages/CallsPage';
import { CalendarPage } from './pages/CalendarPage';
import { TicketsPage } from './pages/TicketsPage';
import { ReportsPage } from './pages/ReportsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* CRM Workspace Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/communication" element={<CommunicationPage />} />
          <Route path="/calls" element={<CallsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/ai-insights" element={<AIInsightsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
