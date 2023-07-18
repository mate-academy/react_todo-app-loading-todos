import classNames from 'classnames';
import React from 'react';
import { FilterType } from '../../types/FiterType';

interface Props {
  todosCount: number;
  completedCount: number;
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
}

export const Footer: React.FC<Props> = ({
  todosCount,
  completedCount,
  filter,
  setFilter,
}) => {
  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const getFilteredTodosCount = () => {
    switch (filter) {
      case 'all':
        return todosCount;
      case 'active':
        return todosCount - completedCount;
      case 'completed':
      default:
        return completedCount;
    }
  };

  const filteredTodosCount = getFilteredTodosCount();

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${filteredTodosCount} ${filteredTodosCount === 1 ? 'item' : 'items'} left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          onClick={() => handleFilterChange('all')}
        >
          All
        </a>
        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          onClick={() => handleFilterChange('active')}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          onClick={() => handleFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        style={{
          visibility: (completedCount === 0) ? 'hidden' : 'visible',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
