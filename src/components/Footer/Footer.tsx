import React from 'react';
import cn from 'classnames';
import { TodosFilter } from '../../types/TodosFilter';

interface Props {
  selectFilter: TodosFilter;
  onSelectFilter: (arg: TodosFilter) => void;
}

export const Footer: React.FC<Props> = ({
  selectFilter,
  onSelectFilter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selectFilter === TodosFilter.ALL,
          })}
          onClick={() => onSelectFilter(TodosFilter.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selectFilter === TodosFilter.ACTIVE,
          })}
          onClick={() => onSelectFilter(TodosFilter.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selectFilter === TodosFilter.COMPLETED,
          })}
          onClick={() => onSelectFilter(TodosFilter.COMPLETED)}
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
