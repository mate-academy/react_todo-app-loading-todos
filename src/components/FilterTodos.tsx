import React from 'react';
import { Status } from '../types/Status';
import classNames from 'classnames';

interface Props {
  status: Status;
  setStatus: (value: Status) => void;
}

export const FilterTodos: React.FC<Props> = ({ status, setStatus }) => {
  return (
    <>
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: status === Status.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setStatus(Status.All)}
      >
        All
      </a>
      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: status === Status.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setStatus(Status.Active)}
      >
        Active
      </a>
      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: status === Status.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setStatus(Status.Completed)}
      >
        Completed
      </a>
    </>
  );
};
