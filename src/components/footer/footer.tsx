import React from 'react';
import { TodoFilter } from '../../types/filter';
import classNames from 'classnames';

type Props = {
  sortFilter: TodoFilter;
  setSortFilter: (value: TodoFilter) => void;
  activeCounter: number;
  notActiveCounter: number;
};

export const Footer: React.FC<Props> = ({
  sortFilter,
  setSortFilter,
  activeCounter,
  notActiveCounter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCounter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TodoFilter).map(filter => (
          <a
            key={filter}
            href="#/"
            className={classNames('filter__link', {
              selected: sortFilter === filter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => {
              setSortFilter(filter);
            }}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={notActiveCounter === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
