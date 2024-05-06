import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 560;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const postTodo = (newTodo: Todo) => {
  return client.post<Todo>('/todos', newTodo);
};

// Add more methods here
