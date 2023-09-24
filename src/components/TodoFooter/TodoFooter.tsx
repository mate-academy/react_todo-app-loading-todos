import cn from 'classnames';
import { Filters } from '../../types/Filters';

type Props = {
  filter: Filters;
  setFilter: (filter: Filters) => void;
  nrOfActiveTodos: number;
};

export const TodoFooter = ({ filter, setFilter, nrOfActiveTodos }: Props) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {nrOfActiveTodos}
        {' '}
        items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === 'all' })}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === 'active' })}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', { selected: filter === 'completed' })}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
