import React from 'react';
import { FilterTodos } from './FilterTodos';
import { Status } from '../types/Status';

interface Props {
  completedTodosCount: number;
  status: Status;
  setStatus: (value: Status) => void;
}

export const Footer: React.FC<Props> = ({
  status,
  setStatus,
  completedTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {completedTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <FilterTodos status={status} setStatus={setStatus} />
      </nav>

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
