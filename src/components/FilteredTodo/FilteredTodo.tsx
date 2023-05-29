import cn from 'classnames';
import { Filter } from '../../types/Filter';

interface Props {
  status: Filter;
  onStatusChange: (status: Filter) => void;
}

export const FilteredTodo: React.FC<Props> = ({ status, onStatusChange }) => (
  <nav className="filter">
    <a
      href="#/"
      className={cn('filter__link', {
        selected: status === Filter.ALL,
      })}
      onClick={() => onStatusChange(Filter.ALL)}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', {
        selected: status === Filter.ACTIVE,
      })}
      onClick={() => onStatusChange(Filter.ACTIVE)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', {
        selected: status === Filter.COMPLETED,
      })}
      onClick={() => onStatusChange(Filter.COMPLETED)}
    >
      Completed
    </a>
  </nav>
);
