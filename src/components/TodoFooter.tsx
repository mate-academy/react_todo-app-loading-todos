/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  setFilter: React.Dispatch<React.SetStateAction<string>>,
  filter: string
};

export const TodoFooter: React.FC<Props> = ({ todos, setFilter, filter }) => {
  const activeTodosCount = todos.reduce(
    (acc, cur) => {
      if (!cur.completed) {
        return acc + 1;
      }

      return acc;
    },
    0,
  );

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', { selected: !filter })}
          onClick={() => setFilter('')}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link',
            { selected: filter === 'active' })}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link',
            { selected: filter === 'completed' })}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
