import { ActiveFilter, Todo } from '../types';

export const makeFilterTodos = (
  todos: Todo[],
  filter: ActiveFilter,
): Todo[] => {
  switch (filter) {
    case 'active':
      return todos.filter(({ completed }) => !completed);

    case 'completed':
      return todos.filter(({ completed }) => completed);

    case 'all':
      return todos;

    default:
      // eslint-disable-next-line no-console
      console.warn('Unknown filter');

      return todos;
  }
};
