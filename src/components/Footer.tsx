import React from 'react';
import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';

type Props = {
  activeTodos: number;
  completedTodos: number;
  filterByStatus: FilterStatus;
  setFilterByStatus: (newFilter: FilterStatus) => void;
};

const filterOptions = Object.values(FilterStatus);

export const Footer: React.FC<Props> = React.memo(
  ({
    activeTodos,
    completedTodos,
    filterByStatus,
    setFilterByStatus,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">{`${activeTodos} items left`}</span>

        <nav className="filter">
          {filterOptions.map((option) => (
            <a
              key={option}
              href={`#/${option}`}
              className={classNames('filter__link', {
                selected: option === filterByStatus,
              })}
              onClick={() => setFilterByStatus(option)}
            >
              {option[0].toUpperCase() + option.slice(1)}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className={classNames('todoapp__clear-completed', {
            hidden: completedTodos === 0,
          })}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
