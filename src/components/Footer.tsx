import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: 'ALL' | 'ACTIVE' | 'COMPLETED';
  onHandleFilter: (type: 'ALL' | 'ACTIVE' | 'COMPLETED') => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onHandleFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            ' selected': filter === 'ALL',
          })}
          data-cy="FilterLinkAll"
          onClick={() => onHandleFilter('ALL')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            ' selected': filter === 'ACTIVE',
          })}
          data-cy="FilterLinkActive"
          onClick={() => onHandleFilter('ACTIVE')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            ' selected': filter === 'COMPLETED',
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onHandleFilter('COMPLETED')}
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
};
