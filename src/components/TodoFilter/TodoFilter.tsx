import cn from 'classnames';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filter: string,
  setFilter: (newFilter: FilterOptions) => void;
};

export const TodoFilter:React.FC<Props> = ({
  filter,
  setFilter,
}) => (
  <nav className="filter">
    <a
      href="#/"
      className={cn('filter__link', {
        selected: filter === FilterOptions.all,
      })}
      onClick={() => setFilter(FilterOptions.all)}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', {
        selected: filter === FilterOptions.active,
      })}
      onClick={() => setFilter(FilterOptions.active)}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', {
        selected: filter === FilterOptions.completed,
      })}
      onClick={() => setFilter(FilterOptions.completed)}
    >
      Completed
    </a>
  </nav>
);
