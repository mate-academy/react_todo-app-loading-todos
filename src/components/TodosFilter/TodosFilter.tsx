import classNames from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  filterStatus: Status,
  setFilterStatus: (status: Status) => void;
};

export const TodosFilter: React.FC<Props> = ({
  filterStatus,
  setFilterStatus,
}) => {
  const handleNewStatus = (status: Status) => {
    setFilterStatus(status);
  };

  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filterStatus === Status.All,
        })}
        data-cy="FilterLinkAll"
        onClick={() => handleNewStatus(Status.All)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filterStatus === Status.Active,
        })}
        data-cy="FilterLinkActive"
        onClick={() => handleNewStatus(Status.Active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filterStatus === Status.Completed,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => handleNewStatus(Status.Completed)}
      >
        Completed
      </a>
    </nav>
  );
};
