import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3128;
export const getUser = USER_ID;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const addTodo = (todo: Omit<Todo, 'id' | 'userId'>) =>
  client.post<Todo>('/todos', { ...todo, userId: USER_ID });

export const updateTodo = (todo: Todo) =>
  client.patch<Todo>(`/todos/${todo.id}`, { ...todo, userId: USER_ID });

export const deleteTodo = (id: number) => client.delete(`/todos/${id}`);
export const toggleAllTodos = (todos: Todo[], completed: boolean) =>
  Promise.all(
    todos.map(todo =>
      client.patch(`/todos/${todo.id}`, {
        ...todo,
        completed,
        userId: USER_ID,
      }),
    ),
  );

export const clearCompletedTodos = (todos: Todo[]) =>
  Promise.all(
    todos
      .filter(todo => todo.completed)
      .map(todo => client.delete(`/todos/${todo.id}`)),
  );
