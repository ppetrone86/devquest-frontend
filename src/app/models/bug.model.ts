export enum BugSeverity {
  MINOR = 'MINOR',
  MAJOR = 'MAJOR',
  CRITICAL = 'CRITICAL',
}

export enum BugStatus {
  ACTIVE = 'ACTIVE',
  RESOLVED = 'RESOLVED',
  TRANSFERRED = 'TRANSFERRED',
}

export interface Bug {
  id: string;
  severity: BugSeverity;
}
