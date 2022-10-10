import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';
import { TodoStatus } from '../types/TodoStatus';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const getFilteredTodos = (todosList: Todo[], todoFilter: string) => {
  return todosList.filter(todo => {
    switch (todoFilter) {
      case TodoStatus.ACTIVE:
        return !todo.completed;

      case TodoStatus.COMPLETED:
        return todo.completed;

      default:
      case TodoStatus.ALL:
        return todo;
    }
  });
};
