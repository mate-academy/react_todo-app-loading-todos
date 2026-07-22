import React from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  activeTodosCount: number;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  hasCompletedTodos: boolean;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  filter,
  setFilter,
  hasCompletedTodos,
}) => {
  const handleFilterChange = (selectedFilter: Filter) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      setFilter(selectedFilter);
    };
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodosCount} item${activeTodosCount === 1 ? '' : 's'} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterValue => (
          <a
            key={filterValue}
            href={`#/${filterValue === Filter.All ? '' : filterValue}`}
            className={classNames('filter__link', {
              selected: filter === filterValue,
            })}
            data-cy={`FilterLink${filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}`}
            onClick={handleFilterChange(filterValue)}
          >
            {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};