// src/components/Footer.tsx
import React from 'react';
import { FooterProps } from '../types/Props';
import { FilterStates } from '../types/enums';

export const Footer: React.FC<FooterProps> = ({ todos, filter, setFilter }) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === FilterStates.ALL ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(FilterStates.ALL)}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${filter === FilterStates.ACTIVE ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(FilterStates.ACTIVE)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${filter === FilterStates.COMPLETED ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(FilterStates.COMPLETED)}
        >
          Completed
        </a>
      </nav>

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
