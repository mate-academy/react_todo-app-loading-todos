import React from 'react';
import { FilterType } from '../types/Filter';
import classNames from 'classnames';

type Props = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  countOfActiveTodos: number;
  countOfCompletedTodos: number;
};

const filters = [
  {
    type: FilterType.All,
    title: 'All',
    href: '#/',
    dataCy: 'FilterLinkAll',
  },
  {
    type: FilterType.Active,
    title: 'Active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    type: FilterType.Completed,
    title: 'Completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Footer: React.FC<Props> = ({
  filter,
  setFilter,
  countOfActiveTodos,
  countOfCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countOfActiveTodos} items left
      </span>
      <nav className="filter" data-cy="Filter">
        {filters.map(({ type, title, href, dataCy }) => (
          <a
            key={type}
            href={href}
            className={classNames('filter__link', {
              selected: filter === type,
            })}
            data-cy={dataCy}
            onClick={() => setFilter(type)}
          >
            {title}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={countOfCompletedTodos === 0}
      >
        Clear completed
      </button>
    </footer>
  );
};
