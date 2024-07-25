import React from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

interface Props {
  activeTodosCount: number;
  areThereCompletedTodos: boolean;
  filter: Filter;
  setFilter: (value: Filter) => void;
}

const filters = Object.values(Filter);

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  areThereCompletedTodos,
  filter,
  setFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {filters.map(filterOption => (
        <a
          key={filterOption}
          href="#/"
          className={cn('filter__link', { selected: filter === filterOption })}
          data-cy={`FilterLink${filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}`}
          onClick={() => setFilter(filterOption)}
        >
          {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!areThereCompletedTodos}
    >
      Clear completed
    </button>
  </footer>
);
