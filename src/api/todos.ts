import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4231;

export const todosService = {
  list: () => client.get<Todo[]>(`/todos?userId=${USER_ID}`),
};

export enum TodosServiceError {
  UnableToLoadTodos = 'todos_service_unable_to_load_todos',
  TitleShouldNotBeEmpty = 'todos_service_title_should_not_be_empty',
  UnableToAddATodo = 'todos_service_unable_to_add_a_todo',
  UnableToDeleteATodo = 'todos_service_unable_to_delete_a_todo',
  UnableToUpdateATodo = 'todos_service_unable_to_update_a_todo',
}

export const TODOS_ERROR_MESSAGES: Record<TodosServiceError, string> = {
  [TodosServiceError.UnableToLoadTodos]: 'Unable to load todos',
  [TodosServiceError.TitleShouldNotBeEmpty]: 'Title should not be empty',
  [TodosServiceError.UnableToAddATodo]: 'Unable to add a todo',
  [TodosServiceError.UnableToDeleteATodo]: 'Unable to delete a todo',
  [TodosServiceError.UnableToUpdateATodo]: 'Unable to update a todo',
};

export function getTodoError(errorKey: TodosServiceError): string {
  return TODOS_ERROR_MESSAGES[errorKey];
}
// Add more methods here
