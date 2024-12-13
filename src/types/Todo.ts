export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum Filter {
  all = 'All',
  active = 'Active',
  completed = 'Completed',
}
