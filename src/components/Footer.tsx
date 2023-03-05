/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React from 'react';
import { filterValues } from '../constants';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  hasCompleted: boolean;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<string>;
};

export const Footer: React.FC<Props> = ({
  todos,
  hasCompleted,
  selectedFilter,
  setSelectedFilter,
}) => {
  const todosCount = `${todos.length} items left`;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todosCount}
      </span>

      <nav className="filter">
        { Object.values(filterValues).map((value) => (
          <a
            href="#/"
            key={value}
            className={classNames('filter__link', {
              selected: selectedFilter === value,
            })}
            onClick={() => setSelectedFilter(value)}
          >
            {value}
          </a>
        )) }
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
