import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const addTodos = (userId:number, title:string) => {
  const data = {
    userId,
    title,
    completed: false,
  };

  return client.post<Todo[]>(`/todos?userId=${userId}`, data);
};
