import { UserRole } from '@/types';

export type Permission =
  | 'feedback:read'
  | 'feedback:create'
  | 'feedback:update_status'
  | 'feedback:reclassify'
  | 'reports:read'
  | 'reports:create'
  | 'ask:read'
  | 'team:read'
  | 'team:manage';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'feedback:read',
    'feedback:create',
    'feedback:update_status',
    'feedback:reclassify',
    'reports:read',
    'reports:create',
    'ask:read',
    'team:read',
    'team:manage',
  ],
  ANALYST: [
    'feedback:read',
    'feedback:create',
    'feedback:update_status',
    'feedback:reclassify',
    'reports:read',
    'reports:create',
    'ask:read',
    'team:read',
  ],
  VIEWER: [
    'feedback:read',
    'reports:read',
    'ask:read',
    'team:read',
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function canManageTeam(role: UserRole): boolean {
  return hasPermission(role, 'team:manage');
}

export function canCreateFeedback(role: UserRole): boolean {
  return hasPermission(role, 'feedback:create');
}

export function canUpdateStatus(role: UserRole): boolean {
  return hasPermission(role, 'feedback:update_status');
}

export function canGenerateReport(role: UserRole): boolean {
  return hasPermission(role, 'reports:create');
}
