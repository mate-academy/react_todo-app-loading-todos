import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { client } from '../utils/fetchClient';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getVisibleTodos = (todos: Todo[], filterBy: TodoStatus) => {
  let visibleTodos = todos;

  switch (filterBy) {
    case TodoStatus.Active:
      visibleTodos = todos.filter(todo => !todo.completed);
      break;

    case TodoStatus.Completed:
      visibleTodos = todos.filter(todo => todo.completed);
      break;

    case TodoStatus.All:
    default:
      break;
  }

  return visibleTodos;
};
