import React from 'react';
import classNames from 'classnames';
import { TodoFilter } from '../TodoFilter';

interface Props {
  filterBy: string;
  setFilterBy: (filter: string) => void;
  activeCount: number;
}

export const Footer: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  activeCount,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeCount} items left`}
      </span>

      <TodoFilter
        filterBy={filterBy}
        setFilterBy={setFilterBy}
      />

      <button
        type="button"
        className={classNames('todoapp__clear-completed', {
          hidden: activeCount,
        })}
        onClick={() => setFilterBy('Active')}
      >
        Clear completed
      </button>
    </footer>
  );
};
