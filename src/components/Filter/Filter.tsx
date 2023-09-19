export const Filter = () => {
  return (
    <nav className="filter">
      <a href="#/" className="filter__link selected">
        All
      </a>

      <a href="#/active" className="filter__link">
        Active
      </a>

      <a href="#/completed" className="filter__link">
        Completed
      </a>
    </nav>
  );
};
