import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  todosLeft: number;
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  loading: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  todosLeft,
  filter,
  onFilterChange,
  loading,
}) => {
  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {todosLeft} item{todosLeft !== 1 ? 's' : ''} left
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={classNames('filter__link', {
                selected: filter === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => onFilterChange('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={classNames('filter__link', {
                selected: filter === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => onFilterChange('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={classNames('filter__link', {
                selected: filter === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => onFilterChange('completed')}
            >
              Completed
            </a>
          </nav>

          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            disabled={loading || !todos.some(todo => todo.completed)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
