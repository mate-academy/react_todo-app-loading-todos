import Todo from 'models/Todo';
import { HttpClient } from '../utilities/HttpClient';

export const getTodos = (userId: number) => {
  return HttpClient.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
