import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export const visibleTodos = (todos: Todo[], todoStatus: TodoStatus) => {
  return todos.filter(todo => {
    switch (todoStatus) {
      case TodoStatus.ALL:
        return todo;

      case TodoStatus.ACTIVE:
        return todo.completed === false;

      case TodoStatus.COMPLETED:
        return todo.completed === true;

      default:
        throw new Error(`${todoStatus} is not defined`);
    }
  });
};
