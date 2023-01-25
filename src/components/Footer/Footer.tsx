import React, { memo } from "react";

import { FilterStatus } from "../../types/FilterStatus";
import { Filter } from "../Filter/Filter";

type Props = {
  activeTodosAmount: number;
  isCompletedTodos: boolean;
  filterStatus: FilterStatus;
  changeFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
};

export const Footer: React.FC<Props> = memo((props) => {
  const {
    activeTodosAmount,
    isCompletedTodos,
    filterStatus: filterStatus,
    changeFilterStatus,
  } = props;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosAmount} items left`}
      </span>

      <Filter
        filterStatus={filterStatus}
        changeFilterStatus={changeFilterStatus}
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
