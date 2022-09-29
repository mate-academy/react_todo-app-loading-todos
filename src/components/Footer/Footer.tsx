import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  typeOfFilter: string;
  setTypeOfFilter: (filter: string) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  typeOfFilter,
  setTypeOfFilter,
  todos,
}) => {
  const finishedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${finishedTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            { selected: typeOfFilter === 'All' },
          )}
          onClick={() => setTypeOfFilter('All')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: typeOfFilter === 'Active' },
          )}
          onClick={() => setTypeOfFilter('Active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: typeOfFilter === 'Completed' },
          )}
          onClick={() => setTypeOfFilter('Completed')}
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
