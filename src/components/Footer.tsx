import type { Todo } from '../types/Todo';

type FooterProps = {
  allTodos: Todo[] | null;
  filtered: Todo[] | null;
  filter: 'all' | 'active' | 'completed';
  setFilter: (item: 'all' | 'active' | 'completed') => void;
};

export default function Footer({
  allTodos,
  filtered,
  filter,
  setFilter,
}: FooterProps) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {allTodos?.filter(item => !item.completed).length} items left
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
        disabled={!allTodos?.some(item => item.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
}
