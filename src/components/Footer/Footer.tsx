import React from 'react';
import { TodosFilter } from '../../types/TodosFilted';

interface Props {
  activeTodosAmount: number
  onTodoChange: (type: number) => void
}

export const Footer: React.FC<Props> = React.memo((
  { activeTodosAmount, onTodoChange },
) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosAmount} item${activeTodosAmount > 1 ? 's' : ''} left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className="filter__link selected"
          onClick={() => onTodoChange(TodosFilter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
          onClick={() => onTodoChange(TodosFilter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
          onClick={() => onTodoChange(TodosFilter.Completed)}
        >
          Completed
        </a>
      </nav>

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
