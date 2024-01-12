export const TodosFilter = () => {
  return (
    <nav className="filter" data-cy="Filter">
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
};
