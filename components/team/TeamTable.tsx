'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { formatDate } from '@/lib/utils';
import { Trash2, UserCheck } from 'lucide-react';
import { UserRole } from '@/types';
import { useSession } from 'next-auth/react';

interface TeamTableProps {
  members: any[];
  onUpdate: () => void;
}

export function TeamTable({ members, onUpdate }: TeamTableProps) {
  const { showToast } = useToast();
  const { data: session } = useSession();
  const currentUserId = (session?.user as any)?.id;
  const currentUserRole = (session?.user as any)?.role || 'VIEWER';
  const isAdmin = currentUserRole === 'ADMIN';

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      const res = await fetch(`/api/team/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update role');
      }

      showToast('Role updated successfully', 'success');
      onUpdate();
    } catch (err: any) {
      showToast(err.message || 'Error updating role', 'error');
    }
  };

  const handleRemoveMember = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to remove ${userName} from the workspace?`)) return;

    try {
      const res = await fetch(`/api/team/${userId}`, {
        method: 'DELETE',
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to remove member');
      }

      showToast('Team member removed', 'success');
      onUpdate();
    } catch (err: any) {
      showToast(err.message || 'Error removing member', 'error');
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold text-xs border-b border-slate-800">
            <tr>
              <th className="p-4">User Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Joined Date</th>
              {isAdmin && <th className="p-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="p-4 font-semibold text-white flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-brand-400">
                    {m.name.charAt(0)}
                  </div>
                  <span>{m.name}</span>
                  {m.id === currentUserId && (
                    <span className="text-[10px] bg-brand-500/20 text-brand-300 px-1.5 py-0.5 rounded font-mono">
                      (You)
                    </span>
                  )}
                </td>
                <td className="p-4 text-slate-300">{m.email}</td>
                <td className="p-4">
                  {isAdmin && m.id !== currentUserId ? (
                    <select
                      value={m.role}
                      onChange={(e) => handleRoleChange(m.id, e.target.value as UserRole)}
                      className="bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 rounded-lg p-1.5 focus:outline-none focus:border-brand-500 cursor-pointer"
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="ANALYST">ANALYST</option>
                      <option value="VIEWER">VIEWER</option>
                    </select>
                  ) : (
                    <Badge variant="role" value={m.role}>
                      {m.role}
                    </Badge>
                  )}
                </td>
                <td className="p-4 text-slate-400 text-xs">{formatDate(m.createdAt)}</td>
                {isAdmin && (
                  <td className="p-4 text-right">
                    {m.id !== currentUserId ? (
                      <button
                        onClick={() => handleRemoveMember(m.id, m.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-500 italic">Owner</span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
