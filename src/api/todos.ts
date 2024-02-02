import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 89;

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
// https://mate.academy/students-api/todos?userId=89
