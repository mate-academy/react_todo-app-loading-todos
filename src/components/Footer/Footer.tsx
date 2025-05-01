type FilterStatus = 'all' | 'active' | 'completed';

interface Props {
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  activeCount: number;
  completedCount: number;
}

export const Footer: React.FC<Props> = ({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {`${activeCount} item${activeCount !== 1 ? 's' : ''} left`}
    </span>

    <nav className="filter" data-cy="Filter">
      {(['all', 'active', 'completed'] as FilterStatus[]).map(type => (
        <a
          key={type}
          href={`#/${type === 'all' ? '' : type}`}
          className={`filter__link ${filter === type ? 'selected' : ''}`}
          data-cy={`FilterLink${type.charAt(0).toUpperCase() + type.slice(1)}`}
          onClick={() => onFilterChange(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={completedCount === 0}
    >
      Clear completed
    </button>
  </footer>
);
