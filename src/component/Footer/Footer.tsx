import React from 'react';
import { Todo } from '../../types/Todo';

interface FooterProps {
  todos: Todo[]
  filteredBy: string;
  setFilteredBy: (option: string) => void;
}
export const Footer: React.FC<FooterProps> = ({
  todos,
  filteredBy,
  setFilteredBy,
}) => {
  const todoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todoCount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${filteredBy === 'all' ? 'selected' : ''}`}
          onClick={() => setFilteredBy('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filteredBy === 'active' ? 'selected' : ''}`}
          onClick={() => setFilteredBy('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filteredBy === 'completed' ? 'selected' : ''}`}
          onClick={() => setFilteredBy('completed')}
        >
          Completed
        </a>
      </nav>

      {/* Don't show this button if there are no completed todos */}
      {todos.some((todo) => todo.completed) && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
