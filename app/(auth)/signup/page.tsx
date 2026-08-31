'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Building2, User, Mail, Lock } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [workspaceName, setWorkspaceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          workspaceName,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      showToast('Workspace created! Logging you in...', 'success');

      // Auto login
      const loginRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Signup failed');
      showToast(err.message || 'Signup failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-panel rounded-3xl p-8 border border-slate-800 shadow-2xl space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-xl shadow-brand-500/25 font-extrabold text-2xl tracking-wider mx-auto">
            L
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Create your Workspace</h1>
          <p className="text-xs text-slate-400">You will automatically be assigned the ADMIN role.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Company / Workspace Name</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="e.g. Acme SaaS"
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor"
                required
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Work Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="sarah@acme.com"
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
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full h-11 text-sm font-bold mt-2" isLoading={isLoading}>
            Create Account & Workspace
          </Button>
        </form>

        <p className="text-center text-xs text-slate-400 pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-400 font-semibold hover:text-brand-300">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
