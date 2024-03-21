import classNames from 'classnames';
import { Status } from '../../enums/Status';

type Props = {
  filter: string;
  onFilterChange: (value: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, onFilterChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.entries(Status).map(type => {
        const [key, value] = type;

        return (
          <a
            key={key}
            href={filter === Status.All ? '#/' : `#/${filter}`}
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
