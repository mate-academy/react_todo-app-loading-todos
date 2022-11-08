import classNames from 'classnames';
import React, { useMemo } from 'react';
import { FilterType } from '../../types/FilterType';
import { Todo } from '../../types/Todo';

type Props = {
  filterType: FilterType
  setFilterType: (status: FilterType) => void
  todos: Todo[]
};

export const Footer: React.FC<Props> = React.memo(({
  filterType,
  setFilterType,
  todos,
}) => {
  const uncompletedCount = useMemo(() => (
    todos.filter(({ completed }) => !completed).length
  ), [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${uncompletedCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.All,
          })}
          onClick={() => setFilterType(FilterType.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Active,
          })}
          onClick={() => setFilterType(FilterType.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Completed,
          })}
          onClick={() => setFilterType(FilterType.Completed)}
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
