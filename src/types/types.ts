export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export enum TodoFilter {
  All = '#/',
  Active = '#/active',
  Completed = '#/completed',
}

export enum ErrorType {
  LoadError = 'LOAD_ERROR',
  EmptyTitle = 'EMPTY_TITLE',
  AddTodoError = 'ADD_TODO_ERROR',
  DeleteTodoError = 'DELETE_TODO_ERROR',
  UpdateTodoError = 'UPDATE_TODO_ERROR',
}
