import { FC } from 'react';
import cn from 'classnames';
import { FilterArgument } from '../../types/FilterArgument';

type Props = {
  filterArgument: FilterArgument;
  setFilterArgument: (filter: FilterArgument) => void;
};

export const FilterNav: FC<Props> = ({ filterArgument, setFilterArgument }) => {
  const {
    ALL,
    ACTIVE,
    COMPLETED,
  } = FilterArgument;

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={cn('filter__link', {
          selected: filterArgument === ALL,
        })}
        onClick={() => setFilterArgument(ALL)}
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={cn('filter__link', {
          selected: filterArgument === ACTIVE,
        })}
        onClick={() => setFilterArgument(ACTIVE)}
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={cn('filter__link', {
          selected: filterArgument === COMPLETED,
        })}
        onClick={() => setFilterArgument(COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};
