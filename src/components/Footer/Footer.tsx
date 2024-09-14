import React, { memo } from 'react';
import cn from 'classnames';

import { TodoStatusFilter } from '../../types/TodoStatusFilter';
import { Todo } from '../../types/Todo';

import './Footer.scss';

type Props = {
  sortedTodos: {
    active: Todo[];
    completed: Todo[];
  };
  filterStatus: TodoStatusFilter;
  onStatusChange: (newStatus: TodoStatusFilter) => void;
  onTodosChange: (newTodos: Todo[]) => void;
};

export const Footer: React.FC<Props> = memo(function Footer({
  sortedTodos,
  filterStatus,
  onStatusChange,
  onTodosChange,
}) {
  const { active, completed } = sortedTodos;

  return (
    <footer className="Footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${active.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatusFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            onStatusChange(TodoStatusFilter.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatusFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            onStatusChange(TodoStatusFilter.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === TodoStatusFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onStatusChange(TodoStatusFilter.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => {
          onTodosChange(active);
        }}
        disabled={!completed.length}
      >
        Clear completed
      </button>
    </footer>
  );
});
