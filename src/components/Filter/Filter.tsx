import React from 'react';
import cn from 'classnames';

import './Filter.scss';

type Props = {
  todoFilter: string;
  handleFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const Filter: React.FC<Props> = ({
  todoFilter,
  handleFilter,
}) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', { selected: todoFilter === '' })}
        onClick={() => handleFilter('')}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', { selected: todoFilter === 'active' })}
        onClick={() => handleFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', { selected: todoFilter === 'completed' })}
        onClick={() => handleFilter('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
