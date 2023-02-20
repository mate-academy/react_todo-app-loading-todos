import React from 'react';
import classNames from 'classnames';
import { FilterByStatus } from '../../types/FilterByStatus';

type Props = {
  activeTodos: number;
  completedTodos: number;
  filteredByStatus: FilterByStatus;
  setFilteredByStatus: (newFilter: FilterByStatus) => void;
};

const filteredItems = Object.values(FilterByStatus);

export const Footer: React.FC<Props> = React.memo(
  ({
    activeTodos,
    completedTodos,
    filteredByStatus,
    setFilteredByStatus,
  }) => {
    return (
      <footer className="todoapp__footer">
        <span className="todo-count">
          {`${activeTodos} items left`}
        </span>

        <nav className="filter">
          {filteredItems.map((item) => (
            <a
              key={item}
              href={`#/${item}`}
              className={classNames('filter__link', {
                selected: item === filteredByStatus,
              })}
              onClick={() => setFilteredByStatus(item)}
            >
              {item[0].toUpperCase() + item.slice(1)}
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
