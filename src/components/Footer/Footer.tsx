import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  onFilterBy: (filter: FilterBy) => void,
  filterBy: FilterBy,
  notCompletedTodos:number,
  isClearButtonVisible: boolean;
};

export const Footer: React.FC<Props> = React.memo(({
  onFilterBy,
  filterBy,
  notCompletedTodos,
  isClearButtonVisible,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${notCompletedTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link',
            {
              selected: filterBy === FilterBy.ALL,
            })}
          onClick={() => {
            onFilterBy(FilterBy.ALL);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            {
              selected: filterBy === FilterBy.ACTIVE,
            })}
          onClick={() => {
            onFilterBy(FilterBy.ACTIVE);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            {
              selected: filterBy === FilterBy.COMPLETED,
            })}
          onClick={() => {
            onFilterBy(FilterBy.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className={cn('todoapp__clear-completed',
          {
            'is-invisible': !isClearButtonVisible,
          })}

      >
        Clear completed
      </button>
    </footer>
  );
});
