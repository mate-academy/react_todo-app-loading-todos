import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 418;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// Add more methods here

export const getVisibleTodos = (todos: Todo[], status: Status) => {
  switch (status) {
    case Status.Active:
      return todos.filter(todo => !todo.completed);

    case Status.Completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
