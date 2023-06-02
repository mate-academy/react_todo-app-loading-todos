type TodoFilterProps = {
  filterType: string,
  setFilterType: (arg: string) => void,
};

export const TodoFilter = ({ filterType, setFilterType }: TodoFilterProps) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={`filter__link ${filterType === 'all' ? 'selected' : ''}`}
        onClick={() => setFilterType('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link ${filterType === 'active' ? 'selected' : ''}`}
        onClick={() => setFilterType('active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link ${filterType === 'completed' ? 'selected' : ''}`}
        onClick={() => setFilterType('completed')}
      >
        Completed
      </a>
    </nav>
  );
};
