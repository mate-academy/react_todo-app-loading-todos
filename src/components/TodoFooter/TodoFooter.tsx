import React from 'react';
import cn from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filterOption: FilterOptions;
  onChangeFilterOption: React.Dispatch<React.SetStateAction<FilterOptions>>;
  activeTodosCount: number;
  hasCompletedTodo: boolean;
};

export const TodoFooter: React.FC<Props> = ({
  filterOption,
  onChangeFilterOption,
  activeTodosCount,
  hasCompletedTodo,
}) => {
  const handleFilter = (filterField: FilterOptions) => {
    return () => onChangeFilterOption(filterField);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={cn(
            'filter__link',
            { selected: filterOption === FilterOptions.All },
          )}
          onClick={handleFilter(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterOption === FilterOptions.Active },
          )}
          onClick={handleFilter(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterOption === FilterOptions.Completed },
          )}
          onClick={handleFilter(FilterOptions.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: !hasCompletedTodo ? 'hidden' : 'visible' }}
      >
        Clear completed
      </button>
    </footer>
  );
};
