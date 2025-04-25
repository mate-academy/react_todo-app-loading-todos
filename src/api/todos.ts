import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 2365;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const getTodosMock = () => {
  return Promise.resolve(
    JSON.parse(
      `[
    {
        "id": 209951,
        "createdAt": "2025-04-25T13:49:53.381Z",
        "updatedAt": "2025-04-25T17:40:56.933Z",
        "userId": 2364,
        "title": "test1",
        "completed": true
    },


      {
        "id": 209952,
        "createdAt": "2025-04-25T14:49:53.381Z",
        "updatedAt": "2025-04-25T17:40:56.933Z",
        "userId": 2365,
        "title": "test2",
        "completed": false
    }
]`,
    ),
  );
};
