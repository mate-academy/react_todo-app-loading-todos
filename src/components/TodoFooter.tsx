import React from 'react';
import { Filter } from './Filter';
import { FilterType } from '../constants/filters';

type Props = {
  activeTodosCount: number;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
};

export const TodoFooter: React.FC<Props> = ({
  activeTodosCount,
  filter,
  onFilterChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <Filter filter={filter} onFilterChange={onFilterChange} />

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
