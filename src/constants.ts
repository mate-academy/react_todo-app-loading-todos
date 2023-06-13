import { Todo } from './types/Todo';

export enum FilterValues {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const filteredTodos = (todos: Todo[], filter: FilterValues): Todo[] => {
  switch (filter) {
    case FilterValues.COMPLETED:
      return todos.filter((todo) => todo.completed);

    case FilterValues.ACTIVE:
      return todos.filter((todo) => !todo.completed);

    default: return todos;
  }
};
