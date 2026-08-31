'use client';

import React, { useState, useEffect } from 'react';
import { TeamTable } from '@/components/team/TeamTable';
import { InviteMemberModal } from '@/components/team/InviteMemberModal';
import { Button } from '@/components/ui/Button';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Users, UserPlus, ShieldCheck } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function SettingsPage() {
  const { data: session } = useSession();
  const role = (session?.user as any)?.role || 'VIEWER';
  const isAdmin = role === 'ADMIN';

  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const fetchTeamMembers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/team');
      const data = await res.json();
      if (res.ok) {
        setMembers(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch team members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-400" /> Team Members & RBAC Settings
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage workspace member permissions across ADMIN, ANALYST, and VIEWER roles.
          </p>
        </div>

        {isAdmin && (
          <Button variant="primary" onClick={() => setIsInviteOpen(true)} className="gap-2 shrink-0">
            <UserPlus className="w-4 h-4" /> Add Team Member
          </Button>
        )}
      </div>

      {/* Role Matrix Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1">
          <div className="flex items-center gap-2 text-indigo-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> ADMIN Role
          </div>
          <p className="text-slate-300 leading-relaxed">
            Full access to workspace settings, member role assignment, CSV bulk imports, feedback creation, report generation, and analytics.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 space-y-1">
          <div className="flex items-center gap-2 text-cyan-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-cyan-400" /> ANALYST Role
          </div>
          <p className="text-slate-300 leading-relaxed">
            Can ingest feedback, run bulk CSV imports, change feedback status, re-classify items with AI, ask LOOP, and generate VoC reports.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
          <div className="flex items-center gap-2 text-slate-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-slate-400" /> VIEWER Role
          </div>
          <p className="text-slate-300 leading-relaxed">
            Read-only access to view the analytics dashboard, feedback inbox, trends, Ask LOOP Q&A, and VoC reports.
          </p>
        </div>
      </div>

      {/* Team Table */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Workspace Members ({members.length})</h3>
        {isLoading ? (
          <LoadingSkeleton count={3} height="h-16" />
        ) : (
          <TeamTable members={members} onUpdate={fetchTeamMembers} />
        )}
      </div>

      {/* Invite Modal */}
      <InviteMemberModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        onSuccess={fetchTeamMembers}
      />
    </div>
  );
}
