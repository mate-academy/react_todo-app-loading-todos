import React from 'react';
import { TodoFilter } from '../../types/Todo';
import { Filter } from '../Filter';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: TodoFilter;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  filter,
  completedCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <Filter filter={filter} />

      {/* this button should be disabled if there are no completed todos */}
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
