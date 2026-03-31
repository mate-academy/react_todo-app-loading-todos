type Props = {
  todos: Todo[];
  filter: string;
  setFilter: (value: string) => void;
  onClearCompleted: () => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  setFilter,
  onClearCompleted,
}) => {
  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          data-cy="FilterLinkAll"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          data-cy="FilterLinkActive"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          data-cy="FilterLinkCompleted"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={onClearCompleted}
        disabled={!todos.some(t => t.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
