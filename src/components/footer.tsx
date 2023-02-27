import React, { useState } from 'react';
import classNames from 'classnames';
import { SelectOptions } from '../types/SelectOptions';

type Props = {
  filterTodos: (option: SelectOptions) => void,
  todosCount: number,
  completedTodosCount: number,
};

export const Footer: React.FC<Props> = ({
  filterTodos,
  todosCount,
  completedTodosCount,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(SelectOptions.ALL);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {todosCount}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link', 'selected', {
              'is-active': selectedFilter === SelectOptions.ALL,
            },
          )}
          onClick={() => {
            setSelectedFilter(SelectOptions.ALL);
            filterTodos(SelectOptions.ALL);
          }}
        >
          {SelectOptions.ALL}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link', 'selected', {
              'is-active': selectedFilter === SelectOptions.ACTIVE,
            },
          )}
          onClick={() => {
            setSelectedFilter(SelectOptions.ACTIVE);
            filterTodos(SelectOptions.ACTIVE);
          }}
        >
          {SelectOptions.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link', 'selected', {
              'is-active': selectedFilter === SelectOptions.COMPLETED,
            },
          )}
          onClick={() => {
            setSelectedFilter(SelectOptions.COMPLETED);
            filterTodos(SelectOptions.COMPLETED);
          }}
        >
          {SelectOptions.COMPLETED}
        </a>
      </nav>

      {completedTodosCount
        && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )}
    </footer>
  );
};
