import React from 'react';
import { FooterTypes } from './footer.types';
import { text } from '../../constants/text';
import classNames from 'classnames';

export const FooterComponent: React.FC<FooterTypes> = ({
  todos,
  selectedStatus,
  handleSelectTodo,
}) => {
  const todoCounter = todos.filter(todo => !todo.completed).length;

  return (
    todos.length > 0 && (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {todoCounter} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            onClick={() => handleSelectTodo('all')}
            href="#/"
            className={classNames('filter__link', {
              selected: selectedStatus === 'all',
            })}
            data-cy="FilterLinkAll"
          >
            {text.all}
          </a>

          <a
            onClick={() => handleSelectTodo('active')}
            href="#/active"
            className={classNames('filter__link', {
              selected: selectedStatus === 'active',
            })}
            data-cy="FilterLinkActive"
          >
            {text.active}
          </a>

          <a
            onClick={() => handleSelectTodo('completed')}
            href="#/completed"
            className={classNames('filter__link', {
              selected: selectedStatus === 'completed',
            })}
            data-cy="FilterLinkCompleted"
          >
            {text.completed}
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          {text.clearCompleted}
        </button>
      </footer>
    )
  );
};
