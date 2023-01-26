import React, { FC } from 'react';
import cn from 'classnames';
import { Filters } from '../../types/Filters';

type Props = {
  activeTodos: number,
  selectedStatus: Filters,
  setSelectedStatus: (selectedStatus: Filters) => void,
};

export const Filter: FC<Props> = React.memo(
  ({
    selectedStatus, setSelectedStatus, activeTodos,
  }) => {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${activeTodos} item${(activeTodos === 0 || activeTodos > 1) && 's'} left`}
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            data-cy="FilterLinkAll"
            href="#/"
            className={cn(
              'filter__link',
              {
                selected: selectedStatus === Filters.All,
              },
            )}
            onClick={() => setSelectedStatus(Filters.All)}
          >
            All
          </a>

          <a
            data-cy="FilterLinkActive"
            href="#/active"
            className={cn(
              'filter__link',
              {
                selected: selectedStatus === Filters.Active,
              },
            )}
            onClick={() => setSelectedStatus(Filters.Active)}
          >
            Active
          </a>
          <a
            data-cy="FilterLinkCompleted"
            href="#/completed"
            className={cn(
              'filter__link',
              {
                selected: selectedStatus === Filters.Completed,
              },
            )}
            onClick={() => setSelectedStatus(Filters.Completed)}
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
  },
);
