export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum TodoFilterMethod {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
  Default = All,
}
