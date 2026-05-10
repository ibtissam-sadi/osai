export const permissionMatrix = {
  SUPER_ADMIN: ['*'],
  ORG_ADMIN: ['users:manage', 'documents:manage', 'workflows:manage', 'compliance:read'],
  RECORDS_MANAGER: ['documents:manage', 'retention:manage', 'search:read'],
  ARCHIVIST: ['documents:read', 'documents:archive', 'search:read'],
  COMPLIANCE_OFFICER: ['compliance:read', 'compliance:manage', 'audit:read'],
  AUDITOR: ['audit:read', 'documents:read'],
  DEPARTMENT_HEAD: ['documents:approve', 'workflows:approve', 'search:read'],
  REVIEWER: ['workflows:approve', 'documents:read'],
  USER: ['documents:read', 'search:read']
} as const;

export type Role = keyof typeof permissionMatrix;

export const can = (role: Role, permission: string): boolean => {
  const grants = permissionMatrix[role] || [];
  return grants.includes('*') || grants.includes(permission);
};
