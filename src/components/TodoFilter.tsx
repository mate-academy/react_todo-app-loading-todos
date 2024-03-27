import { FC, ReactNode } from 'react';
import { useTodos } from '../utils/TodosContext';
import cn from 'classnames';
import { Filter } from '../types';

const FilterLink: FC<{ filterType: Filter; children: ReactNode }> = ({
  filterType,
  children,
}) => {
  const { filter, setFilter } = useTodos();

  return (
    <a
      href={`#/${filterType}`}
      data-cy={`FilterLink${filterType}`}
      className={cn('filter__link', {
        selected: filter === filterType,
      })}
      onClick={() => setFilter(filterType)}
    >
      {children}
    </a>
  );
};

export const TodoFilter: FC = () => {
  const filterMenu = Object.values(Filter);

  return (
    <nav className="filter" data-cy="Filter">
      {filterMenu.map(filterType => (
        <FilterLink key={filterType} filterType={filterType}>
          {filterType}
        </FilterLink>
      ))}
    </nav>
  );
};
