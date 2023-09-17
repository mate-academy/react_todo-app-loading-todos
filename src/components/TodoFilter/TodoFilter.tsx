import React from 'react';
import classNames from 'classnames';
import { StatusType } from '../../types';
import { useTodoContext } from '../TodoContextProvider';

const filterOptions = [
  {
    label: StatusType.All,
    href: '#/',
  },
  {
    label: StatusType.Active,
    href: '#/active',
  },
  {
    label: StatusType.Completed,
    href: '#/completed',
  },
];

export const TodoFilter: React.FC = () => {
  const { todos, filter, setFilter } = useTodoContext();

  const numberOfActiveTodos = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${numberOfActiveTodos} items left`}
      </span>

      <nav className="filter">

        {filterOptions.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={classNames('filter__link',
              { selected: filter === label })}
            onClick={() => setFilter(label)}
          >
            {label}
          </a>
        ))}
      </nav>

      {hasCompletedTodos && (
        <button type="button" className="todoapp__clear-completed">
          Clear completed
        </button>
      )}
    </footer>
  );
};
