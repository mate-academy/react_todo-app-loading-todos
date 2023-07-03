import React from 'react';
import cn from 'classnames';

type Props = {
  filterValue: string
  setFilterValue: (filterStatus: string) => void,
};

export const FilterTodos: React.FC<Props> = ({
  filterValue,
  setFilterValue,
}) => {
  const handlerTodosFilter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const filterStatus = event.currentTarget.textContent || '';

    setFilterValue(filterStatus);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: filterValue === 'All',
        })}
        onClick={handlerTodosFilter}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: filterValue === 'Active',
        })}
        onClick={handlerTodosFilter}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: filterValue === 'Completed',
        })}
        onClick={handlerTodosFilter}
      >
        Completed
      </a>
    </nav>
  );
};
