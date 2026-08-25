import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// replaced with the userId you received after registering at
// https://mate-academy.github.io/react_student-registration/
export const USER_ID = 4436;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
