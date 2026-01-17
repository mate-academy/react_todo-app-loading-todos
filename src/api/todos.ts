import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 'https://mate.academy/students-api/todos?userId=3838';

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
