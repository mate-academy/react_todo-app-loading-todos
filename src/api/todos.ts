import { typeTodo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 584;

export const filterByStatus = async (status: string | boolean) => {
  try {
    let response = null;

    if (status === 'all') {
      response = await client.get<typeTodo[]>(`/todos`);
    } else {
      response = await client.get<typeTodo[]>(`/todos?completed=${status}`);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// Add more methods here
