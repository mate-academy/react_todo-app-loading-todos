import React from 'react';
import { Todo } from './types/Todo';

interface Props {
  filter: 'all' | 'active' | 'completed';
  todos: Todo[];
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const Footer: React.FC<Props> = ({ filter, todos, setFilter }) => {
  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todos.filter(todo => !todo.completed).length} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
            onClick={e => {
              e.preventDefault();
              setFilter('all');
            }}
            data-cy="FilterLinkAll"
          >
            All
          </a>

          <a
            href="#/"
            className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
            onClick={e => {
              e.preventDefault();
              setFilter('active');
            }}
            data-cy="FilterLinkActive"
          >
            Active
          </a>

          <a
            href="#/"
            className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
            onClick={e => {
              e.preventDefault();
              setFilter('completed');
            }}
            data-cy="FilterLinkCompleted"
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
    )
  );
};
