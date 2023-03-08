import React from 'react';
import classNames from 'classnames';
import { FilterValues } from '../constants';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  hasCompleted: boolean;
  selectedFilter: string;
  onChange: React.Dispatch<React.SetStateAction<FilterValues>>;
};

export const Footer: React.FC<Props> = ({
  todos,
  hasCompleted,
  selectedFilter,
  onChange,
}) => {
  const todosCount = `${todos.length} items left`;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todosCount}
      </span>

      <nav className="filter">
        {Object.values(FilterValues).map((value) => (
          <a
            href="#/"
            key={value}
            className={classNames('filter__link', {
              selected: selectedFilter === value,
            })}
            onClick={() => onChange(value)}
          >
            {value}
          </a>
        ))}
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
