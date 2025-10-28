import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3620;

const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

const createTodo = ({
  title,
  completed = false,
}: Pick<Todo, 'title' | 'completed'>) => {
  return client.post<Todo[]>(`/todos`, { title, completed });
};

const editTodo = ({ id, userId, title, completed = false }: Todo) => {
  return client.patch<Todo>(`/todos/${id}`, { userId, completed, title });
};

const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const server = { getTodos, createTodo, editTodo, deleteTodo };
