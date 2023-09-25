import cn from 'classnames';

type Props = {
  filter: 'all' | 'active' | 'completed';
  setFilter: (newFilter: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <nav className="filter" data-cy="Filter">
    {/* Active filter should have a 'selected' class */}
    <a
      href="#/"
      // className="filter__link selected"
      className={cn('filter__link', {
        selected: filter === 'all',
      })}
      data-cy="FilterLinkAll"
      onClick={() => setFilter('all')}
    >
      All
    </a>

    <a
      href="#/active"
      className={cn('filter__link', {
        selected: filter === 'active',
      })}
      data-cy="FilterLinkActive"
      onClick={() => setFilter('active')}
    >
      Active
    </a>

    <a
      href="#/completed"
      className={cn('filter__link', {
        selected: filter === 'completed',
      })}
      data-cy="FilterLinkCompleted"
      onClick={() => setFilter('completed')}
    >
      Completed
    </a>
  </nav>
);
