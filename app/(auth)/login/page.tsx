'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, UserCheck, Eye, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        throw new Error('Invalid email or password');
      }

      showToast('Logged in successfully!', 'success');
      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed');
      showToast(err.message || 'Login failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoUser = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-brand-500/25 font-extrabold text-2xl tracking-wider mx-auto">
            L
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back to LOOP</h1>
          <p className="text-xs text-slate-400">Close the loop on customer feedback intelligence.</p>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="space-y-2 pt-2 border-t border-b border-slate-800/80 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center">
            Quick Demo Logins (Click to Fill):
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => fillDemoUser('admin@acme.com')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-brand-600/20 text-slate-200 border border-slate-800 hover:border-brand-500/40 text-xs font-medium flex flex-col items-center gap-1 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoUser('analyst@acme.com')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-brand-600/20 text-slate-200 border border-slate-800 hover:border-brand-500/40 text-xs font-medium flex flex-col items-center gap-1 transition-all"
            >
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Analyst</span>
            </button>

            <button
              type="button"
              onClick={() => fillDemoUser('viewer@acme.com')}
              className="p-2 rounded-xl bg-slate-900 hover:bg-brand-600/20 text-slate-200 border border-slate-800 hover:border-brand-500/40 text-xs font-medium flex flex-col items-center gap-1 transition-all"
            >
              <Eye className="w-4 h-4 text-slate-400" />
              <span>Viewer</span>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@acme.com"
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full h-11 text-sm font-bold mt-2" isLoading={isLoading}>
            Sign In to LOOP
          </Button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-xs text-slate-400 pt-2">
          Don't have a workspace account?{' '}
          <Link href="/signup" className="text-brand-400 font-semibold hover:text-brand-300">
            Create Workspace & Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
