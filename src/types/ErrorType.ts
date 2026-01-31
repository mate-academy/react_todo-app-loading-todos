export enum ErrorType {
  NoError = '',
  LoadTodosError = 'Unable to load todos',
  AddTodoError = 'Unable to add todo',
  UpdateTodoError = 'Unable to update todo',
  DeleteTodoError = 'Unable to delete todo',
  EmptyTodoTitleError = 'Title should not be empty',
}
