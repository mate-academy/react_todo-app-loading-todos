import { TypeTodo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 584;

export const getData = async () => {
  try {
    const response  = await client.get<TypeTodo []>(`/todos?userId=${USER_ID}`);

    return response;
  } catch (error) {
    throw error;
  }
};

// Add more methods here
