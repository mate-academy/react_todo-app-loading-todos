import React from 'react';
import { StatusToFilter } from '../../utils/StatusToFilter';
import { TodoFilter } from '../TodoFilter';

interface Props {
  filterStatus: string,
  onFilterStatusChange: (newStatus: StatusToFilter) => void,
}

export const FooterTodo: React.FC<Props> = React.memo(({
  filterStatus, onFilterStatusChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <TodoFilter
        onFilterStatusChange={onFilterStatusChange}
        filterStatus={filterStatus}
      />

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
});
