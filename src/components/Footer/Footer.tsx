import * as React from 'react';
import { IsActiveLink, FooterProps } from '../../types/types';
import classNames from 'classnames';

export const Footer: React.FC<FooterProps> = ({ todos, link, setLink }) => {
  const activeTodos = React.useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  const isAnyCompleted = React.useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: link === IsActiveLink.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setLink(IsActiveLink.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: link === IsActiveLink.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setLink(IsActiveLink.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: link === IsActiveLink.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setLink(IsActiveLink.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!isAnyCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
