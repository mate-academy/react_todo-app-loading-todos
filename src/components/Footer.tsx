import React from 'react';
import classNames from 'classnames';
import { FilterName } from '../App';

interface FooterProps {
  activeTodosQuantity: number;
  filterValue: FilterName;
  setFilterValue: (filterValue: FilterName) => void;
  totalTodos: number;
}

export const Footer: React.FC<FooterProps> = ({
  activeTodosQuantity,
  filterValue,
  setFilterValue,
  totalTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosQuantity} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterValue === FilterName.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterValue(FilterName.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterValue === FilterName.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterValue(FilterName.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterValue === FilterName.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterValue(FilterName.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={totalTodos === activeTodosQuantity}
      >
        Clear completed
      </button>
    </footer>
  );
};
