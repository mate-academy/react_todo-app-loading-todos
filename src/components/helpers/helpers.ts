import { FilterTypes } from '../../types/FilterTypes';
import { Todo } from '../../types/Todo';

export const filterTodos = (todos: Todo[], filterBy: FilterTypes) => {
  return filterBy !== FilterTypes.ALL
    ? todos.filter(todo => {
      switch (filterBy) {
        case FilterTypes.ACTIVE:
          return !todo.completed;

        case FilterTypes.COMPLETED:
          return todo.completed;

        default:
          return todo;
      }
    })
    : todos;
};

export const countActiveTodos = (todos: Todo[]) => {
  return todos.filter(todo => !todo.completed).length;
};

export const checkIsTodoCompleted = (todos: Todo[]) => {
  return todos.some(todo => todo.completed);
};
