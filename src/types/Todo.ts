export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum FilterStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
