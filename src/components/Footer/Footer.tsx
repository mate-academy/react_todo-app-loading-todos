import React from 'react';
import classNames from 'classnames';
import { TodosFilter } from '../../types/TodosFilter';

interface Props {
  TodosLength: number;
  statusToFilter: TodosFilter;
  filterTodosBy: (status: TodosFilter) => void;
}

export const Footer: React.FC<Props> = React.memo(({
  TodosLength,
  statusToFilter,
  filterTodosBy,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${TodosLength} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link', {
          selected: statusToFilter === TodosFilter.All,
        })}
        onClick={() => filterTodosBy(TodosFilter.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames('filter__link', {
          selected: statusToFilter === TodosFilter.Active,
        })}
        onClick={() => filterTodosBy(TodosFilter.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames('filter__link', {
          selected: statusToFilter === TodosFilter.Completed,
        })}
        onClick={() => filterTodosBy(TodosFilter.Completed)}
      >
        Completed
      </a>
    </nav>

    <button
      data-cy="ClearCompletedButton"
      type="button"
      className="todoapp__clear-completed"
    >
      Clear completed
    </button>
  </footer>
));
