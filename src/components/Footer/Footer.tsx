import * as React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  setfilterBy: React.Dispatch<React.SetStateAction<string>>,
};

export const Footer: React.FC<Props> = ({ todos, setfilterBy }) => {
  if (todos.length === 0) {
    return null;
  }

  const handleClickFilter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => setfilterBy(e.currentTarget.textContent || '');

  const handleClickClearFilter = () => setfilterBy('All');

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
          className="filter__link"
          onClick={handleClickFilter}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
          onClick={handleClickFilter}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
          onClick={handleClickFilter}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={handleClickClearFilter}
      >
        Clear completed
      </button>
    </footer>
  );
};
