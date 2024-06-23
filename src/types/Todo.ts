export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}
