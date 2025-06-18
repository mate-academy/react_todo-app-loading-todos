import { FilterButtonsProps } from '../../types/FilterButtonsProps';

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={`filter__link${filterStatus === 'all' ? ' selected' : ''}`}
        data-cy="FilterLinkAll"
        onClick={e => {
          e.preventDefault();
          setFilterStatus('all');
        }}
      >
        All
      </a>

      <a
        href="#/active"
        className={`filter__link${filterStatus === 'active' ? ' selected' : ''}`}
        data-cy="FilterLinkActive"
        onClick={e => {
          e.preventDefault();
          setFilterStatus('active');
        }}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={`filter__link${filterStatus === 'completed' ? ' selected' : ''}`}
        data-cy="FilterLinkCompleted"
        onClick={e => {
          e.preventDefault();
          setFilterStatus('completed');
        }}
      >
        Completed
      </a>
    </nav>
  );
};
