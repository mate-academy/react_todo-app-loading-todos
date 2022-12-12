import React from 'react';
import classNames from 'classnames';

import { Status } from '../../types/Status';

type Props = {
  status: Status;
  setStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const TodoFilter: React.FC<Props> = (props) => {
  const { status, setStatus } = props;

  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className={classNames(
          'filter__link',
          {
            selected: status === Status.All,
          },
        )}
        onClick={
          () => setStatus(Status.All)
        }
      >
        {Status.All}
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className={classNames(
          'filter__link',
          {
            selected: status === Status.Active,
          },
        )}
        onClick={
          () => setStatus(Status.Active)
        }
      >
        {Status.Active}
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className={classNames(
          'filter__link',
          {
            selected: status === Status.Completed,
          },
        )}
        onClick={
          () => setStatus(Status.Completed)
        }
      >
        {Status.Completed}
      </a>
    </nav>
  );
};
