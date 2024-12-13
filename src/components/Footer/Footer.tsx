import { Todo } from '../../types/Todo';

type FooterProps = {
  itemsLeft: number;
  sortBy: string;
  onSortBy: (sort: string) => void;
  todos: Todo[];
};

export function Footer({ itemsLeft, sortBy, onSortBy, todos }: FooterProps) {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemsLeft} items left
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${sortBy === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={e => {
            e.preventDefault();
            onSortBy('all');
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${sortBy === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={e => {
            e.preventDefault();
            onSortBy('active');
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${sortBy === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={e => {
            e.preventDefault();
            onSortBy('completed');
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
        disabled={todos.length !== itemsLeft ? false : true}
      >
        Clear completed
      </button>
    </footer>
  );
}
