import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  GitBranch,
  CheckSquare,
  MessageSquare,
  PhoneCall,
  Calendar as CalendarIcon,
  LifeBuoy,
  BarChart3,
  Sparkles,
  Bell,
  UserCheck,
  Settings as SettingsIcon,
  Search,
  LogOut,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { KairooLogo } from './KairooLogo';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/db';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  children,
  title,
  subtitle,
  actions,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Unread notifications count
  const unreadNotifs = db.getNotifications().filter((n) => !n.isRead).length;

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Customers', path: '/customers', icon: Users },
    { name: 'Leads', path: '/leads', icon: Target },
    { name: 'Sales Pipeline', path: '/pipeline', icon: GitBranch },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Communication', path: '/communication', icon: MessageSquare },
    { name: 'Calls', path: '/calls', icon: PhoneCall },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'Support Tickets', path: '/tickets', icon: LifeBuoy },
    { name: 'Reports & Analytics', path: '/reports', icon: BarChart3 },
    { name: 'AI Insights', path: '/ai-insights', icon: Sparkles, badge: 'AI' },
    { name: 'Notifications', path: '/notifications', icon: Bell, count: unreadNotifs },
    { name: 'Users & Roles', path: '/users', icon: UserCheck },
    { name: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    if (q.trim()) {
      const results = db.globalSearch(q);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectSearchResult = (result: any) => {
    setShowSearchModal(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(result.route);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#151A18] flex flex-col font-sans selection:bg-[#0D2218] selection:text-[#FAF6F0]">
      {/* Top Application Bar */}
      <header className="h-16 bg-[#FAF6F0] border-b border-[#0D2218]/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 text-[#0D2218] hover:bg-[#0D2218]/5 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <NavLink to="/dashboard" className="flex items-center gap-2">
            <KairooLogo size="sm" variant="dark" />
          </NavLink>

          <div className="hidden lg:flex items-center text-xs text-[#5C6862] gap-1 pl-3 border-l border-[#0D2218]/10">
            <span>Workspace</span>
            <ChevronRight className="w-3 h-3" />
            <span className="font-semibold text-[#0D2218]">{title}</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search customers, leads, deals, tickets, tasks (⌘K)..."
              value={searchQuery}
              onFocus={() => setShowSearchModal(true)}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-9 pr-12 py-1.5 bg-white border border-[#0D2218]/12 rounded-xl text-xs text-[#0D2218] placeholder-[#5C6862]/70 focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
            />
            <kbd className="absolute right-2.5 top-2 text-[10px] font-mono bg-[#FAF6F0] border border-[#0D2218]/10 px-1.5 py-0.5 rounded text-[#5C6862]">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/"
            className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-[#0D2218] hover:text-[#BA5D38] px-2.5 py-1.5 rounded-lg border border-[#0D2218]/10 hover:border-[#0D2218]/25 transition-colors"
          >
            <span>Website Home</span>
            <ExternalLink className="w-3 h-3" />
          </NavLink>

          <NavLink
            to="/notifications"
            className="relative p-2 rounded-xl text-[#0D2218] hover:bg-[#0D2218]/5 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifs > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#BA5D38] animate-pulse" />
            )}
          </NavLink>

          <div className="flex items-center gap-2 pl-2 border-l border-[#0D2218]/10">
            <div className="w-8 h-8 rounded-full bg-[#0D2218] text-[#FAF6F0] flex items-center justify-center text-xs font-bold shadow-xs">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : 'US'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-[#0D2218] leading-tight">
                {user?.name || 'Rahul Sharma'}
              </span>
              <span className="text-[10px] font-medium text-[#BA5D38]">
                {user?.role || 'Admin'}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              title="Logout"
              className="p-1.5 text-[#5C6862] hover:text-red-700 hover:bg-red-50 rounded-lg ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Framework: Sidebar + Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Workspace Sidebar (Desktop) */}
        <aside className="w-60 bg-[#F4EFE6] border-r border-[#0D2218]/10 p-3 hidden md:flex flex-col justify-between shrink-0 overflow-y-auto">
          <div>
            <div className="px-3 py-2 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6862]">
                Workspace Suite
              </span>
              <span className="text-[9px] font-semibold bg-[#0D2218] text-[#FAF6F0] px-1.5 py-0.5 rounded">
                ENTERPRISE
              </span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-[#0D2218] text-[#FAF6F0] shadow-sm'
                        : 'text-[#2D3632] hover:bg-[#0D2218]/6'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-[#5C6862]'}`} />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge ? (
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          isActive ? 'bg-[#FAF6F0]/20 text-[#FAF6F0]' : 'bg-[#BA5D38]/15 text-[#BA5D38]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    ) : item.count && item.count > 0 ? (
                      <span className="text-[9px] font-bold bg-[#BA5D38] text-white px-1.5 py-0.2 rounded-full">
                        {item.count}
                      </span>
                    ) : null}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Persistent DB Status Footnote */}
          <div className="pt-3 border-t border-[#0D2218]/10 px-2 flex items-center justify-between text-[11px] text-[#5C6862]">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Connected to Store
            </span>
            <span className="font-mono text-[10px]">v2.6 Real</span>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden flex">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-64 max-w-[80%] bg-[#F4EFE6] h-full p-4 flex flex-col justify-between z-50 overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#0D2218]/10">
                  <KairooLogo size="sm" variant="dark" />
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-[#0D2218]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                          isActive ? 'bg-[#0D2218] text-[#FAF6F0]' : 'text-[#2D3632]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </div>
                        {item.count && item.count > 0 ? (
                          <span className="text-[9px] font-bold bg-[#BA5D38] text-white px-1.5 py-0.2 rounded-full">
                            {item.count}
                          </span>
                        ) : null}
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-[#0D2218]/10">
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="w-full py-2 bg-red-100 text-red-800 text-xs font-semibold rounded-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#FAF6F0]">
          {/* Section Breadcrumb & Action Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#0D2218]/10">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0D2218] tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-[#5C6862] mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>

            {actions && <div className="flex items-center gap-2.5 flex-wrap">{actions}</div>}
          </div>

          {/* Child View */}
          {children}
        </main>
      </div>

      {/* Global Search Results Modal (if searching) */}
      {showSearchModal && searchQuery.trim().length > 0 && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-[#0D2218]/15 shadow-2xl overflow-hidden animate-in fade-in">
            <div className="p-3 bg-[#FAF6F0] border-b border-[#0D2218]/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#0D2218]">
                Search results for "{searchQuery}" ({searchResults.length})
              </span>
              <button
                onClick={() => {
                  setShowSearchModal(false);
                  setSearchQuery('');
                }}
                className="p-1 text-[#5C6862] hover:text-[#0D2218]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2 divide-y divide-[#0D2218]/5">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#5C6862]">
                  No matching records found across customers, leads, deals, tickets, or tasks.
                </div>
              ) : (
                searchResults.map((res, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectSearchResult(res)}
                    className="p-2.5 hover:bg-[#FAF6F0] rounded-xl cursor-pointer flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-[#0D2218]/8 text-[#0D2218]">
                          {res.type}
                        </span>
                        <span className="text-xs font-bold text-[#0D2218]">{res.title}</span>
                      </div>
                      <p className="text-[11px] text-[#5C6862] mt-0.5">{res.subtitle}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#5C6862]" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
