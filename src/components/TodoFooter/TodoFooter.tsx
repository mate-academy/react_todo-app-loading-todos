import React from 'react';
import cn from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filterOption: FilterOptions;
  onChangeFilterOption: React.Dispatch<React.SetStateAction<FilterOptions>>;
  activeTodosCount: number;
};

export const TodoFooter: React.FC<Props> = ({
  filterOption,
  onChangeFilterOption,
  activeTodosCount,
}) => {
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
          onClick={() => onChangeFilterOption(FilterOptions.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn(
            'filter__link',
            { selected: filterOption === FilterOptions.Active },
          )}
          onClick={() => onChangeFilterOption(FilterOptions.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn(
            'filter__link',
            { selected: filterOption === FilterOptions.Completed },
          )}
          onClick={() => onChangeFilterOption(FilterOptions.Completed)}
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
