import React from 'react';
import { FilterTodosBy } from '../../utils/FilterTodosBy';
import cn from 'classnames';
interface Props {
  uncompletedTodos: number;
  filterBy: FilterTodosBy;
  setFilteredBy: (filterBy: FilterTodosBy) => void;
}
export const Footer: React.FC<Props> = props => {
  const { uncompletedTodos, filterBy, setFilteredBy } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterTodosBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilteredBy(FilterTodosBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterTodosBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilteredBy(FilterTodosBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterTodosBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilteredBy(FilterTodosBy.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
