import { Todo } from '../types/Todo';
import { TodoFilterType } from '../types/TodoFilterType';

export const filterTodos = (todos: Todo[], filter: TodoFilterType) => {
  switch (filter) {
    case TodoFilterType.active:
      return todos.filter(todo => !todo.completed);

    case TodoFilterType.completed:
      return todos.filter(todo => todo.completed);

    default:
      return todos;
  }
};
