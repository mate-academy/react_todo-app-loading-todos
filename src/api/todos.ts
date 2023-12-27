import { Todo } from '../libs/types/Todo';
import { client } from '../libs/utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
