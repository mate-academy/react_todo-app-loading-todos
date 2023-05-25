import '../styles/filter.scss';

interface PropsTodoFilter {
  filtered: string;
  setFiltered(type: string): void;
}
export const TodoFilter = ({ filtered, setFiltered }: PropsTodoFilter) => {
  return (
    <nav className="filter">
      <a
        href="#/"
        className={!filtered ? 'filter__link selected' : 'filter__link'}
        onClick={() => setFiltered('')}
      >
        All
      </a>

      <a
        href="#/active"
        className={filtered === 'Active'
          ? 'filter__link selected'
          : 'filter__link'}
        onClick={() => setFiltered('Active')}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={filtered === 'Completed'
          ? 'filter__link selected'
          : 'filter__link'}
        onClick={() => setFiltered('Completed')}
      >
        Completed
      </a>
    </nav>
  );
};
