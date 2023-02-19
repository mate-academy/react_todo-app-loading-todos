import cn from 'classnames';
import React from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  activeTodos: number;
  completedTodos: number;
  filterType: FilterType;
  onFilterType: (value: FilterType) => void;
};

export const Footer: React.FC<Props> = React.memo(({
  activeTodos,
  completedTodos,
  filterType,
  onFilterType,
}) => (
  <footer className="todoapp__footer">
    <span className="todo-count">
      {`${activeTodos} items left`}
    </span>

    <nav className="filter">
      <a
        href="#/"
        className={cn(
          'filter__link',
          { selected: filterType === FilterType.All },
        )}
        onClick={() => {
          onFilterType(FilterType.All);
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn(
          'filter__link',
          { selected: filterType === FilterType.Active },
        )}
        onClick={() => {
          onFilterType(FilterType.Active);
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn(
          'filter__link',
          { selected: filterType === FilterType.Completed },
        )}
        onClick={() => {
          onFilterType(FilterType.Completed);
        }}
      >
        Completed
      </a>
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      style={{
        visibility: completedTodos
          ? 'visible'
          : 'hidden',
      }}
    >
      Clear completed
    </button>
  </footer>
));
