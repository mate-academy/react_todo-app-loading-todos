import classNames from 'classnames';
import React from 'react';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  allTodosCount: number;
  activeTodosCount: number;
  filterBy: FilterBy;
  onFilterTodos: (status: FilterBy) => void;
};

export const Footer: React.FC<Props> = ({
  allTodosCount,
  activeTodosCount,
  filterBy,
  onFilterTodos,
}) => {
  const filterLinks = Object.values(FilterBy);
  const completedTodosCount = allTodosCount - activeTodosCount;

  const capitalize = (string:string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter">
        {filterLinks.map(filterLink => (
          <a
            key={filterLink}
            href={filterLink === FilterBy.all ? '#/' : `#/${filterLink}`}
            className={classNames(
              'filter__link',
              { selected: filterBy === filterLink },
            )}
            onClick={() => onFilterTodos(filterLink)}
          >
            {capitalize(filterLink)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={completedTodosCount ? { opacity: 1 } : { opacity: 0 }}
        disabled={!completedTodosCount}
      >
        Clear completed
      </button>

    </footer>
  );
};
