import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

const ENDPOINTS = {
  todosByUserId: '/todos?userId=',
  createTodo: '/todos',
};

export const getTodosByUserId = (userId: number): Promise<Todo[]> => {
  const requestUrl = `${ENDPOINTS.todosByUserId}${userId}`;

  return client.get<Todo[]>(requestUrl);
};

export const createTodo = (fieldsToCreate: Omit<Todo, 'id'>) => {
  const body = JSON.stringify(fieldsToCreate);
  const requestUrl = `${ENDPOINTS.createTodo}`;

  return client.post<Todo>(requestUrl, body);
};
