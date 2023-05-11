import { FC } from 'react';
import cn from 'classnames';
import { SortTypes } from '../../types/SortTypes';

interface Props {
  onChangeFilter: (filter: SortTypes) => void;
  activeFilter: SortTypes;
}

export const Nav: FC<Props> = ({
  onChangeFilter,
  activeFilter,
}) => {
  return (
    <>
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link',
            { selected: activeFilter === SortTypes.All })}
          onClick={() => onChangeFilter(SortTypes.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: activeFilter === SortTypes.Active })}
          onClick={() => onChangeFilter(SortTypes.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: activeFilter === SortTypes.Completed })}
          onClick={() => onChangeFilter(SortTypes.Completed)}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>

    </>
  );
};
