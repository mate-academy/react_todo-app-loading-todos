import React from 'react';
import { StatusFilter } from '../../types/StatusFilter';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  onStatusFilterClick: (statusFilterValue: StatusFilter) => void;
  todos: Todo[];
  statusFilter: StatusFilter;
};

export const TodoAppFooter: React.FC<Props> = ({
  onStatusFilterClick,
  todos,
  statusFilter,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: statusFilter === StatusFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onStatusFilterClick(StatusFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: statusFilter === StatusFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onStatusFilterClick(StatusFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: statusFilter === StatusFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onStatusFilterClick(StatusFilter.Completed)}
        >
          Completed
        </a>
      </nav>

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
