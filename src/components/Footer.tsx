import classNames from 'classnames';
import { FilterStatus } from '../types/FIlterStatus';

interface Props {
  activeCount: number;
  currentFilter: FilterStatus;
  hasCompleted: boolean;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
}

export const Footer: React.FC<Props> = ({
  activeCount,
  currentFilter,
  hasCompleted,
  onFilterChange,
  onClearCompleted,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {activeCount} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(FilterStatus).map(f => (
        <a
          key={f}
          href={`#/${f === FilterStatus.All ? '' : f}`}
          className={classNames('filter__link', {
            selected: currentFilter === f,
          })}
          onClick={() => onFilterChange(f)}
          data-cy={`FilterLink${f.charAt(0).toUpperCase() + f.slice(1)}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={!hasCompleted}
      onClick={onClearCompleted}
    >
      Clear completed
    </button>
  </footer>
);
