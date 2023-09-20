import React from 'react';
import classNames from 'classnames';
import { FilterTodos } from '../types/FilterTodos';

type Props = {
  filter: FilterTodos;
  setFilter: (newFilter: FilterTodos) => void;
  activeTodosCount: number;
  completedTodosCount: number;
};

export const TodoFooter: React.FC<Props> = ({
  filter,
  setFilter,
  activeTodosCount,
  completedTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.All,
          })}
          onClick={() => setFilter(FilterTodos.All)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Active,
          })}
          onClick={() => setFilter(FilterTodos.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filter === FilterTodos.Completed,
          })}
          onClick={() => setFilter(FilterTodos.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodosCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
