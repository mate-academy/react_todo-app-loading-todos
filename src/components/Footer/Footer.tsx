import React, { memo } from 'react';
import { FilterStatus } from '../../types/FilterStatus';
import { Filter } from '../Filter';

type Props = {
  filterStatus: string;
  activeTodosQuantity: number;
  isAnyTodoCompleted: boolean;
  onFilterStatusChange: React.Dispatch<React.SetStateAction<FilterStatus>>;
};

export const Footer: React.FC<Props> = memo((props) => {
  const {
    filterStatus,
    activeTodosQuantity,
    isAnyTodoCompleted,
    onFilterStatusChange,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosQuantity} items left`}
      </span>

      <Filter
        filterStatus={filterStatus}
        onFilterStatusChange={onFilterStatusChange}
      />

      {isAnyTodoCompleted && (
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
