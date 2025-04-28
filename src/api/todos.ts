import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 0;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

import { wait } from './fetchClient'; // Assuming the `fetchClient` has a `wait` function

const BASE_URL = 'https://mate-academy.github.io/react_todo-app-with-api';
const TODOS_API_URL = `${BASE_URL}/api/todos`;

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const getTodosByUserId = async (userId: number): Promise<Todo[]> => {
  await wait(100); // Simulate server delay
  const response = await fetch(`${TODOS_API_URL}?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to load todos. Please try again.');
  }

  return response.json();
};

// Add more methods here
