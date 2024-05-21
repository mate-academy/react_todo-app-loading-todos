import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  selectedFilter: Status;
  setSelectedFilter: (filterBy: Status) => void;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  selectedFilter,
  setSelectedFilter,
}) => {
  const isActiveTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${isActiveTodos} ${isActiveTodos === 1 ? 'item' : 'items'} left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${selectedFilter === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setSelectedFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${selectedFilter === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setSelectedFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${selectedFilter === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelectedFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
