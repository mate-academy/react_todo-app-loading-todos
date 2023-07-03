import React from 'react';

interface Props {
  countNotCompletedtodos: number;
  handleFilter: (value: FilterType) => void;
  filter: FilterType;
}

enum FilterType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const Filter: React.FC<Props> = ({
  countNotCompletedtodos,
  handleFilter,
  filter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${countNotCompletedtodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${filter === FilterType.All && 'selected'}`}
          onClick={() => handleFilter(FilterType.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === FilterType.Active && 'selected'}`}
          onClick={() => handleFilter(FilterType.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === FilterType.Completed && 'selected'}`}
          onClick={() => handleFilter(FilterType.Completed)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
