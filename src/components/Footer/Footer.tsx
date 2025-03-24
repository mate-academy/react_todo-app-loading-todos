import { FilterStatus } from '../../types/FilterStatus';
import { Todo } from '../../types/Todo';

type Props = {
  setFilterStatus: (value: FilterStatus) => void;
  filterStatus: FilterStatus;
  filteredTodos: Todo[];
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({
  setFilterStatus,
  filterStatus,
  filteredTodos,
  todos,
}) => {
  const activeTodosCounter = todos.filter(todo => !todo.completed).length;

  const hasCompletedTodos = filteredTodos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCounter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(FilterStatus).map(value => (
          <a
            key={value}
            href="#/"
            className={`filter__link ${filterStatus === value ? 'selected' : ''}`}
            data-cy={`FilterLink${value}`}
            onClick={() => setFilterStatus(value)}
          >
            {value}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
