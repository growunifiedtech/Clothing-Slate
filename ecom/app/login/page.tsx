'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useStore } from '@/lib/store';
import { Mail, Lock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const formatAuthError = (err: any): string => {
  const code = err?.code || '';
  const msg = err?.message || '';
  if (code === 'auth/unauthorized-domain' || msg.includes('unauthorized-domain')) {
    return 'Domain unauthorized in Firebase: Add your Vercel URL in Firebase Console > Authentication > Settings > Authorized domains.';
  }
  if (code === 'auth/popup-closed-by-user') {
    return 'Sign-in popup was closed before completing. Please try again.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/user-not-found' || code === 'auth/wrong-password') {
    return 'Invalid email or password. Please verify your credentials or register a new account.';
  }
  if (code === 'auth/too-many-requests') {
    return 'Too many attempts. Please wait a few moments and try again.';
  }
  return msg || 'Authentication error. Please try again.';
};

export default function LoginPage() {
  const router = useRouter();
  const { user, loginWithEmail, loginWithGoogle } = useAuth();
  const { updateUserProfile, showToast } = useStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      setLoading(true);
      setError(null);
      await loginWithEmail(email, password);
      updateUserProfile({ email });
      showToast('Logged in successfully!');
      router.push('/dashboard');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
      showToast('Logged in with Google successfully');
      router.push('/dashboard');
    } catch (err: any) {
      setError(formatAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 sm:p-6 bg-[#05070c] text-slate-100 select-none">
      <div className="w-full max-w-md bg-[#090d16] border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-black text-white group-hover:border-[#00ff87] group-hover:shadow-neon transition-all">
              S
            </div>
            <span className="font-black text-sm tracking-wider text-white uppercase font-sans">
              SLATE CLOTHING
            </span>
          </Link>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight font-sans">
            LOGIN
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Sign in with your email or Google account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-xs font-mono text-red-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff87] focus:shadow-neon-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#00ff87] focus:shadow-neon-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#00ff87] text-[#05070c] hover:bg-[#00f0ff] font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-neon disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'LOGGING IN...' : 'LOGIN'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Link to Register */}
        <div className="text-center mt-4">
          <p className="text-xs font-mono text-slate-400">
            Don't have an account?{' '}
            <Link href="/register" className="text-[#00ff87] underline font-bold hover:text-white">
              Register
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="my-5 relative flex items-center justify-center">
          <span className="absolute inset-x-0 h-px bg-slate-800" />
          <span className="relative bg-[#090d16] px-3 text-[10px] font-mono font-bold text-slate-500 uppercase">
            OR
          </span>
        </div>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-white font-mono text-xs font-bold transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
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

        {/* Security Tag */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff87]" />
            SECURE ENCRYPTED AUTH
          </span>
          <span>SLATE AUTH</span>
        </div>

      </div>
    </div>
  );
}