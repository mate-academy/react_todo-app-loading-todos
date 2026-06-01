import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 4252;

export const todosService = {
  list: () => client.get<Todo[]>(`/todos?userId=${USER_ID}`),
  // Add more methods here
};

export enum TodosServiceError {
  UnableToLoadTodos = 'todos_service_unable_to_load_todos',
  TitleShouldNotBeEmpty = 'todos_service_title_should_not_be_empty',
}

const TODOS_ERROR_MESSAGES: Record<TodosServiceError, string> = {
  [TodosServiceError.UnableToLoadTodos]: 'Unable to load todos',
  [TodosServiceError.TitleShouldNotBeEmpty]: 'Title should not be empty',
};

export function getTodoError(errorKey: TodosServiceError): string {
  return TODOS_ERROR_MESSAGES[errorKey];
}
