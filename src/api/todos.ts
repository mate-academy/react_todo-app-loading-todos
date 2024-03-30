import { Todo } from '../types/Todo';
import { Status } from '../types/enums';
import { client } from '../utils/fetchClient';

export const USER_ID = 339;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

type Params = {
  statusTodo: Status;
};

export const getPreparedTodos = (todos: Todo[], { statusTodo }: Params) => {
  const preparedTodos = [...todos];

  return preparedTodos.filter(todo => {
    switch (statusTodo) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      case Status.All:
      default:
        return todo;
    }
  });
};
