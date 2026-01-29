import React from 'react';
import cn from 'classnames';
import { FilterStatus } from '../types/FilterStatus';
import { Todo } from '../types/Todo';

type Props = {
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
  todos,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={cn('filter__link', {
            selected: currentFilter === FilterStatus.All,
          })}
          onClick={() => onFilterChange(FilterStatus.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={cn('filter__link', {
            selected: currentFilter === FilterStatus.Active,
          })}
          onClick={() => onFilterChange(FilterStatus.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={cn('filter__link', {
            selected: currentFilter === FilterStatus.Completed,
          })}
          onClick={() => onFilterChange(FilterStatus.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        style={{ visibility: 'hidden' }}
      >
        Clear completed
      </button>
    </footer>
  );
};
