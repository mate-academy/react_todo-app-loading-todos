import React from 'react';
import classNames from 'classnames';
import { Filter } from '../../types/Filter';

type Props = {
  filterBy: Filter,
  setFilterBy: (filter: Filter) => void,
  itemsLeft: number,
  completedLeft: number,
};

export const TodosFilter: React.FC<Props> = React.memo(({
  filterBy,
  setFilterBy,
  itemsLeft,
  completedLeft,
}) => {
  const handleFilterChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    filter: Filter,
  ) => {
    event.preventDefault();
    setFilterBy(filter);
  };

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeft} item${itemsLeft === 1 ? '' : 's'} left`}
      </span>

      <nav className="filter">
        {Object.values(Filter).map(filter => (
          <a
            key={filter}
            href={`#/${filter}`}
            className={classNames(
              'filter__link',
              { selected: filter === filterBy },
            )}
            onClick={(event) => {
              handleFilterChange(event, filter);
            }}
          >
            {filter}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!completedLeft}
      >
        Clear completed
      </button>
    </footer>
  );
});
