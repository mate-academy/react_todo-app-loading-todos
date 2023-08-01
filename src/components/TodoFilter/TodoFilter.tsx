import cn from 'classnames';
import { Status } from '../../types/Status';

type Props = {
  sortField: Status,
  setSortField: (status: Status) => void,
};

export const TodoFilter: React.FC<Props> = ({
  sortField,
  setSortField,
}) => (
  <>
    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: sortField === Status.all,
        })}
        onClick={() => setSortField(Status.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: sortField === Status.active,
        })}
        onClick={() => setSortField(Status.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: sortField === Status.completed,
        })}
        onClick={() => setSortField(Status.completed)}
      >
        Completed
      </a>
    </nav>
  </>
);
