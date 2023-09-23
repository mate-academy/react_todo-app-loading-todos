export const TodoFilter = () => (
  <nav className="filter" data-cy="Filter">
    {/* Active filter should have a 'selected' class */}
    <a
      href="#/"
      className="filter__link selected"
      data-cy="FilterLinkAll"
    >
      All
    </a>

    <a
      href="#/active"
      className="filter__link"
      data-cy="FilterLinkActive"
    >
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
);
