import React from 'react';
import classNames from 'classnames';
import { CompletedStatus } from '../types/CompletedStatus';

type Props = {
  itemsLeft: number;
  filterByStatus: CompletedStatus;
  onFilterByStatus: (status: CompletedStatus) => void;
};

export const TodoFooter: React.FC<Props> = ({
  itemsLeft,
  filterByStatus,
  onFilterByStatus,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${itemsLeft} items left`}
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(CompletedStatus).map(status => (
        <a
          data-cy={`FilterLink${status}`}
          key={CompletedStatus[status]}
          href="#/"
          className={classNames('filter__link', {
            selected: filterByStatus === CompletedStatus[status],
          })}
          onClick={() => onFilterByStatus(CompletedStatus[status])}
        >
          {CompletedStatus[status]}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
    >
      Clear completed
    </button>
  </footer>
);
