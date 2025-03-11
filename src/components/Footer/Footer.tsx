import React from 'react';
import { Filter } from '../../App';
interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  activeCount: number;
  completedCount: number;
  isLoading: boolean;
  clearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  activeCount,
  completedCount,
  isLoading,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(Filter).map(value => (
        <a
          key={value}
          href={`#/${value.toLowerCase()}`}
          className={`filter__link ${filter === value ? 'selected' : ''}`}
          data-cy={`FilterLink${value}`}
          onClick={() => setFilter(value)}
        >
          {value}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={isLoading || completedCount === 0}
    >
      Clear completed
    </button>
  </footer>
);
