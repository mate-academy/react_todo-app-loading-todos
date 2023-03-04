import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

// Add more methods here

// Creates new todo

// const BaseURL = 'https://mate.academy/students-api/todos?userId=6502';

// fetch(BaseURL, {
//   method: 'POST',
//   body: JSON.stringify({
//     userId: 6502,
//     title: 'Learn React',
//     completed: false,
//   }),
//   headers: {
//     'Content-type': 'application/json; charset=UTF-8',
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
