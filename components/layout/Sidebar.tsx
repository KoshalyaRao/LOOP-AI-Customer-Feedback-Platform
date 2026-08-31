'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Inbox,
  TrendingUp,
  MessageSquare,
  FileText,
  Users,
  LogOut,
  Building2,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const user = session?.user as any;
  const role = user?.role || 'VIEWER';
  const workspaceName = user?.workspaceName || 'Acme SaaS';
  const userName = user?.name || 'User Account';
  const userEmail = user?.email || 'user@example.com';

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Feedback Inbox', href: '/inbox', icon: Inbox },
    { name: 'Trends', href: '/trends', icon: TrendingUp },
    { name: 'Ask LOOP', href: '/ask', icon: MessageSquare, badge: 'AI' },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Team & Settings', href: '/settings', icon: Users },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-3.5 left-4 z-50 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        aria-label="Toggle Navigation"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 glass-panel border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 font-extrabold text-lg tracking-wider">
                L
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                  LOOP
                  <span className="text-[10px] uppercase font-mono tracking-widest text-brand-400 px-1.5 py-0.5 rounded bg-brand-500/10 border border-brand-500/20">
                    SaaS
                  </span>
                </h1>
                <p className="text-[11px] text-slate-400 truncate">Close the loop on feedback.</p>
              </div>
            </div>

            {/* Workspace Indicator */}
            <div className="mt-4 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
              <Building2 className="w-4 h-4 text-brand-400 shrink-0" />
              <span className="font-medium truncate">{workspaceName}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-600/15 text-brand-300 border border-brand-500/30 shadow-md shadow-brand-600/5'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-gradient-to-r from-indigo-500 to-brand-500 text-white shadow-sm">
                      <Sparkles className="w-2.5 h-2.5" />
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-brand-300">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-white truncate">{userName}</p>
                <p className="text-[11px] text-slate-400 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
            <Badge variant="role" value={role}>
              {role}
            </Badge>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-400 transition-colors p-1"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
