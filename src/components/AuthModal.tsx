import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Shield, Lock, Mail, User, Building } from 'lucide-react';
import { KairooLogo } from './KairooLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signup',
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [teamSize, setTeamSize] = useState('11-50');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      // simulated onboarding redirect or close
    }, 2500);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#07150E]/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#FAF6F0] rounded-2xl border border-[#0D2218]/15 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#5C6862] hover:text-[#0D2218] hover:bg-[#0D2218]/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Submitted Success View */}
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0D2218] mb-2">
                {mode === 'signup' ? 'Welcome to Kairoo Workspace!' : 'Welcome Back!'}
              </h3>
              <p className="text-xs sm:text-sm text-[#5C6862] max-w-sm mx-auto mb-6">
                {mode === 'signup'
                  ? `Your dedicated Kairoo CRM instance for ${company || 'your team'} has been provisioned. Check ${email} for your secure sign-in token.`
                  : `Authenticated as ${email}. Synchronizing active pipelines and notifications...`}
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#0D2218] text-[#FAF6F0] rounded-full text-xs font-semibold hover:bg-[#163827]"
              >
                Enter Kairoo Dashboard →
              </button>
            </div>
          ) : (
            <div>
              {/* Logo & Headline */}
              <div className="mb-6 text-center">
                <KairooLogo size="md" variant="dark" className="justify-center mb-3" />
                <h3 className="font-serif text-2xl font-semibold text-[#0D2218]">
                  {mode === 'signup'
                    ? 'Start Your 14-Day Free Enterprise Trial'
                    : 'Log in to Your Kairoo Workspace'}
                </h3>
                <p className="text-xs text-[#5C6862] mt-1">
                  {mode === 'signup'
                    ? 'Zero setup fees · No credit card required'
                    : 'Access your team pipeline and real-time insights'}
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex bg-[#EAE1D3] p-1 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'signup'
                      ? 'bg-white text-[#0D2218] shadow-xs'
                      : 'text-[#5C6862] hover:text-[#0D2218]'
                  }`}
                >
                  Create Account
                </button>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    mode === 'login'
                      ? 'bg-white text-[#0D2218] shadow-xs'
                      : 'text-[#5C6862] hover:text-[#0D2218]'
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs font-medium text-[#151A18] mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#5C6862] absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#0D2218]/15 rounded-xl text-xs sm:text-sm text-[#0D2218] placeholder-[#5C6862]/60 focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#151A18] mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#5C6862] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#0D2218]/15 rounded-xl text-xs sm:text-sm text-[#0D2218] placeholder-[#5C6862]/60 focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                    />
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#151A18] mb-1">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-[#5C6862] absolute left-3 top-3 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="TechNova Inc"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#0D2218]/15 rounded-xl text-xs sm:text-sm text-[#0D2218] placeholder-[#5C6862]/60 focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#151A18] mb-1">
                        Team Size
                      </label>
                      <select
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white border border-[#0D2218]/15 rounded-xl text-xs sm:text-sm text-[#0D2218] focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                      >
                        <option value="1-10">1 - 10 people</option>
                        <option value="11-50">11 - 50 people</option>
                        <option value="51-200">51 - 200 people</option>
                        <option value="200+">200+ enterprise</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-[#151A18] mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#5C6862] absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-[#0D2218]/15 rounded-xl text-xs sm:text-sm text-[#0D2218] placeholder-[#5C6862]/60 focus:outline-none focus:ring-2 focus:ring-[#0D2218]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 bg-[#0D2218] text-[#FAF6F0] rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#163827] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>{mode === 'signup' ? 'Get Started Free' : 'Sign In to Workspace'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Security trust footnote */}
              <div className="mt-5 pt-4 border-t border-[#0D2218]/10 flex items-center justify-center gap-2 text-[11px] text-[#5C6862]">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>256-bit AES encryption · SOC2 & ISO 27001 Certified</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
