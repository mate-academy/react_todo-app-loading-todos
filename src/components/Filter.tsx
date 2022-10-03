export const Filter = () => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        data-cy="FilterLinkAll"
        href="#/"
        className="filter__link selected"
      >
        All
      </a>

      <a
        data-cy="FilterLinkActive"
        href="#/active"
        className="filter__link"
      >
        Active
      </a>
      <a
        data-cy="FilterLinkCompleted"
        href="#/completed"
        className="filter__link"
      >
        Completed
      </a>
    </nav>
  );
};
