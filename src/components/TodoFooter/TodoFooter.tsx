import React from 'react';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoStatusFilter } from '../../types/TodoStatusFilter';

type Props = {
  status: TodoStatusFilter,
  onSelectStatusFilter: (status: TodoStatusFilter) => void,
  uncompletedTodosCount: number,
  isVisibleClearCompleted: boolean,
};

export const TodoFooter: React.FC<Props> = ({
  status,
  onSelectStatusFilter,
  uncompletedTodosCount,
  isVisibleClearCompleted,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${uncompletedTodosCount} items left`}
      </span>

      <TodoFilter
        status={status}
        onSelectStatusFilter={onSelectStatusFilter}
      />

      {isVisibleClearCompleted && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
