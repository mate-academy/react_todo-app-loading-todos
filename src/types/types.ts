export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum TodoFilterEnum {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
