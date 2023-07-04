import React from 'react';
import cn from 'classnames';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  setFilterTodos: (status: FilterBy) => void;
  filterTodos: FilterBy;
  activeNumber: number;
  completedNumber: number;
};

export const Footer: React.FC<Props> = ({
  setFilterTodos,
  filterTodos,
  activeNumber,
  completedNumber,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeNumber} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: filterTodos === FilterBy.all })}
          onClick={() => setFilterTodos(FilterBy.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: filterTodos === FilterBy.active })}
          onClick={() => setFilterTodos(FilterBy.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: filterTodos === FilterBy.completed })}
          onClick={() => setFilterTodos(FilterBy.completed)}
        >
          Completed
        </a>
      </nav>

      {completedNumber > 0
        && (
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        )}
    </footer>
  );
};
