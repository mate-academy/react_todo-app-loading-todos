import { Todo } from '../../types/Todo';

type FooterProps = {
  setFilter: (filter: string) => void;
  todos: Todo[];
  filter: string;
};

export const Footer: React.FC<FooterProps> = ({ setFilter, todos, filter }) => {
  const noCompletedTodos = todos.filter(todo => !todo.completed).length === 0;

  const getNumber = () => {
    return todos.filter(todo => todo.completed !== true).length;
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {getNumber()} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={noCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
