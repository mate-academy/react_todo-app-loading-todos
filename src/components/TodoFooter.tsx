import React from 'react';
import { Todo } from '../types/Todo';

interface TodoErrorProps {
  todoLeft: number;
  todos: Todo[];
  handleClearCompleted: () => void;
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
}

export const TodoFooter: React.FC<TodoErrorProps> = ({
  todos,
  handleClearCompleted,
  filter,
  setFilter,
  todoLeft,
}) => {
  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todoLeft} items left
        </span>

        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
            data-cy="FilterLinkAll"
            onClick={() => setFilter('all')}
          >
            All
          </a>

          <a
            href="#/active"
            className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
            data-cy="FilterLinkActive"
            onClick={() => setFilter('active')}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
            data-cy="FilterLinkCompleted"
            onClick={() => setFilter('completed')}
          >
            Completed
          </a>
        </nav>

        {todos.some(todo => todo.completed) && (
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            onClick={handleClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    )
  );
};
