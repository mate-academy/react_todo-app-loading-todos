import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
  filterBy: Status;
  setFilterBy: (filterBy: Status) => void;
}

export const Footer: React.FC<Props> = ({ todos, filterBy, setFilterBy }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterBy === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterBy(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterBy === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilterBy(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterBy === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterBy(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
