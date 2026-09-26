import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  onFilterChange: (value: Filter) => void;
  filterTodos: Filter;
  countCompletedTodos: Todo[] | null;
};

export const Footer: React.FC<Props> = ({
  onFilterChange,
  filterTodos,
  countCompletedTodos,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {countCompletedTodos?.length} items left
    </span>

    {/* Active link should have the 'selected' class */}
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${filterTodos === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => onFilterChange('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filterTodos === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => onFilterChange('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filterTodos === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => onFilterChange('completed')}
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
