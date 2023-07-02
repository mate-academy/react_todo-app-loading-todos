import { useMemo } from 'react';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export const VisibleTodos = (todos: Todo[], todoStatus: TodoStatus) => {
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (todoStatus) {
        case TodoStatus.ALL:
          return todo;

        case TodoStatus.ACTIVE:
          return !todo.completed;

        case TodoStatus.COMPLETED:
          return todo.completed;

        default:
          throw new Error(`${todoStatus} is not defined`);
      }
    });
  }, [todos, todoStatus]);

  return visibleTodos;
};
