import { FC } from 'react';
import cn from 'classnames';

import { FILTERS } from '../mocks';
import { FilterType } from '../types/FilterType';

type Props = {
  onAddFilter: (filter: FilterType) => void;
  filter: FilterType;
  activeTodos: number;
  areAllActive: boolean;
};

export const Footer: FC<Props> = ({
  filter,
  onAddFilter,
  activeTodos,
  areAllActive,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {FILTERS.map(filterItem => (
          <a
            href={`#/${filterItem.toLowerCase()}`}
            className={cn('filter__link', {
              selected: filterItem === filter,
            })}
            data-cy={`FilterLink${filterItem}`}
            key={filterItem}
            onClick={() => onAddFilter(filterItem)}
          >
            {filterItem}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={areAllActive}
      >
        Clear completed
      </button>
    </footer>
  );
};
