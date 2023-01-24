import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

export type Props = {
  todos: Todo[],
  setSortType: (arg: string) => void,
  sortType: string,
};

export const Footer: React.FC<Props> = ({ todos, setSortType, sortType }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            classNames('filter__link', { selected: sortType === 'all' })
          }
          onClick={() => setSortType('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            classNames('filter__link', { selected: sortType === 'active' })
          }
          onClick={() => setSortType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            classNames('filter__link', { selected: sortType === 'completed' })
          }
          onClick={() => setSortType('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => setSortType('all')}
      >
        Clear completed
      </button>
    </footer>
  );
};
