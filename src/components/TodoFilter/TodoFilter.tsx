import { TodoFilterType } from '../../types/TodoFilterType';
import cn from 'classnames';

type Props = {
  setFilter: (elem: TodoFilterType) => void;
  filter: TodoFilterType;
};

export const TodoFilter: React.FC<Props> = ({ setFilter, filter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: TodoFilterType.all === filter,
        })}
        data-cy="FilterLinkAll"
        onClick={() => setFilter(TodoFilterType.all)}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: TodoFilterType.active === filter,
        })}
        data-cy="FilterLinkActive"
        onClick={() => setFilter(TodoFilterType.active)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: TodoFilterType.completed === filter,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter(TodoFilterType.completed)}
      >
        Completed
      </a>
    </nav>
  );
};
