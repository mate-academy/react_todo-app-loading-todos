import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 292;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const getCount = (todos: Todo[]): number => {
  if (todos) {
    return todos.filter(todo => !todo.completed).length;
  }

  return 0;
};
