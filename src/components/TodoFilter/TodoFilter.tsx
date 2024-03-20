import classNames from 'classnames';
import { FilterStatus } from '../../enums/FilterStatus';

type Props = {
  filter: string;
  onFilterChange: (value: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.entries(FilterStatus).map(type => {
        const [key, value] = type;

        return (
          <a
            key={key}
            href={filter === FilterStatus.All ? '#/' : `#/${filter}`}
            className={classNames('filter__link', {
              selected: filter === value,
            })}
            data-cy={`FilterLink${key}`}
            onClick={() => onFilterChange(value)}
          >
            {key}
          </a>
        );
      })}
    </nav>
  );
};
