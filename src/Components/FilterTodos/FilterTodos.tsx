type Filter = 'all' | 'active' | 'completed';

type FilterTodosProps = {
  selectedFilter: 'all' | 'active' | 'completed';
  setSelectedFilter: (filter: Filter) => void;
};

export const FilterTodos: React.FC<FilterTodosProps> = ({
  selectedFilter,
  setSelectedFilter,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link ${selectedFilter === 'all' ? 'selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={() => setSelectedFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${selectedFilter === 'active' ? 'selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={() => setSelectedFilter('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${selectedFilter === 'completed' ? 'selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={() => setSelectedFilter('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
