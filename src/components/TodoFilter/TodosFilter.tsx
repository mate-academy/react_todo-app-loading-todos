import React from 'react';
import cn from 'classnames';
import { TodoStatus } from '../../types/TodoStatus';

type Props = {
  todosLength: number;
  todoStatus: TodoStatus;
  handleStatusSelect: (status: TodoStatus) => void;
};

export const TodosFilter: React.FC<Props> = ({
  todosLength,
  todoStatus,
  handleStatusSelect,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${todosLength} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn(
          'filter__link',
          { selected: todoStatus === 'All' },
        )}
        onClick={() => handleStatusSelect(TodoStatus.All)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn(
          'filter__link',
          { selected: todoStatus === 'Active' },
        )}
        onClick={() => handleStatusSelect(TodoStatus.Active)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn(
          'filter__link',
          { selected: todoStatus === 'Completed' },
        )}
        onClick={() => handleStatusSelect(TodoStatus.Completed)}
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
