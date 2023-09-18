export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum FilterStatus {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}
