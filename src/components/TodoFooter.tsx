import React, { useCallback, useContext, useMemo } from 'react';
import classNames from 'classnames';

import { StateContext } from '../states/Global';
import { FilterBy } from '../types/FilterBy';

interface Props {
  selectedFilter: FilterBy,
  onFilterSelected: (value: FilterBy) => void,
}

export const TodoFooter: React.FC<Props> = React.memo(({
  selectedFilter,
  onFilterSelected,
}) => {
  const { todos } = useContext(StateContext);

  const isCompletedExists = useMemo(
    () => todos.some((todo) => todo.completed),
    [todos],
  );

  const getActiveCount = useCallback(() => {
    return todos.reduce((acc, todo) => {
      return !todo.completed ? acc + 1 : acc;
    }, 0);
  }, [todos]);

  const deleteCompleted = () => {};

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${getActiveCount()} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterSelected(FilterBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterSelected(FilterBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectedFilter === FilterBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterSelected(FilterBy.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={deleteCompleted}
        disabled={!isCompletedExists}
      >
        Clear completed
      </button>
    </footer>
  );
});
