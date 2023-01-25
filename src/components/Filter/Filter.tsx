import { FC } from 'react';
import cn from 'classnames';
import { Filters } from '../../types/Filters';

type Props = {
  activeTodos: number,
  selectedStatus: Filters,
  setSelectedStatus: (selectedStatus: Filters) => void,
};

export const Filter: FC<Props> = ({
  selectedStatus, setSelectedStatus, activeTodos,
}) => {
  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn(
            'filter__link',
            {
              selected: selectedStatus === Filters.All,
            },
          )}
          onClick={() => setSelectedStatus(Filters.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn(
            'filter__link',
            {
              selected: selectedStatus === Filters.Active,
            },
          )}
          onClick={() => setSelectedStatus(Filters.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn(
            'filter__link',
            {
              selected: selectedStatus === Filters.Completed,
            },
          )}
          onClick={() => setSelectedStatus(Filters.Completed)}
        >
          Completed
        </a>
      </nav>
    </>
  );
};
