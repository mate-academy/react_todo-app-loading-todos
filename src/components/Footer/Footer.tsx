import { Todo } from '../../types/Todo';

type Props = {
  status: string;
  onStatusChange: (status: string) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ onStatusChange, status, todos }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${status === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => {
            onStatusChange('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => {
            onStatusChange('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            onStatusChange('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
