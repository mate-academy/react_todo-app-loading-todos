import React from 'react';
import { Todo } from '../types/Todo';

export type FilterStatus = 'all' | 'active' | 'completed';

type Props = {
  todos: Todo[];
  filter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onFilterChange }) => {
  if (todos.length === 0) {
    return null;
  }

  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.length - activeTodos;

  const handleFilterClick =
    (status: FilterStatus) => (event: React.MouseEvent) => {
      event.preventDefault();
      onFilterChange(status);
    };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''} `}
          data-cy="FilterLinkAll"
          onClick={handleFilterClick('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={handleFilterClick('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={handleFilterClick('completed')}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};

{
  /* Hide the footer if there are no todos */
}
