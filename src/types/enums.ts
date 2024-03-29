export enum Status {
  'All' = 'All',
  'Active' = 'Active',
  'Completed' = 'Completed',
}

export enum State {
  Edit = 'edit',
  Loading = 'loading',
  Active = 'active',
}

export enum Errors {
  LoadTodos = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  AddTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}