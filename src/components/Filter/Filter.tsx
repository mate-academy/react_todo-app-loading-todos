import { Filters } from '../../App';

type Props = {
  setFilter: (name: Filters) => void;
  activeFilter: Filters;
};

export const Filter: React.FC<Props> = ({ setFilter, activeFilter }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${activeFilter === 'All' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => setFilter('All')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${activeFilter === 'Active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => setFilter('Active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${activeFilter === 'Completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setFilter('Completed')}
      >
        Completed
      </a>
    </nav>
  );
};
