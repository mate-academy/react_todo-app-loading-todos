import { FC } from 'react';
import classNames from 'classnames';

import { Status } from '../types/Status';

interface Props {
  filterStatus: Status
  setFilterStatus: (status: Status) => void
}

export const FilterTodo: FC<Props> = ({ filterStatus, setFilterStatus }) => {
  return (
    <>
      <nav className="filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filterStatus === Status.All,
          })}
          onClick={() => setFilterStatus(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filterStatus === Status.Active,
          })}
          onClick={() => setFilterStatus(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterStatus === Status.Completed,
          })}
          onClick={() => setFilterStatus(Status.Completed)}
        >
          Completed
        </a>
      </nav>
    </>
  );
};
