export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum Status {
  all = 'all',
  completed = 'completed',
  active = 'active',
}
