import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
export const USER_ID = 4045;

function currentUserId() {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return readUserIdFromStorage();
}

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// helpers for other parts of the application
export const createTodo = (title: string) =>
  client.post<Todo>('/todos', {
    userId: currentUserId(),
    title,
    completed: false,
  });

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);

export const updateTodo = (
  id: number,
  updates: Partial<Pick<Todo, 'title' | 'completed'>>,
) => client.patch<Todo>(`/todos/${id}`, updates);
function readUserIdFromStorage() {
  throw new Error('Function not implemented.');
}
