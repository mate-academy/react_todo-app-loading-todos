import React from 'react';
import cn from 'classnames';

type Props = {
  filterType: string,
  handleButtonClickAll: () => void,
  handleButtonClickActive: () => void,
  handleButtonClickCompleted: () => void,
};

export const Filter: React.FC<Props> = ({
  filterType,
  handleButtonClickAll,
  handleButtonClickActive,
  handleButtonClickCompleted,
}) => (
  <nav className="filter" data-cy="Filter">
    <a
      data-cy="FilterLinkAll"
      href="#/"
      className={cn(
        'filter__link',
        { selected: filterType === 'All' },
      )}
      onClick={handleButtonClickAll}
    >
      All
    </a>

    <a
      data-cy="FilterLinkActive"
      href="#/active"
      className={cn(
        'filter__link',
        { selected: filterType === 'Active' },
      )}
      onClick={handleButtonClickActive}
    >
      Active
    </a>
    <a
      data-cy="FilterLinkCompleted"
      href="#/completed"
      className={cn(
        'filter__link',
        { selected: filterType === 'Completed' },
      )}
      onClick={handleButtonClickCompleted}
    >
      Completed
    </a>
  </nav>
);
