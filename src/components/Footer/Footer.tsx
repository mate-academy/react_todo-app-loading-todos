import classNames from 'classnames';
import React from 'react';
import { FilterBy } from '../../types/FilterBy';
import { Todo } from '../../types/Todo';

type Props = {
  filterBy: string,
  setFilterBy: (str: FilterBy) => void,
  todosActive: Todo[],
  todosCompleted: Todo[],
};

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  todosActive,
  todosCompleted,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosActive.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            {
              selected: filterBy === FilterBy.All,
            },
          )}
          onClick={() => setFilterBy(FilterBy.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            {
              selected: filterBy === FilterBy.Active,
            },
          )}
          onClick={() => setFilterBy(FilterBy.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            {
              selected: filterBy === FilterBy.Completed,
            },
          )}
          onClick={() => setFilterBy(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        {!!todosCompleted.length && 'Clear completed'}
      </button>
    </footer>
  );
};
