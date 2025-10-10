// eslint-disable-next-line max-len
const BASE_URL =
  'https://mate-academy.github.io/react_todo-app-loading-todos/api';

export const USER_ID = 3170;

export const getTodos = async () => {
  const response = await fetch(`${BASE_URL}/todos?userId=${USER_ID}`);

  if (!response.ok) {
    throw new Error('Unable to load todos');
  }

  return response.json();
};
