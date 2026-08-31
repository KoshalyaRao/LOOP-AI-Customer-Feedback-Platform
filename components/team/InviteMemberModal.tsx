'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { UserRole } from '@/types';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InviteMemberModal({ isOpen, onClose, onSuccess }: InviteMemberModalProps) {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('ANALYST');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to invite team member');
      }

      showToast(`Added ${name} to team as ${role}!`, 'success');
      setName('');
      setEmail('');
      setRole('ANALYST');
      onSuccess();
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Error adding team member', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add / Invite Workspace Team Member"
      subtitle="New members will be created with default password 'password123'."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Taylor Reed"
            required
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. taylor@acme.com"
            required
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Assigned Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
          >
            <option value="ADMIN">ADMIN (Full access & member management)</option>
            <option value="ANALYST">ANALYST (Add feedback, status update, reports)</option>
            <option value="VIEWER">VIEWER (Read-only dashboard & trends)</option>
          </select>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" isLoading={isLoading}>
            Add Team Member
          </Button>
        </div>
      </form>
    </Modal>
  );
}
