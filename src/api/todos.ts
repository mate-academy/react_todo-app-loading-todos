import { Todo } from '../types/Todo';
import { Status } from '../types/enums';
import { client } from '../utils/fetchClient';

export const USER_ID = 339;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

// export const addTodos = (todo: Todo) => {
//   return client.post<Todo[]>(`/todos?userId=${USER_ID}`);
// };

// export const deleteTodos = () => {
//   return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
// };

// export const updateTodos = () => {
//   return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
// };

// Add more methods here
type Params = {
  status: Status;
};

export const getPreparedTodos = (todos: Todo[], { status }: Params) => {
  const preparedTodos = [...todos];

  return preparedTodos.filter(todo => {
    switch (status) {
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
