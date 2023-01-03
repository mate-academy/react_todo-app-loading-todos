import classNames from 'classnames';
import React from 'react';

import { FilterType } from '../../types/FilterType';

export type Props = {
  onDeleteCompletedTodos(): void,
  todosLeft: number,
  setFilterType(type: FilterType): void,
  filterType: FilterType,
};

export const Footer: React.FC<Props> = ({
  onDeleteCompletedTodos,
  todosLeft,
  setFilterType,
  filterType,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link', { selected: FilterType.All === filterType },
          )}
          onClick={() => setFilterType(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link', { selected: FilterType.Active === filterType },
          )}
          onClick={() => setFilterType(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link', { selected: FilterType.Completed === filterType },
          )}
          onClick={() => setFilterType(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={onDeleteCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
