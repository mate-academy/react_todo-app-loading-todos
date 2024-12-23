import React from 'react';
import { Filters } from '../../types/Filters';
import cn from 'classnames';

type Props = {
  activeTodosCount: number;
  setFilter: (filter: Filters) => void;
  filter: Filters;
};

export const Footer: React.FC<Props> = props => {
  const { activeTodosCount, setFilter, filter } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Filters.All })}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filter === Filters.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Filters.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filters.Completed)}
        >
          Completed
        </a>
      </nav>

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
