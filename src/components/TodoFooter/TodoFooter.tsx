import React from 'react';
import { TodoStatusFilter } from '../../types/TodoStatusFilter';
import { TodoFilter } from '../TodoFilter';

interface Props {
  statusFilter: TodoStatusFilter;
  changeStatusFilter: (status: TodoStatusFilter) => void;
  activeTodosLeft: number;
  isVisible: boolean;
}

export const TodoFooter: React.FC<Props> = ({
  statusFilter,
  changeStatusFilter,
  activeTodosLeft,
  isVisible,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosLeft} items left`}
      </span>

      <TodoFilter
        statusFilter={statusFilter}
        changeStatusFilter={changeStatusFilter}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!isVisible}
      >
        Clear completed
      </button>
    </footer>
  );
};
