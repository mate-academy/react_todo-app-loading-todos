import React from 'react';
import { FilterStatus } from '../../types/FilterStatus';
import { Filter } from '../Filter/Filter';

type Props = {
  filterStatus: FilterStatus;
  todosLeft: number;
  AllTodos: number;
  onFilterSelect: (status: FilterStatus) => void;
};

export const Footer: React.FC<Props> = (
  {
    filterStatus,
    todosLeft,
    AllTodos,
    onFilterSelect,
  },
) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <Filter filterStatus={filterStatus} onFilterSelect={onFilterSelect} />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        disabled={todosLeft === AllTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
