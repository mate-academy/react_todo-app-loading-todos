import React from 'react';
import cn from 'classnames';
import { FilterType } from '../../types/FilterType';

interface Props {
  activeTodos: number;
  hasCompletedTodos: boolean;
  filterType: FilterType;
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
}

export const Footer: React.FC<Props> = ({
  activeTodos,
  hasCompletedTodos,
  filterType,
  setFilterType,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.All,
            },
          )}
          onClick={() => setFilterType(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.Active,
            },
          )}
          onClick={() => setFilterType(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            {
              selected: filterType === FilterType.Completed,
            },
          )}
          onClick={() => setFilterType(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {
        hasCompletedTodos && (
          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        )
      }
    </footer>
  );
};
