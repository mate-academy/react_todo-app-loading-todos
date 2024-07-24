import React from 'react';
import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

interface Props {
  currentFilter: Filters;
  onFilterChange: (filter: Filters) => void;
  todos: Todo[];
  activeTodosCount: number;
}

export const TodoFilter: React.FC<Props> = ({
  currentFilter,
  onFilterChange,
  todos,
  activeTodosCount,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${currentFilter === Filters.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${currentFilter === Filters.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${currentFilter === Filters.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(Filters.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
