import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

interface Props {
  leftTodos: number,
  filterType: FilterType,
  getFilteredTodos: (type: FilterType) => void,
}

export const Footer: React.FC<Props> = ({
  leftTodos,
  filterType,
  getFilteredTodos,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${leftTodos} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames('filter__link', {
          selected: filterType === FilterType.ALL,
        })}
        onClick={() => getFilteredTodos(FilterType.ALL)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames('filter__link', {
          selected: filterType === FilterType.ACTIVE,
        })}
        onClick={() => getFilteredTodos(FilterType.ACTIVE)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterType === FilterType.COMPLETED,
        })}
        onClick={() => getFilteredTodos(FilterType.COMPLETED)}
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
);
