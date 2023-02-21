import cn from 'classnames';
import React, { useCallback } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  activeTodos: number;
  hasCompletedTodos: number;
  filterType: FilterType;
  onFilterType: (value: FilterType) => void;
};

export const Footer: React.FC<Props> = React.memo(({
  activeTodos,
  hasCompletedTodos,
  filterType,
  onFilterType,
}) => {
  const changeFilterType = useCallback((type: FilterType) => {
    onFilterType(type);
  }, []);

  const isSelected = useCallback((type: FilterType) => filterType === type,
    [filterType]);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: isSelected(FilterType.All) },
          )}
          onClick={() => {
            changeFilterType(FilterType.All);
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: isSelected(FilterType.Active) },
          )}
          onClick={() => {
            changeFilterType(FilterType.Active);
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: isSelected(FilterType.Completed) },
          )}
          onClick={() => {
            changeFilterType(FilterType.Completed);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: hasCompletedTodos
            ? 'visible'
            : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
});
