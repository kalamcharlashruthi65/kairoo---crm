import React, { useState } from 'react';
import { WorkspaceLayout } from '../components/WorkspaceLayout';
import { db } from '../services/db';
import {
  Save,
  Download,
  RotateCcw,
  Shield,
  Building,
  DollarSign,
  Bell,
  CheckCircle,
  Database,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [companyName, setCompanyName] = useState('Kairoo Technologies');
  const [currency, setCurrency] = useState('INR (₹)');
  const [timezone, setTimezone] = useState('Asia/Kolkata (IST)');
  const [leadSlaHours, setLeadSlaHours] = useState('2');
  const [ticketSlaHours, setTicketSlaHours] = useState('4');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);
  const [ticketAlerts, setTicketAlerts] = useState(true);
  const [savedToast, setSavedToast] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleDownloadBackup = () => {
    const backupData = {
      users: db.getUsers(),
      customers: db.getCustomers(),
      leads: db.getLeads(),
      deals: db.getDeals(),
      tasks: db.getTasks(),
      calls: db.getCalls(),
      communications: db.getCommunications(),
      appointments: db.getAppointments(),
      tickets: db.getTickets(),
      notifications: db.getNotifications(),
      exportedAt: new Date().toISOString(),
      systemVersion: 'Kairoo CRM 2.6 Enterprise',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `kairoo_crm_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all records to the default seed state? Current edits will be re-initialized.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <WorkspaceLayout
      title="Settings & System Configuration"
      subtitle="Workspace localization, business SLA thresholds, notification rules and data backups"
    >
      {savedToast && (
        <div className="mb-6 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Configuration saved successfully.</span>
        </div>
      )}

      <div className="max-w-4xl space-y-6">
        {/* Form */}
        <form onSubmit={handleSavePreferences} className="bg-white p-6 rounded-2xl border border-[#0D2218]/10 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-[#0D2218] flex items-center gap-2 mb-1">
              <Building className="w-4 h-4 text-[#0D2218]" />
              <span>Organization & Localization</span>
            </h3>
            <p className="text-xs text-[#5C6862]">Define your company identity and regional format defaults</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#0D2218]">Organization Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#0D2218]">Default Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218]"
              >
                <option value="INR (₹)">Indian Rupee (INR ₹)</option>
                <option value="USD ($)">US Dollar (USD $)</option>
                <option value="EUR (€)">Euro (EUR €)</option>
                <option value="GBP (£)">British Pound (GBP £)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#0D2218]">Workspace Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218]"
              >
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST +5:30)</option>
                <option value="America/New_York (EST)">America/New_York (EST)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT)</option>
                <option value="Asia/Dubai (GST)">Asia/Dubai (GST +4:00)</option>
              </select>
            </div>
          </div>

          <hr className="border-[#0D2218]/8" />

          {/* SLA Thresholds */}
          <div>
            <h3 className="text-sm font-bold text-[#0D2218] flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-[#0D2218]" />
              <span>SLA Response Targets</span>
            </h3>
            <p className="text-xs text-[#5C6862]">Automate escalation alerts when turnaround exceeds threshold</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-[#0D2218]">
                Inbound Lead First Contact SLA (Hours)
              </label>
              <input
                type="number"
                value={leadSlaHours}
                onChange={(e) => setLeadSlaHours(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218]"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-[#0D2218]">
                Critical Support Ticket Resolution SLA (Hours)
              </label>
              <input
                type="number"
                value={ticketSlaHours}
                onChange={(e) => setTicketSlaHours(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218]"
              />
            </div>
          </div>

          <hr className="border-[#0D2218]/8" />

          {/* Notifications Rules */}
          <div>
            <h3 className="text-sm font-bold text-[#0D2218] flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-[#0D2218]" />
              <span>Dispatch Rules & In-App Alerts</span>
            </h3>
            <p className="text-xs text-[#5C6862]">Control automated notifications sent to sales representatives</p>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={leadAlerts}
                onChange={(e) => setLeadAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D2218] focus:ring-0"
              />
              <span className="font-semibold text-[#0D2218]">Notify assigned rep immediately on new website demo request</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={ticketAlerts}
                onChange={(e) => setTicketAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D2218] focus:ring-0"
              />
              <span className="font-semibold text-[#0D2218]">Broadcast high-priority support tickets to the Customer Care queue</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-[#0D2218] focus:ring-0"
              />
              <span className="font-semibold text-[#0D2218]">Send executive summary report digest every Friday evening</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#FAF6F0] bg-[#0D2218] hover:bg-[#163827] rounded-xl shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>

        {/* Database Management & Backups */}
        <div className="bg-white p-6 rounded-2xl border border-[#0D2218]/10 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-[#0D2218] flex items-center gap-2 mb-1">
              <Database className="w-4 h-4 text-[#0D2218]" />
              <span>Database Persistence & Maintenance</span>
            </h3>
            <p className="text-xs text-[#5C6862]">
              Kairoo stores all CRM customer profiles, deals, calls, and tickets in your persistent store.
            </p>
          </div>

          {/* Complete Project Archive for Desktop */}
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-950 block">Complete Codebase (Desktop Archive: kairoo.zip)</span>
              <span className="text-[11px] text-emerald-800">
                All application source code, components, routes, backend server, and styling packaged into a zip file ready for your Desktop.
              </span>
            </div>
            <a
              href="/api/download/kairoo-zip"
              download="kairoo.zip"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D2218] hover:bg-[#163827] text-xs font-semibold text-[#FAF6F0] rounded-xl shadow-xs transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download kairoo.zip</span>
            </a>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#0D2218]/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#0D2218] block">Complete JSON Database Snapshot</span>
              <span className="text-[11px] text-[#5C6862]">
                Export all models including customer accounts, pipeline deals, tickets, and communications.
              </span>
            </div>
            <button
              onClick={handleDownloadBackup}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#0D2218]/15 hover:border-[#0D2218]/30 text-xs font-semibold text-[#0D2218] rounded-xl shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Backup</span>
            </button>
          </div>

          <div className="p-4 rounded-xl bg-red-50/50 border border-red-200/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-red-900 block">Reset to Factory Seed State</span>
              <span className="text-[11px] text-red-700/80">
                Restores standard demo companies (TechNova, Sovereign Capital, Studio Lumina).
              </span>
            </div>
            <button
              onClick={handleResetData}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-xs font-semibold text-red-900 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Store</span>
            </button>
          </div>
        </div>
      </div>
    </WorkspaceLayout>
  );
};
export default SettingsPage;
