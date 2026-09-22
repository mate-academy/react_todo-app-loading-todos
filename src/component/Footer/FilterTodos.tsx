import cn from 'classnames';
import { TodoStatus } from '../../types/Todo';

type FilterTodosProps = {
  status: TodoStatus;
  setStatus: (value: TodoStatus) => void;
};

export const FilterTodos = ({ status, setStatus }: FilterTodosProps) => {
  // {/* Active link should have the 'selected' class */}
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={cn('filter__link', {
          selected: status === 'all',
        })}
        data-cy="FilterLinkAll"
        onClick={() => setStatus('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={cn('filter__link', {
          selected: status === 'active',
        })}
        data-cy="FilterLinkActive"
        onClick={() => setStatus('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={cn('filter__link', {
          selected: status === 'completed',
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => setStatus('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
