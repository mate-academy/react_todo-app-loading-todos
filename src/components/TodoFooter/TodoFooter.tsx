import React from 'react';
import cn from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

interface Props{
  filterOption: FilterOptions;
  setFilterOption: (option: FilterOptions) => void;
  visibleTodosLength: number;
}

export const TodoFooter: React.FC<Props> = (
  {
    filterOption,
    setFilterOption,
    visibleTodosLength,
  },
) => {
  return (

    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${visibleTodosLength} items left`}
      </span>

      <nav className="filter">
        {Object.values(FilterOptions).map((filter) => {
          const isSelected = filterOption === filter;

          return (
            <a
              href={`#/${filter}`}
              key={filter}
              className={cn(
                'filter__link',
                { selected: isSelected },
              )}
              onClick={() => setFilterOption(filter)}
            >
              {filter}
            </a>
          );
        })}
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
