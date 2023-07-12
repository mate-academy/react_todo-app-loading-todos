import { Todo } from './types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

// delete
function getRandomText() {
  const words = ['dolor', 'sit', 'amet', 'elit', 'sed', 'do'];

  let randomText = '';

  for (let i = 0; i < 5; i += 1) {
    const randomIndex = Math.floor(Math.random() * words.length);

    randomText += `${words[randomIndex]} `;
  }

  return randomText.trim();
}

export const getTodosFromServer = (userId: number) => {
  return fetch(`${BASE_URL}/todos?userId=${userId}&`)
    .then((data) => data.json())
    .catch((error) => new Error(error.message));
};

export const setTodoOnServer = (srt: string, userId: number) => {
  return fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      userId,
      completed: Boolean(+Date.now() % 2), // delete Boolean
      title: srt || getRandomText(), // delete getRandom
    }),
  }).catch((error) => new Error(error.message));
};

export const deleteTodoOnServer = (id: number) => {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  }).catch((error) => new Error(error.message));
};

export const setTodoCompleteStatus = (id: number, object: Partial<Todo>) => {
  return fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(object),
  }).catch((error) => new Error(error.message));
};

export const getTodosCompletedStatus
  = (f: (arg: Todo[]) => void, arg: boolean) => {
    return fetch(`${BASE_URL}/todos?completed=${arg}`)
      .then((data) => data.json())
      .then((todoList) => f(todoList))
      .catch((error) => new Error(error.message));
  };
