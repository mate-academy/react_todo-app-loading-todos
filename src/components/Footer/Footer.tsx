import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  filterBy: string,
  setFilterBy: React.Dispatch<React.SetStateAction<string>>,
};

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  if (todos.length === 0) {
    return null;
  }

  const handleClickFilter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    if (!e.currentTarget.textContent) {
      return;
    }

    setFilterBy(e.currentTarget.textContent);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.length}
        {' '}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { 'filter__link--selected': filterBy === 'All' },
          )}
          onClick={handleClickFilter}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { 'filter__link--selected': filterBy === 'Active' },
          )}
          onClick={handleClickFilter}

        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { 'filter__link--selected': filterBy === 'Completed' },
          )}
          onClick={handleClickFilter}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
