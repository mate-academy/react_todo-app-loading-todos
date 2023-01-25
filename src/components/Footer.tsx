import classNames from 'classnames';
import React, { FC } from 'react';
import { Filter } from '../types/Filters';

type Props = {
  uncomplitedTodosUnmount: number
  complitedFilter: Filter
  setComplitedFilter: (v: Filter) => void
};

export const Footer: FC<Props> = React.memo((props) => {
  const {
    uncomplitedTodosUnmount,
    complitedFilter,
    setComplitedFilter,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {` ${uncomplitedTodosUnmount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: complitedFilter === Filter.All,
          })}
          onClick={() => setComplitedFilter(Filter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: complitedFilter === Filter.Active,
          })}
          onClick={() => setComplitedFilter(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: complitedFilter === Filter.Complited,
          })}
          onClick={() => setComplitedFilter(Filter.Complited)}
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
