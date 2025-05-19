import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  currentFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  onClearCompleted: () => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;
  const itemsLeftText = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeftText}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(filter => (
          <a
            key={filter}
            href={`#/${filter.toLowerCase()}`}
            className={`filter__link ${currentFilter === filter ? 'selected' : ''}`}
            data-cy={`FilterLink${filter}`}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      {completedCount > 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
