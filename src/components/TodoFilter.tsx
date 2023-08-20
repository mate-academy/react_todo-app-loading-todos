import classNames from 'classnames';
import { Status } from '../types/Status';

type Props = {
  setStatus: (text: string) => void,
  status: string,
};

export const TodoFilter: React.FC<Props> = ({
  setStatus,
  status,
}) => {
  const handleAllButton = () => {
    setStatus(Status.ALL);
  };

  const handleActiveButton = () => {
    setStatus(Status.ACTIVE);
  };

  const handleCompletedButton = () => {
    setStatus(Status.COMPLETED);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: status === Status.ALL,
        })}
        onClick={handleAllButton}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: status === Status.ACTIVE,
        })}
        onClick={handleActiveButton}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: status === Status.COMPLETED,
        })}
        onClick={handleCompletedButton}
      >
        Completed
      </a>
    </nav>
  );
};
