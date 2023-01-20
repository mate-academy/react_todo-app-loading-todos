import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const fetchTodos = (
  userId: number,
  todosSetter: (value: React.SetStateAction<Todo[]>) => void,
  errorSetter: Dispatch<SetStateAction<string>>,
) => {
  getTodos(userId)
    .then(todosFromServer => todosSetter(todosFromServer))
    .catch(() => errorSetter('ServerFail'));
};
