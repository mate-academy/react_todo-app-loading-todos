import { SortType } from '../types/SortType';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  sortType: SortType,
  titleQuery: string,
): Todo[] => {
  return todos.filter(todo => {
    let isSortType = true;
    const normalizedTodoTitle = todo.title.toLowerCase();
    const normalizedQuery = titleQuery.toLowerCase();

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

    return isSortType && normalizedTodoTitle.includes(normalizedQuery);
  });
};
