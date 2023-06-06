interface FilterProps {
  todosLeftCounter: number,
  handleFilterChange: (value: string) => void,
  filter: string,
}

export const Filter: React.FC<FilterProps> = ({
  todosLeftCounter,
  handleFilterChange,
  filter,
}) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${todosLeftCounter} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'All' && 'selected'}`}
          onClick={() => handleFilterChange('All')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'Active' && 'selected'}`}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'Completed' && 'selected'}`}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </a>
      </nav>

      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
