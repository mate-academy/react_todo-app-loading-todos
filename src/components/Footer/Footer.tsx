import React, { memo } from 'react';

import { StatusFilter } from '../../types/StatusFilter';
import { Filter } from '../Filter/Filter';

type Props = {
  activeTodosAmount: number;
  isCompletedTodos: boolean;
  statusFilter: StatusFilter;
  onChangeStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
};

export const Footer: React.FC<Props> = memo((props) => {
  const {
    activeTodosAmount,
    isCompletedTodos,
    statusFilter,
    onChangeStatusFilter,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosAmount} items left`}
      </span>

      <Filter
        statusFilter={statusFilter}
        onChangeStatusFilter={onChangeStatusFilter}
      />

      {isCompletedTodos && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
});
