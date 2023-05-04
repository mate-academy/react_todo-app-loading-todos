import React from 'react';
import classNames from 'classnames';
import { FilterType } from '../../types/FilterType';

type Props = {
  uncompletedCount: number;
  completedCount: number;
  filterType: FilterType;
  onFilter: (filterType: FilterType) => void;
};

export const FilterTodos: React.FC<Props> = ({
  uncompletedCount, completedCount, onFilter, filterType,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${uncompletedCount} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.ALL },
          )}
          onClick={() => onFilter(FilterType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.ACTIVE },
          )}
          onClick={() => onFilter(FilterType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames(
            'filter__link',
            { selected: filterType === FilterType.COMPLETED },
          )}
          onClick={() => onFilter(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {!!completedCount && (
        <button
          type="button"
          className="todoapp__clear-completed"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
