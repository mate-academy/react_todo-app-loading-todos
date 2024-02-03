import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

// const todos = [
// { id: 1, completed: true, text: 'Buy milk' },
// { id: 2, completed: true, text: 'Write post' },
// { id: 3, completed: false, text: 'Walk the dog' }
// ];

// const allDelete = () => {
// const filtered = todos.filter((todo) => todo.completed);

// const promises = filtered.map((todo) => {
// return fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
// });

// Promise.all(promises);
// };
