import cn from 'classnames';
import { FilterType } from '../types/FilterType';

type Props = {
  status: FilterType,
  onStatusChange: (filter: FilterType) => void,
};

export const TodoFilter: React.FC<Props> = ({ status, onStatusChange }) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: status === FilterType.ALL,
        })}
        onClick={() => onStatusChange(FilterType.ALL)}
      >
        {FilterType.ALL}
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: status === FilterType.ACTIVE,
        })}
        onClick={() => onStatusChange(FilterType.ACTIVE)}
      >
        {FilterType.ACTIVE}
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: status === FilterType.COMPLETED,
        })}
        onClick={() => onStatusChange(FilterType.COMPLETED)}
      >
        {FilterType.COMPLETED}
      </a>
    </nav>
  );
};
