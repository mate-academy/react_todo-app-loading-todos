import React from 'react';
import { FilterType } from '../types/Todo';

interface FooterProps {
  activeTodosCount: number;
  itemLabel: string;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  loading: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  activeTodosCount,
  itemLabel,
  filter,
  setFilter,
  loading,
}) => {
  const filters: FilterType[] = [
    FilterType.All,
    FilterType.Active,
    FilterType.Completed,
  ];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} {itemLabel} left
      </span>

      <nav className="filter" data-cy="Filter">
        {filters.map(filterType => (
          <a
            key={filterType}
            href={`#/${filterType.toLowerCase()}`}
            className={`filter__link ${filter === filterType ? 'selected' : ''}`}
            data-cy={`FilterLink${filterType}`}
            onClick={() => setFilter(filterType)}
          >
            {filterType}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={loading}
      >
        Clear completed
      </button>
    </footer>
  );
};
