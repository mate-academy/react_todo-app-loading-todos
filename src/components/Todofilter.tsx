import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../types/FilterType';

type Props = {
  filterType: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todosLeftActive: number,
};

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    filterType,
    onFilterChange,
    todosLeftActive,
  } = props;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeftActive} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.All,
          })}
          onClick={() => onFilterChange(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Active,
          })}
          onClick={() => onFilterChange(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.Completed,
          })}
          onClick={() => onFilterChange(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
