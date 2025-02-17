import { SortField } from '../../types/SortField';
import { Todo } from '../../types/Todo';

interface Props {
  sortField: SortField;
  setSortField: (field: SortField) => void;
  todos: Todo[];
}

export const Footer: React.FC<Props> = ({ sortField, setSortField, todos }) => {
  const { activeTodoCount, completedTodoCount } = todos.reduce(
    (counts, todo) => {
      return {
        activeTodoCount: counts.activeTodoCount + (todo.completed ? 0 : 1),
        completedTodoCount:
          counts.completedTodoCount + (todo.completed ? 1 : 0),
      };
    },
    { activeTodoCount: 0, completedTodoCount: 0 },
  );

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodoCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${sortField === SortField.All && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => setSortField(SortField.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${sortField === SortField.Active && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={() => setSortField(SortField.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${sortField === SortField.Completed && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setSortField(SortField.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!!completedTodoCount}
      >
        Clear completed
      </button>
    </footer>
  );
};
