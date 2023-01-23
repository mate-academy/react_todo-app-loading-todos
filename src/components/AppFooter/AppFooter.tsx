import classNames from 'classnames';
import React, { SetStateAction } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  amountOfActive: number,
  amountofCompleted: boolean,
  status: Filter,
  changeStatus: React.Dispatch<SetStateAction<Filter>>,
};

export const AppFooter: React.FC<Props> = ({
  amountOfActive,
  amountofCompleted,
  status,
  changeStatus,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${amountOfActive} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link',
            { selected: status === 'All' })}
          onClick={() => changeStatus('All')}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link',
            { selected: status === 'Active' })}
          onClick={() => changeStatus('Active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link',
            { selected: status === 'Completed' })}
          onClick={() => changeStatus('Completed')}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        onClick={() => changeStatus('All')}
        hidden={!amountofCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
