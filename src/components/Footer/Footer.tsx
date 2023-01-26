import React, { memo } from 'react';
import { Filter } from '../Filter/Filter';

type Props = {
  filterStatus: string;
  onFilterChangeStatus: React.Dispatch<React.SetStateAction<string>>;
  amountOfItems: number;
};

export const Footer: React.FC<Props> = memo(({
  filterStatus,
  onFilterChangeStatus,
  amountOfItems,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfItems} items left`}
      </span>

      <Filter
        filterStatus={filterStatus}
        onFilterChangeStatus={onFilterChangeStatus}
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
