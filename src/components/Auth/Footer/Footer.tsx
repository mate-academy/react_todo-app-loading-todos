import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  todos: Todo[],
  filterState: string,
  handleFilter: (filterStatus: string) => void,
};

export const Footer: React.FC<Props> = ({
  todos,
  filterState,
  handleFilter,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="todosCounter">
      {`${todos.filter(todo => !todo.completed).length} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          {
            selected: filterState === 'all',
          },
        )}
        onClick={() => handleFilter('all')}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          {
            selected: filterState === 'active',
          },
        )}
        onClick={() => handleFilter('active')}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          {
            selected: filterState === 'completed',
          },
        )}
        onClick={() => handleFilter('completed')}
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
