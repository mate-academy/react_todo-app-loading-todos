import React from 'react';
import classNames from 'classnames';
import { TodoFilter } from '../TodoFilter';
import { Filter } from '../../types/Filter';

interface Props {
  filterBy: Filter;
  setFilterBy: (filter: Filter) => void;
  completedCount: number;
}

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  completedCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${completedCount} items left`}
      </span>

      <TodoFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: completedCount === 0,
        })}
      >
        Clear completed
      </button>
    </footer>
  );
};
