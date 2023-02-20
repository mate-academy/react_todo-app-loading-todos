import React from 'react';
import cn from 'classnames';
import { Filter } from '../../types/filter';

type Props = {
  filter: Filter,
  setFilter: (filter: Filter) => void,
  activeTodosAmount: number,
  isThereCompleted: boolean
};

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  activeTodosAmount,
  isThereCompleted,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodosAmount} items left`}
    </span>

    {/* Active filter should have a 'selected' class */}
    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filter === Filter.ALL,
        })}
        onClick={() => setFilter(Filter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filter === Filter.ACTIVE,
        })}
        onClick={() => setFilter(Filter.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filter === Filter.COMPLETED,
        })}
        onClick={() => setFilter(Filter.COMPLETED)}
      >
        Completed
      </a>
    </nav>

    {isThereCompleted && (
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    )}

  </footer>
);
