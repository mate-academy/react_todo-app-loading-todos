import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 1398;

// export const getTodos = (todosType: 'all' | 'active' | 'completed') => {
//   switch (todosType) {
//     case 'active':
//       return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=false`);
//     case 'completed':
//       return client.get<Todo[]>(`/todos?userId=${USER_ID}&completed=true`);
//     case 'all':
//     default:
//       return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
//   }
// };

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here
export const addTodo = (
  title: string,
  completed: boolean,
  userId: number = USER_ID,
) => {
  return client.post<Todo>('/todos', { userId, title, completed });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, {
    title: todo.title,
    completed: todo.completed,
  });
};
