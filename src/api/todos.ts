import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here
export const toggleTodoStatus
= async (userId: number, todoId?: number,
  completed?: boolean): Promise<Todo> => {
  const updatedTodo = await client.patch<Todo>(`/todos/${todoId}`, userId, { completed });

  return updatedTodo;
};

export const deleteTodo
= async (userId: number, todoId?: number): Promise<void> => {
  await client.delete(`/todos/${todoId}`, userId);
};

export const clearCompletedTodos
= async (userId: number, todos: Todo[]): Promise<void> => {
  const deletePromises = todos
    .filter(todo => todo.completed)
    .map(completedTodo => deleteTodo(userId, completedTodo.id));

  await Promise.all(deletePromises);
};
