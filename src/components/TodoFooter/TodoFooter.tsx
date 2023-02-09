import React from 'react';
import classNames from 'classnames';

import { Filter } from '../../types/Filter';

type Props = {
  todosLength: number | undefined;
  selectFilter: Filter;
  switchFilter: (selector: Filter) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todosLength,
  selectFilter,
  switchFilter,
}) => {
  const switchHandler = (filter: Filter) => {
    switch (filter) {
      case Filter.active:
        switchFilter(Filter.active);
        break;

      case Filter.completed:
        switchFilter(Filter.completed);
        break;

      default:
        switchFilter(Filter.all);
        break;
    }
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">{`${todosLength} items left`}</span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: selectFilter === Filter.all,
          })}
          onClick={() => switchHandler(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: selectFilter === Filter.active,
          })}
          onClick={() => switchHandler(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: selectFilter === Filter.completed,
          })}
          onClick={() => switchHandler(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
