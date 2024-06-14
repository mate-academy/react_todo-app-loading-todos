import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 653;

export const getTodos = () => {
  const path = `/todos?userId=${USER_ID}`;

  return client.get<Todo[]>(path);
};

// Add more methods here

// export const USER_ID = 653;

// export const getTodos = (filter: State['filter']) => {
//   let path = `/todos?userId=${USER_ID}`;

//   if (filter !== 'all') {
//     path += `&completed=${filter === 'completed'}`;
//   }

//   return client.get<Todo[]>(path);
// };

// // Add more methods here
