import cn from 'classnames';
import { FilterBy } from '../../types/types';

interface Props {
  filter: FilterBy;
  onSelect: (newFilter: FilterBy) => void;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  onSelect,
}) => (
  <nav className="filter">
    <a
      href="#/"
      className={cn('filter__link', {
        selected: filter === FilterBy.ALL,
      })}
      onClick={() => {
        onSelect(FilterBy.ALL);
      }}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', {
        selected: filter === FilterBy.ACTIVE,
      })}
      onClick={() => {
        onSelect(FilterBy.ACTIVE);
      }}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', {
        selected: filter === FilterBy.COMPLETED,
      })}
      onClick={() => {
        onSelect(FilterBy.COMPLETED);
      }}
    >
      Completed
    </a>
  </nav>
);
