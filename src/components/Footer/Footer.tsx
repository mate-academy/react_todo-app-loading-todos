import React, { memo } from 'react';
import { FilterBy } from '../../types/FIlterBy';
import classNames from 'classnames';

type Props = {
  filterBy: FilterBy;
  changeFilterBy: (value: FilterBy) => void;
};

export const Footer: React.FC<Props> = memo(({ filterBy, changeFilterBy }) => {
  function handleChangeFilterBy(
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) {
    const target = event.target as HTMLElement;

    if (target.tagName !== 'A') {
      return;
    }

    const filterByValue = target.dataset.status as FilterBy;

    changeFilterBy(filterByValue);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter" onClick={handleChangeFilterBy}>
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.all,
          })}
          data-status={FilterBy.all}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.active,
          })}
          data-status={FilterBy.active}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterBy === FilterBy.completed,
          })}
          data-status={FilterBy.completed}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
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
});

Footer.displayName = 'Footer';
