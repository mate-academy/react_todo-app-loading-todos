import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
export async function getUserid(email: string) {
  const reponse = await fetch('https://mate.academy/students-api/users');
  const r = await reponse.json();
  const user = r.find(item => item.email === email);

  return user;
}

export const USER_ID = 4130;

const BASE_URL = '/todos?userId=';

export const getTodos = async () => {
  return client.get<Todo[]>(`${BASE_URL}${USER_ID}`);
};

export const getIdTodo = async () => {
  const actuallyTodo = await getTodos();

  const maxId = Math.max(...actuallyTodo.map(todo => todo.id));

  const newId = maxId + 1;

  return newId;
};

export const postTodo = async (data: object) => {
  return client.post(`${BASE_URL}${USER_ID}`, data);
};

export const patchTodo = async (id: number, data: object) => {
  return client.patch(`/todos/${id}`, data);
};

export const deleteTodo = async (id: number) => {
  return client.delete(`/todos/${id}`);
};

// Add more methods here
