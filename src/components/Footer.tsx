import React from 'react';
import { Filter } from './Filter';
import { FilterType } from '../types/Filter';

type Props = {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
  onFilterChange: (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: FilterType,
  ) => void;
};

export const Footer: React.FC<Props> = ({
  activeCount,
  completedCount,
  filter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <Filter filter={filter} onFilterChange={onFilterChange} />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedCount === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
