export enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}
