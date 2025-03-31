import React from 'react';
import classNames from 'classnames';
import { FilterBy } from '../../types/Todo';

type Props = {
  countItemsCompleted: number;
  countItemsNotCompleted: number;
  setFilterTodo: (arg: string) => void;
  filterTodo: string;
};

export const Footer: React.FC<Props> = ({
  countItemsCompleted,
  countItemsNotCompleted,
  setFilterTodo,
  filterTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countItemsCompleted} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={classNames('filter__link', {
            selected: filterTodo === FilterBy.ALL,
          })}
          onClick={() => setFilterTodo(FilterBy.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={classNames('filter__link', {
            selected: filterTodo === FilterBy.ACTIVE,
          })}
          onClick={() => setFilterTodo(FilterBy.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={classNames('filter__link', {
            selected: filterTodo === FilterBy.COMPLETED,
          })}
          onClick={() => setFilterTodo(FilterBy.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={countItemsNotCompleted === 0}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
