import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (uri: string) => {
  return client.get<Todo[]>(`/todos${uri}`);
};

// Add more methods here
