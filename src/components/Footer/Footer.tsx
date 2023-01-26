/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import cn from 'classnames';
import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  uncompletedTodosAmount: number;
  completedFilter: string;
  onFilterButtonClick: (status: FilterTypes) => void;
};

export const Footer: React.FC<Props> = ({
  uncompletedTodosAmount,
  completedFilter,
  onFilterButtonClick,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedTodosAmount} item${uncompletedTodosAmount > 1 ? 's' : ''} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            { selected: completedFilter === FilterTypes.ALL },
          )}
          onClick={() => onFilterButtonClick(FilterTypes.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            { selected: completedFilter === FilterTypes.ACTIVE },
          )}
          onClick={() => onFilterButtonClick(FilterTypes.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: completedFilter === FilterTypes.COMPLETED },
          )}
          onClick={() => onFilterButtonClick(FilterTypes.COMPLETED)}
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
};
