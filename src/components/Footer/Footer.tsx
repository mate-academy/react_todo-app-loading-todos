import React from 'react';
import cn from 'classnames';
import { FilterTodos } from '../../types/FilterTodos';

interface Props {
  select: FilterTodos;
  onSelect: (arg: FilterTodos) => void;
}

export const Footer: React.FC<Props> = ({
  select,
  onSelect,
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
            selected: select === FilterTodos.ALL,
          })}
          onClick={() => onSelect(FilterTodos.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: select === FilterTodos.ACTIVE,
          })}
          onClick={() => onSelect(FilterTodos.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: select === FilterTodos.COMPLETED,
          })}
          onClick={() => onSelect(FilterTodos.COMPLETED)}
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
