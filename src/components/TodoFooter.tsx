import React from 'react';
import { FilterType } from '../types/FilterType';
import { TodoFilter } from './TodoFilter';
import { noun } from '../utils/noun';

interface Props {
  activeTodosCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export const TodoFooter: React.FC<Props> = ({
  activeTodosCount,
  filter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {noun(activeTodosCount, ['item', 'items'])} left
      </span>

      <TodoFilter filter={filter} onFilterChange={onFilterChange} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
