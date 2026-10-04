import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { KairooLogo } from '../components/KairooLogo';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('rahul@kairoo.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = login(email);
      setLoading(false);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid credentials or account disabled.');
      }
    }, 400);
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    login(demoEmail);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-between font-sans selection:bg-[#0D2218] selection:text-[#FAF6F0]">
      {/* Top Bar */}
      <header className="px-6 py-5 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <KairooLogo size="md" variant="dark" />
        </NavLink>
        <NavLink
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5C6862] hover:text-[#0D2218] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Website</span>
        </NavLink>
      </header>

      {/* Center Auth Card */}
      <div className="w-full max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl p-8 border border-[#0D2218]/12 shadow-[0_20px_50px_-15px_rgba(13,34,24,0.12)]">
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl font-bold text-[#0D2218] tracking-tight mb-2">
              Welcome Back
            </h1>
            <p className="text-xs text-[#5C6862]">
              Access your intelligent Kairoo CRM workspace
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0D2218] mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-[#0D2218]">
                  Password
                </label>
                <NavLink
                  to="/forgot-password"
                  className="text-[11px] text-[#BA5D38] hover:underline"
                >
                  Forgot password?
                </NavLink>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0D2218] hover:bg-[#163827] text-[#FAF6F0] rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins for instant evaluation */}
          <div className="mt-6 pt-5 border-t border-[#0D2218]/8">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5C6862] block text-center mb-2.5">
              Quick Role Switch (Instant Demo Access)
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickLogin('rahul@kairoo.com')}
                className="p-2 rounded-xl bg-[#FAF6F0] border border-[#0D2218]/8 hover:border-[#0D2218]/25 text-left transition-colors"
              >
                <div className="font-bold text-[#0D2218]">Rahul Sharma</div>
                <div className="text-[10px] text-[#BA5D38]">Admin (Executive)</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('priya@kairoo.com')}
                className="p-2 rounded-xl bg-[#FAF6F0] border border-[#0D2218]/8 hover:border-[#0D2218]/25 text-left transition-colors"
              >
                <div className="font-bold text-[#0D2218]">Priya Reddy</div>
                <div className="text-[10px] text-[#C5A059]">Sales Manager</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('arjun@kairoo.com')}
                className="p-2 rounded-xl bg-[#FAF6F0] border border-[#0D2218]/8 hover:border-[#0D2218]/25 text-left transition-colors"
              >
                <div className="font-bold text-[#0D2218]">Arjun Kumar</div>
                <div className="text-[10px] text-[#5C6862]">Sales Rep</div>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('ananya@kairoo.com')}
                className="p-2 rounded-xl bg-[#FAF6F0] border border-[#0D2218]/8 hover:border-[#0D2218]/25 text-left transition-colors"
              >
                <div className="font-bold text-[#0D2218]">Ananya Roy</div>
                <div className="text-[10px] text-emerald-700">Support Specialist</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-[#5C6862]">
            Don't have an account yet?{' '}
            <NavLink to="/signup" className="font-semibold text-[#0D2218] hover:text-[#BA5D38] underline">
              Create an account
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-[#5C6862]">
        © 2026 Kairoo Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
};
export default LoginPage;
