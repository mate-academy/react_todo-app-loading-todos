import classNames from 'classnames';
import React from 'react';

type Props = {
  status: string;
  onStatus: React.Dispatch<React.SetStateAction<string>>;
  amountOfItems: number;
};

export const Footer: React.FC<Props> = ({
  status,
  onStatus,
  amountOfItems,
}) => {
  const FILTERS = {
    all: 'all',
    completed: 'completed',
    active: 'active',
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfItems} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link ', {
            selected: status === FILTERS.all,
          })}
          onClick={() => onStatus('all')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link ', {
            selected: status === FILTERS.active,
          })}
          onClick={() => onStatus('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link ', {
            selected: status === FILTERS.completed,
          })}
          onClick={() => onStatus('completed')}
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
