import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3106;

export enum TodosError {
  unableToLoad = 'Unable to load todos',
  titleNotEmpty = 'Title should not be empty',
  unableToAdd = 'Unable to add a todo',
  unableToDelete = 'Unable to delete a todo',
  unableToUpdate = 'Unable to update a todo',
}

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
