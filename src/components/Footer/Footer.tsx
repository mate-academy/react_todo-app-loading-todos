import React, { Dispatch, SetStateAction } from 'react';
import { Filter } from '../Filter';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filterStatus: string;
  setFilterStatus: Dispatch<SetStateAction<FilterStatus>>;
  quantityTodos: number;
};

export const Footer: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
  quantityTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {quantityTodos} items left
      </span>

      <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

      {/* this button should be disabled if there are no completed todos */}
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
