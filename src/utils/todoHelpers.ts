import { Todo } from '../types/Todo';
import { TodoStatus } from '../enums/TodoStatus';

export const filterTodos = (todos: Todo[], status: TodoStatus): Todo[] => {
  switch (status) {
    case TodoStatus.Active:
      return todos.filter(todo => !todo.completed);
    case TodoStatus.Completed:
      return todos.filter(todo => todo.completed);
    case TodoStatus.All:
    default:
      return todos;
  }
};
