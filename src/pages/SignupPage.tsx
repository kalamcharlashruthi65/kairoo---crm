import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { KairooLogo } from '../components/KairooLogo';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Lock, Mail, User, Building, AlertCircle, ArrowLeft, Shield } from 'lucide-react';
import { User as UserType } from '../services/db';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserType['role']>('Sales Employee');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        signup(name, email, company || `${name}'s Organization`, role);
        setLoading(false);
        navigate('/dashboard');
      } catch (err: any) {
        setLoading(false);
        setError(err.message || 'Failed to create account.');
      }
    }, 400);
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
      <div className="w-full max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded-3xl p-8 border border-[#0D2218]/12 shadow-[0_20px_50px_-15px_rgba(13,34,24,0.12)]">
          <div className="text-center mb-6">
            <h1 className="font-serif text-3xl font-bold text-[#0D2218] tracking-tight mb-2">
              Start Your Kairoo Workspace
            </h1>
            <p className="text-xs text-[#5C6862]">
              Join thousands of growing companies connecting customer journeys
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand Patel"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Work Email *
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Company / Organization
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Sovereign Advisors"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Your Primary Role
                </label>
                <div className="relative">
                  <Shield className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                  >
                    <option value="Admin">Administrator (Full Access)</option>
                    <option value="Manager">Sales Manager</option>
                    <option value="Sales Employee">Sales Representative</option>
                    <option value="Support Employee">Customer Support Specialist</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#0D2218] mb-1.5">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5C6862] absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#0D2218]/12 rounded-xl text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-[#5C6862] pt-1">
              By creating an account, you agree to the Kairoo Enterprise Master Subscription Agreement and Privacy Policy.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#0D2218] hover:bg-[#163827] text-[#FAF6F0] rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{loading ? 'Creating Your Account...' : 'Create Account & Enter CRM'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-[#5C6862]">
            Already have an account?{' '}
            <NavLink to="/login" className="font-semibold text-[#0D2218] hover:text-[#BA5D38] underline">
              Sign In
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
export default SignupPage;
