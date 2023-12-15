export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum States {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface Error {
  load: boolean;
  title: boolean;
  add: boolean;
  remove: boolean;
  update: boolean;
}
