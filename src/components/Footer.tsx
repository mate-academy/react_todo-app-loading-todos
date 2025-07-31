import React from 'react';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  activeTodos: Todo[];
  completedTodos: Todo[];
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  handlClearAll: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  activeTodos,
  completedTodos,
  filter,
  setFilter,
  handlClearAll,
}) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {activeTodos.length} items left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={`filter__link ${filter === 'all' && 'selected'}`}
              data-cy="FilterLinkAll"
              onClick={e => {
                e.preventDefault();
                setFilter('all');
              }}
            >
              All
            </a>

            <a
              href="#/active"
              className={`filter__link ${filter === 'active' && 'selected'}`}
              data-cy="FilterLinkActive"
              onClick={e => {
                e.preventDefault();
                setFilter('active');
              }}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={`filter__link ${filter === 'completed' && 'selected'}`}
              data-cy="FilterLinkCompleted"
              onClick={e => {
                e.preventDefault();
                setFilter('completed');
              }}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={completedTodos.length === 0}
            onClick={() => {
              handlClearAll();
            }}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
