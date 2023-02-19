import React from 'react';
import classNames from 'classnames';

import { Filter } from '../../types/Filter';

type Props = {
  status: Filter,
  onStatusChange: (status: Filter) => void;
};

export const Footer: React.FC<Props> = ({ status, onStatusChange }) => {
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
            { selected: status === Filter.ALL },
          )}
          onClick={() => onStatusChange(Filter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: status === Filter.ACTIVE },
          )}
          onClick={() => onStatusChange(Filter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: status === Filter.COMPLETED },
          )}
          onClick={() => onStatusChange(Filter.COMPLETED)}
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
