import React from 'react';
import { TodoFilter } from './TodoFilter';
import { Filter } from '../types/Filter';

type Props = {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  activeCount: number;
  completedCount: number;
};

export const TodoFooter: React.FC<Props> = ({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <TodoFilter filter={filter} onFilterChange={onFilterChange} />

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
