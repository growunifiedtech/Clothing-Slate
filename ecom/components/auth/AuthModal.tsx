'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useStore } from '@/lib/store';
import { ConfirmationResult } from 'firebase/auth';
import {
  X,
  Phone,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const formatAuthError = (err: any): string => {
  const code = err?.code || '';
  const msg = err?.message || '';
  if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
    return 'Domain unauthorized in Firebase: Go to Firebase Console > Authentication > Settings > Authorized domains and add your Vercel URL.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Sign-in window closed before completing. Please try again.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return 'Invalid email or password. Please check your credentials or register a new account.';
  }
  if (code === 'auth/email-already-in-use') {
    return 'This email is already registered. Please switch to Sign In.';
  }
  if (code === 'auth/operation-not-allowed') {
    return 'This sign-in method is not enabled yet in Firebase Console > Authentication > Sign-in method.';
  }
  if (code === 'auth/invalid-phone-number') {
    return 'Invalid phone number format. Please enter a valid 10-digit mobile number.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many attempts. Please wait a few moments before trying again.';
  }
  return msg || 'Authentication error. Please try again.';
};

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const {
    user,
    isFirebaseConfigured,
    loginWithGoogle,
    loginWithEmail,
    signupWithEmail,
    setupRecaptcha,
    sendPhoneOtp,
    loginAsDemoUser,
  } = useAuth();

  const { updateUserProfile, showToast } = useStore();

  const [authMode, setAuthMode] = useState<'phone' | 'email' | 'demo'>('phone');
  const [isSignUp, setIsSignUp] = useState(false);

  // Phone OTP state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  // Demo user state
  const [demoName, setDemoName] = useState('Retail Partner');
  const [demoPhone, setDemoPhone] = useState('+91 9599084873');
  const [demoEmail, setDemoEmail] = useState('buyer@slateapparels.com');

  // Loading & error handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setOtpSent(false);
      setConfirmationResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
      showToast('Logged in via Google successfully');
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      setLoading(true);
      setError(null);
      if (isSignUp) {
        await signupWithEmail(email, password, fullName);
        updateUserProfile({ name: fullName, email });
        showToast('Account created successfully');
      } else {
        await loginWithEmail(email, password);
        updateUserProfile({ email });
        showToast('Logged in successfully');
      }
      onSuccess?.();
      onClose();
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSendPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    let cleaned = phoneNumber.trim().replace(/\s+/g, '');
    if (!cleaned.startsWith('+')) {
      if (cleaned.length === 10) {
        cleaned = `+91${cleaned}`;
      } else {
        setError('Please enter a valid 10-digit mobile number or full number with country code (+91)');
        return;
      }
    }

    try {
      setLoading(true);
      setError(null);
      const appVerifier = setupRecaptcha('recaptcha-container');
      if (!appVerifier) {
        throw new Error('Could not initialize reCAPTCHA verifier. Ensure Firebase is configured.');
      }
      const confirmation = await sendPhoneOtp(cleaned, appVerifier);
      setConfirmationResult(confirmation);
      setOtpSent(true);
      showToast(`Verification OTP sent to ${cleaned}`);
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult || !otpCode) return;
    try {
      setLoading(true);
      setError(null);
      const res = await confirmationResult.confirm(otpCode);
      if (res.user) {
        updateUserProfile({ phone: res.user.phoneNumber || phoneNumber });
        showToast('Mobile number verified successfully!');
        onSuccess?.();
        onClose();
      }
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemoUser(demoName, demoEmail, demoPhone);
    updateUserProfile({ name: demoName, email: demoEmail, phone: demoPhone });
    showToast(`Logged in as ${demoName}`);
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="recaptcha-container"
        className="invisible absolute pointer-events-none"
      />

      <div className="relative w-full max-w-md bg-[#090d16] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in zoom-in-95 duration-200">
        
        {/* Header Strip */}
        <div className="p-6 pb-4 border-b border-slate-800 flex items-start justify-between bg-slate-900/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00ff87] animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest text-[#00ff87] uppercase font-bold">
                SECURE AUTHENTICATION
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white uppercase tracking-tight mt-1">
              SLATE CLIENT PORTAL
            </h2>
            <p className="text-xs text-slate-400 font-sans mt-0.5">
              Access your orders, saved addresses, and wholesale privileges.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Firebase Config Notice banner if keys not yet supplied */}
        {!isFirebaseConfigured && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-amber-950/40 border border-amber-600/40 text-[11px] font-mono text-amber-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Firebase Keys Pending Configuration</span>
              <p className="text-amber-300/80 mt-0.5">
                Add your Firebase API keys to <code className="text-white bg-slate-900 px-1 rounded">ecom/.env.local</code> to activate live Google/OTP authentication. You can also test instantly via the <strong>DEMO / QUICK LOGIN</strong> tab below!
              </p>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="p-6 pt-4 space-y-4">
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-[11px] font-bold">
            <button
              onClick={() => {
                setAuthMode('phone');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'phone'
                  ? 'bg-[#00ff87] text-[#06080e] shadow-neon-sm font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>PHONE OTP</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('email');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'email'
                  ? 'bg-[#00ff87] text-[#06080e] shadow-neon-sm font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span>EMAIL</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('demo');
                setError(null);
              }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'demo'
                  ? 'bg-[#00f0ff] text-[#06080e] shadow-neon-cyan font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>DEMO LOGIN</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-xs font-mono text-red-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: PHONE NUMBER WITH OTP */}
          {authMode === 'phone' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendPhoneOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1.5">
                      Enter Mobile Number
                    </label>
                    <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-[#00ff87] focus-within:shadow-neon-sm transition-all">
                      <span className="text-xs font-mono font-bold text-slate-400 pr-2 border-r border-slate-700">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="95990 84873"
                        className="w-full bg-transparent pl-3 text-xs font-mono text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      We will send a 6-digit one-time password (OTP) via SMS.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50"
                  >
                    <span>{loading ? 'SENDING CODE...' : 'GET OTP VERIFICATION CODE'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyPhoneOtp} className="space-y-3.5">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-400">Code sent to: <strong className="text-white">{phoneNumber}</strong></span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[#00ff87] underline hover:text-white"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1.5">
                      Enter 6-Digit OTP Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      placeholder="123456"
                      className="w-full text-center tracking-widest text-lg font-mono font-bold bg-slate-900 border border-slate-700 rounded-xl py-2.5 text-white focus:outline-none focus:border-[#00ff87]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otpCode.length < 6}
                    className="w-full py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50"
                  >
                    <span>{loading ? 'VERIFYING...' : 'VERIFY & SIGN IN'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: EMAIL & PASSWORD */}
          {authMode === 'email' && (
            <form onSubmit={handleEmailAuth} className="space-y-3.5">
              {isSignUp && (
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required={isSignUp}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00ff87]"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00ff87]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#00ff87] text-[#06080e] hover:bg-[#05f26c] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50"
              >
                <span>
                  {loading
                    ? 'PROCESSING...'
                    : isSignUp
                    ? 'CREATE CLIENT ACCOUNT'
                    : 'SIGN IN TO PORTAL'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-xs font-mono text-slate-400 hover:text-[#00ff87] underline"
                >
                  {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: DEMO / QUICK LOGIN */}
          {authMode === 'demo' && (
            <form onSubmit={handleDemoLogin} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
                <span className="text-[#00f0ff] font-bold block">1-Click Local Client Preview</span>
                <p className="text-slate-400">
                  Allows immediate access to the User Dashboard with full order history and address saving without waiting for Firebase credentials.
                </p>
              </div>

              <div>
                <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={demoName}
                  onChange={(e) => setDemoName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={demoPhone}
                    onChange={(e) => setDemoPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#00f0ff] text-[#06080e] hover:bg-[#00c8d7] font-mono text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon-cyan"
              >
                <span>INSTANT LOGIN AS {demoName.toUpperCase()}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Google Quick Button (Always available) */}
          <div className="pt-3 border-t border-slate-800 space-y-3">
            <div className="relative flex items-center justify-center">
              <span className="absolute inset-x-0 h-px bg-slate-800" />
              <span className="relative bg-[#090d16] px-3 text-[10px] font-mono font-bold text-slate-500 uppercase">
                OR QUICK AUTH
              </span>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>CONTINUE WITH GOOGLE</span>
            </button>
          </div>
        </div>

        {/* Footer Security Badges */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff87]" />
            256-BIT SSL ENCRYPTION
          </span>
          <span>FIREBASE IDENTITY DESK</span>
        </div>
      </div>
    </div>
  );
}
