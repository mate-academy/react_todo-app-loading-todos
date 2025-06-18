import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3137;

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

export const getTodos = async () => {
  await wait(300);

  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
