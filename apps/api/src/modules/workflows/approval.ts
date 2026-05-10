export interface ApprovalStep {
  approverId: string;
  orderIndex: number;
  departmentCode: string;
}

export const buildApprovalChain = (classification: string): ApprovalStep[] => {
  if (classification === 'SECRET') {
    return [
      { approverId: 'dept-head', orderIndex: 1, departmentCode: 'SEC' },
      { approverId: 'compliance', orderIndex: 2, departmentCode: 'CMP' },
      { approverId: 'org-admin', orderIndex: 3, departmentCode: 'GOV' }
    ];
  }

  return [
    { approverId: 'records-manager', orderIndex: 1, departmentCode: 'ARC' },
    { approverId: 'department-head', orderIndex: 2, departmentCode: 'OPS' }
  ];
};
