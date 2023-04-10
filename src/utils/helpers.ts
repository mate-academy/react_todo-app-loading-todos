import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  sortType: SortType,
): Todo[] => {
  return todos.filter(todo => {
    let isSortType = true;

    switch (sortType) {
      case SortType.ACTIVE:
        isSortType = !todo.completed;
        break;

      case SortType.COMPLETED:
        isSortType = todo.completed;
        break;

      default:
        break;
    }

    return isSortType;
  });
};
