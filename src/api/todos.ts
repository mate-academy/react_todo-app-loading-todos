import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// export const USER_ID = 3044;
export const USER_ID = 3049;
// https://mate.academy/students-api/todos?userId=3047

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};
