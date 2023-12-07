import { Status, Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getVisibleTodos = (todos: Todo[], filter: Status) => {
  switch (filter) {
    case Status.Completed:
      return [...todos].filter(todo => todo.completed);

    case Status.Active:
      return [...todos].filter(todo => !todo.completed);

    default:
      return todos;
  }
};
