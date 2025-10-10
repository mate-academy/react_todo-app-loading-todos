import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  onFilterChange: (filter: Filter) => void;
  currentFilter: Filter;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  currentFilter,
  onFilterChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterValue => (
          <a
            key={filterValue}
            href={`#/${filterValue === Filter.All ? '' : filterValue}`}
            className={`filter__link ${currentFilter === filterValue ? 'selected' : ''}`}
            onClick={() => onFilterChange(filterValue)}
            data-cy={`FilterLink${filterValue[0].toUpperCase()}${filterValue.slice(1)}`}
          >
            {filterValue.charAt(0).toUpperCase() + filterValue.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
