import React from 'react';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  handleClearCompleted: () => void;
}

const Footer: React.FC<FooterProps> = ({
  todos,
  activeFilter,
  setActiveFilter,
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
          className={`filter__link ${activeFilter === 'All' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setActiveFilter('All')}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${activeFilter === 'Active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setActiveFilter('Active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${activeFilter === 'Completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setActiveFilter('Completed')}
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
