import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { WorkspaceLayout } from '../components/WorkspaceLayout';
import { db } from '../services/db';
import {
  Users,
  Target,
  GitBranch,
  TrendingUp,
  LifeBuoy,
  CheckSquare,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Plus,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState(db.getMetricsSummary());
  const [activityLogs, setActivityLogs] = useState(db.getActivityLogs().slice(0, 5));
  const [tasks, setTasks] = useState(db.getTasks().slice(0, 4));
  const [deals, setDeals] = useState(db.getDeals().slice(0, 4));

  useEffect(() => {
    // Refresh live metrics
    setMetrics(db.getMetricsSummary());
    setActivityLogs(db.getActivityLogs().slice(0, 5));
    setTasks(db.getTasks().slice(0, 4));
    setDeals(db.getDeals().slice(0, 4));
  }, []);

  const kpis = [
    {
      title: 'Total Customers',
      value: metrics.totalCustomers.toString(),
      subtext: 'active accounts',
      link: '/customers',
      icon: Users,
    },
    {
      title: 'Active Leads',
      value: metrics.activeLeads.toString(),
      subtext: `${metrics.totalLeads} total captured`,
      link: '/leads',
      icon: Target,
    },
    {
      title: 'Open Deals',
      value: metrics.openDeals.toString(),
      subtext: `₹${(metrics.pipelineValue / 100000).toFixed(1)}L in pipe`,
      link: '/pipeline',
      icon: GitBranch,
    },
    {
      title: 'Revenue (Won)',
      value: `₹${(metrics.totalRevenue / 100000).toFixed(1)}L`,
      subtext: `${metrics.wonDealsCount} deals closed`,
      link: '/reports',
      icon: TrendingUp,
    },
    {
      title: 'Open Tickets',
      value: metrics.openTickets.toString(),
      subtext: 'customer support',
      link: '/tickets',
      icon: LifeBuoy,
    },
    {
      title: 'Pending Tasks',
      value: metrics.pendingTasks.toString(),
      subtext: 'action items',
      link: '/tasks',
      icon: CheckSquare,
    },
  ];

  return (
    <WorkspaceLayout
      title="Executive Overview"
      subtitle="Real-time synchronized CRM metrics, recent activities & active pipeline"
      actions={
        <div className="flex items-center gap-2">
          <NavLink
            to="/customers"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0D2218] bg-white border border-[#0D2218]/15 hover:border-[#0D2218]/30 rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </NavLink>
          <NavLink
            to="/leads"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#FAF6F0] bg-[#0D2218] hover:bg-[#163827] rounded-xl shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Lead</span>
          </NavLink>
        </div>
      }
    >
      {/* 6 Real Database KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <NavLink
              key={kpi.title}
              to={kpi.link}
              className="bg-white p-4 rounded-2xl border border-[#0D2218]/10 hover:border-[#BA5D38]/40 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#5C6862] truncate">
                    {kpi.title}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#5C6862]/40 group-hover:text-[#BA5D38] transition-colors" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#0D2218] tabular-nums tracking-tight">
                  {kpi.value}
                </div>
              </div>
              <p className="text-[10px] text-[#5C6862] mt-1 font-medium truncate">
                {kpi.subtext}
              </p>
            </NavLink>
          );
        })}
      </div>

      {/* Middle Grid: Revenue & Pipeline snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Active Pipeline Preview */}
        <div className="lg:col-span-7 bg-white p-5 rounded-2xl border border-[#0D2218]/10 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#0D2218]">Active Deals Pipeline</h3>
              <p className="text-xs text-[#5C6862]">High-priority opportunities currently in negotiation</p>
            </div>
            <NavLink
              to="/pipeline"
              className="text-xs font-semibold text-[#BA5D38] hover:underline flex items-center gap-1"
            >
              <span>View Kanban</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </NavLink>
          </div>

          <div className="space-y-2.5">
            {deals.length === 0 ? (
              <p className="text-xs text-[#5C6862] py-4 text-center">No active deals in pipeline.</p>
            ) : (
              deals.map((deal) => (
                <NavLink
                  key={deal.id}
                  to="/pipeline"
                  className="p-3 rounded-xl bg-[#FAF6F0] hover:bg-[#F2ECE0] border border-[#0D2218]/6 flex items-center justify-between transition-colors block"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-xs font-bold text-[#0D2218] truncate block">
                      {deal.name}
                    </span>
                    <span className="text-[11px] text-[#5C6862]">
                      {deal.company} · {deal.contact}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-sm font-bold text-[#0D2218] tabular-nums block">
                      ₹{deal.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-[#0D2218]/10 text-[#0D2218]">
                      {deal.stage}
                    </span>
                  </div>
                </NavLink>
              ))
            )}
          </div>
        </div>

        {/* AI Recommendations & Quick Tasks */}
        <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-[#0D2218]/10 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#0D2218] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                Kairoo AI Intelligence Alerts
              </span>
              <NavLink to="/ai-insights" className="text-xs text-[#BA5D38] font-semibold hover:underline">
                Explore →
              </NavLink>
            </div>

            <div className="p-3 rounded-xl bg-[#0D2218] text-[#FAF6F0] mb-4">
              <p className="text-xs leading-relaxed">
                "TechNova Expansion is tracking 98% probability for Q4 close. Ensure SLA addendum is delivered within 24 hours."
              </p>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5C6862] mb-2 flex items-center justify-between">
              <span>Immediate Tasks</span>
              <NavLink to="/tasks" className="text-xs text-[#BA5D38] lowercase font-normal hover:underline">
                view all
              </NavLink>
            </h4>

            <div className="space-y-2">
              {tasks.length === 0 ? (
                <p className="text-xs text-[#5C6862] py-2">No pending tasks.</p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-2.5 rounded-lg bg-[#FAF6F0] border border-[#0D2218]/6 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 ${
                          task.status === 'Completed' ? 'text-emerald-600' : 'text-[#5C6862]'
                        }`}
                      />
                      <span className="truncate font-medium text-[#151A18]">{task.title}</span>
                    </div>
                    <span className="text-[10px] text-[#5C6862] shrink-0 font-mono ml-2">
                      Due: {task.dueDate}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Live Activity Stream */}
      <div className="bg-white p-5 rounded-2xl border border-[#0D2218]/10 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#0D2218]" />
            <h3 className="text-sm font-bold text-[#0D2218]">Recent Database Activity Stream</h3>
          </div>
          <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
            Real-Time Audit Log
          </span>
        </div>

        <div className="divide-y divide-[#0D2218]/6">
          {activityLogs.length === 0 ? (
            <p className="text-xs text-[#5C6862] py-4 text-center">No recent activity logged yet.</p>
          ) : (
            activityLogs.map((log) => (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#BA5D38]" />
                  <span className="font-semibold text-[#0D2218]">{log.entityType}</span>
                  <span className="text-[#5C6862]">{log.description}</span>
                </div>
                <span className="text-[11px] font-mono text-[#5C6862]">
                  {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </WorkspaceLayout>
  );
};
