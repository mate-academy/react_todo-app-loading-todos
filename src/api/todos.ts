import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { Filter } from '../App';

export const USER_ID = 1;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const getTodosByStatus = (status: Filter): Promise<Todo[]> => {
  if (status === 'all') {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  } else if (status === 'completed') {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`);
  } else if (status === 'active') {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=false`);
  }
  
  // Default fallback to return all todos
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
}
