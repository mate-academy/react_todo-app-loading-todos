import { FC } from 'react';
import './TodoFooter.scss';
import { StatusFilter } from '../../types';
import { TodoFilter } from '../TodoFilter';

interface Props {
  leftTodos: number;
  statusFilter: StatusFilter;
  setStatusFilter: (status: StatusFilter) => void;
  todosAmount: number;
}

export const TodoFooter: FC<Props> = ({
  leftTodos,
  statusFilter,
  setStatusFilter,
  todosAmount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftTodos} items left
      </span>

      <TodoFilter
        statusFilter={statusFilter}
        onChangeStatusFilter={setStatusFilter}
      />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={leftTodos === todosAmount}
      >
        Clear completed
      </button>
    </footer>
  );
};
