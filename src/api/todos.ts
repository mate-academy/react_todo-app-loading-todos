import { TodoInterface } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2039;

// Add more methods here

export const get = async () => {
  try {
    const todos = await client.get<TodoInterface[]>(`/todos?userId=${USER_ID}`);

    return todos;
  } catch (error) {
    throw new Error('Unable to load todos');
  }
};
