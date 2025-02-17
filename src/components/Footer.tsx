import { FC } from 'react';
import cn from 'classnames';
import { Filter } from '../types/Filter';

interface Props {
  onFilter: (filter: Filter) => void;
  selectedFilter: Filter;
  activeTodosCount: number;
}

export const Footer: FC<Props> = ({
  onFilter,
  activeTodosCount,
  selectedFilter,
}) => {
  const filters = [Filter.All, Filter.Active, Filter.Completed];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filters.map(filter => (
          <a
            key={filter}
            href={`#${filter}`}
            className={cn('filter__link', {
              selected: filter === selectedFilter,
            })}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilter(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
