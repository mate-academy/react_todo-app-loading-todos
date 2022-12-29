import { useState } from 'react';

import cn from 'classnames';

type Props = {
  itemCount: number,
};

export const FilterList: React.FC<Props> = ({ itemCount }) => {
  const [filterBy, setFilterBy] = useState('All');

  const changeFilter = (newValue: string) => {
    setFilterBy(newValue);
  };

  return (
    <>
      <span className="todo-count" data-cy="todosCounter">
        {`${itemCount} `}
        items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', { selected: filterBy === 'All' })}
          onClick={() => {
            changeFilter('All');
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', { selected: filterBy === 'Active' })}
          onClick={() => {
            changeFilter('Active');
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', { selected: filterBy === 'Completed' })}
          onClick={() => {
            changeFilter('Completed');
          }}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </>
  );
};
