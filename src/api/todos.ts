import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

// ставим рандомную цифру типо 5 и генерим этих юзеров в тудушки
export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
