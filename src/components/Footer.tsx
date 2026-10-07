import React from 'react';
import { Status } from '../types/Status';
import { Filter } from './Filter';

type Props = {
  activeTodosCount: number;
  status: Status;
  onStatusChange: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  status,
  onStatusChange,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeTodosCount} items left
    </span>

    <Filter status={status} onStatusChange={onStatusChange} />

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled
    >
      Clear completed
    </button>
  </footer>
);
