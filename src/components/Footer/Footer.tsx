import { TodoFilter } from '../../types/filters';
import React from 'react';
import { Todo } from '../../types/todo';
import cn from 'classnames';
import '../../styles/filter.scss';

type Props = {
  activeTodosCount: number;
  currentFilter: TodoFilter;
  onFilterChange: (newFilter: TodoFilter) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  activeTodosCount,
  currentFilter,
  onFilterChange,
  todos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: currentFilter === TodoFilter.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(TodoFilter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: currentFilter === TodoFilter.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(TodoFilter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: currentFilter === TodoFilter.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(TodoFilter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
