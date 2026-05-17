export const StatusMap = {
  All: 'all',
  Completed: 'completed',
  Active: 'active',
} as const;

export type Status = (typeof StatusMap)[keyof typeof StatusMap];
