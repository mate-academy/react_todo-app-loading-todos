import { FilterType } from '../types/FilterType';
import { TypeTodo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 584;

export const filterByStatus = async (status: FilterType | boolean) => {
  try {
    let response = null;

    if (status === FilterType.All) {
      response = await client.get<TypeTodo []>(`/todos?userId=${USER_ID}`);
    } else {
      response = await client.get<TypeTodo[]>(
        `/todos?userId=${USER_ID}&completed=${status === FilterType.Active ? false : true}`
      );
    }

    return response;
  } catch (error) {
    throw error;
  }
};

// Add more methods here
