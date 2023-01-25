import React from 'react';
import cn from 'classnames';

type Props = {
  filterTodos: string,
  onClickAll: () => void,
  onClickActive: () => void,
  onClickCompleted: () => void,
};

export const Filter: React.FC<Props> = ({
  filterTodos,
  onClickAll,
  onClickActive,
  onClickCompleted,
}) => (
  <nav className="filter" data-cy="Filter">
    <a
      data-cy="FilterLinkAll"
      href="#/"
      className={cn(
        'filter__link',
        { selected: filterTodos === 'All' },
      )}
      onClick={onClickAll}
    >
      All
    </a>

    <a
      data-cy="FilterLinkActive"
      href="#/active"
      className={cn(
        'filter__link',
        { selected: filterTodos === 'Active' },
      )}
      onClick={onClickActive}
    >
      Active
    </a>
    <a
      data-cy="FilterLinkCompleted"
      href="#/completed"
      className={cn(
        'filter__link',
        { selected: filterTodos === 'Completed' },
      )}
      onClick={onClickCompleted}
    >
      Completed
    </a>
  </nav>
);
