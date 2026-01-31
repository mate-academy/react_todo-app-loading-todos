// src/utils/getVisibleTodos.ts
import { Todo } from '../types/Todo';
import { FilterState } from '../types/FilterState';

export const getVisibleTodos = (todos: Todo[], filter: FilterState) => {
  return todos.filter(todo => {
    switch (filter) {
      case FilterState.Active:
        return !todo.completed;
      case FilterState.Completed:
        return todo.completed;
      default:
        return true;
    }
  });
};