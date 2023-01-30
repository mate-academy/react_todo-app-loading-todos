import React, { memo } from 'react';
import cn from 'classnames';
import { Filters } from '../types/Filters';

type Props = {
  activeTodos: number,
  filterOption: Filters,
  onChangeFilterType: (str: Filters) => void
};

export const TodosFooter: React.FC<Props> = memo(({
  activeTodos,
  filterOption,
  onChangeFilterType,
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
          className={cn('filter__link', {
            selected: filterOption === Filters.ALL,
          })}
          onClick={() => onChangeFilterType(Filters.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: filterOption === Filters.ACTIVE,
          })}
          onClick={() => onChangeFilterType(Filters.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: filterOption === Filters.COMPLETED,
          })}
          onClick={() => onChangeFilterType(Filters.COMPLETED)}
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
});
