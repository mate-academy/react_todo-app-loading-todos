import classNames from 'classnames';
import React from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  filter: Filter,
  onFilter: (filter: Filter) => void,
};

export const Footer: React.FC<Props> = ({ filter, onFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.ALL },
          )}
          onClick={() => onFilter(Filter.ALL)}
        >
          {Filter.ALL}
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.ACTIVE },
          )}
          onClick={() => onFilter(Filter.ACTIVE)}
        >
          {Filter.ACTIVE}
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filter === Filter.COMPLETED },
          )}
          onClick={() => onFilter(Filter.COMPLETED)}
        >
          {Filter.COMPLETED}
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
