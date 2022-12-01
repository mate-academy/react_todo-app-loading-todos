import classNames from 'classnames';

type Props = {
  filterBy: string;
  setFilterBy: (filterBy: string) => void;
};

export const Navigation: React.FC<Props> = ({ filterBy, setFilterBy }) => (
  <nav className="filter" data-cy="Filter">
    <a
      data-cy="FilterLinkAll"
      href="#/"
      className={
        classNames('filter__link', { selected: filterBy === 'All' })
      }
      onClick={() => setFilterBy('ALL')}
    >
      All
    </a>

    <a
      data-cy="FilterLinkActive"
      href="#/active"
      className={
        classNames('filter__link', { selected: filterBy === 'ACTIVE' })
      }
      onClick={() => setFilterBy('ACTIVE')}
    >
      Active
    </a>
    <a
      data-cy="FilterLinkCompleted"
      href="#/completed"
      className={
        classNames('filter__link', { selected: filterBy === 'COMPLETED' })
      }
      onClick={() => setFilterBy('COMPLETED')}
    >
      Completed
    </a>
  </nav>
);
