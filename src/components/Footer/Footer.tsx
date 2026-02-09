import React from 'react';
import { FilterType } from '../../types/Todo';
import { Filter } from '../Filter';

interface Props {
  activeCount: number;
  completedCount: number;
  filter: FilterType;
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

      <Filter filter={filter} />

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
