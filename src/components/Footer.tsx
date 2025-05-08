import React from 'react';
import { TypeFilter } from '../types/TypeFilter';
import classNames from 'classnames';

type FooterProps = {
  activeCount: number;
  currentFilter: TypeFilter;
  setCurrentFilter: (filter: TypeFilter) => void;
};

const Footer: React.FC<FooterProps> = ({
  activeCount,
  currentFilter,
  setCurrentFilter,
}) => {
  const formatFilter = (filter: TypeFilter) => {
    return filter.charAt(0).toUpperCase() + filter.slice(1);
  };

  const handleFilterClick =
    (filter: TypeFilter) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setCurrentFilter(filter);
    };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(TypeFilter).map(filter => (
          <a
            key={filter}
            href={filter === TypeFilter.All ? '#/' : `#/${filter}`}
            className={classNames('filter__link', {
              selected: currentFilter === filter,
            })}
            data-cy={`FilterLink${formatFilter(filter)}`}
            onClick={handleFilterClick(filter)}
          >
            {formatFilter(filter)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
