import React from 'react';
import classNames from 'classnames';
import { Filter } from '../types/Filter';

type Props = {
  onSelect: (value: Filter) => void,
  filterOption: Filter,
};

export const Footer: React.FC<Props> = ({ onSelect, filterOption }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        4 items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames(
            'filter__link',
            {
              selected: filterOption === Filter.All,
            },
          )}
          onClick={() => onSelect(Filter.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames(
            'filter__link',
            {
              selected: filterOption === Filter.Active,
            },
          )}
          onClick={() => onSelect(Filter.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames(
            'filter__link',
            {
              selected: filterOption === Filter.Completed,
            },
          )}
          onClick={() => onSelect(Filter.Completed)}
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
    </footer>
  );
};
