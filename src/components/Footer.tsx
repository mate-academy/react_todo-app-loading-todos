import cn from 'classnames';

import { Todo } from '../types/Todo';
import { FilterOptions } from '../types/FilterOptions';

type Props = {
  todos: Todo[];
  filterOption: FilterOptions;
  onFilter: (newFilterOption: FilterOptions) => void;
};

export default function Footer({ todos, filterOption, onFilter }: Props) {
  const countTodosLeft = todos.filter(todo => !todo.completed).length;
  const countTodosCompleted = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodosLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilter(FilterOptions.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilter(FilterOptions.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterOption === FilterOptions.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilter(FilterOptions.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!countTodosCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
}
