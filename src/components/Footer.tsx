import React from 'react';
import { Todo } from '../types/Todo';

enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface FooterProps {
  todos: Todo[];
  activeFilter: Filter;
  onFilterChange: React.Dispatch<React.SetStateAction<Filter>>;
  handleClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({
  todos,
  activeFilter,
  onFilterChange,
  handleClearCompleted,
}) => {
  if (todos.length === 0) {
    return null;
  }

  const notCompletedCount = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="TodosCounter">
        {notCompletedCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${activeFilter === Filter.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(Filter.All)}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${activeFilter === Filter.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(Filter.Active)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${activeFilter === Filter.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {todos.some(todo => todo.completed) && (
        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
