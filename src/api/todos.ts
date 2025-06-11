import { FilterStatusType } from '../types/FilterStatusType';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3107;

export const getTodos = (filterStatus: FilterStatusType) => {
  if (filterStatus === FilterStatusType.All) {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
  } else if (filterStatus === FilterStatusType.Active) {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=false`);
  } else {
    return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`);
  }
};

// Add more methods here
