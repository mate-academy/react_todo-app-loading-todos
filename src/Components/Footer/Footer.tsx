export const Footer = () => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        3 items left
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a href="#/" className="filter__link selected" data-cy="FilterLinkAll">
          All
        </a>

        <a href="#/active" className="filter__link" data-cy="FilterLinkActive">
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
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
