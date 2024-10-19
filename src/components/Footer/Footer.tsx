import { Filter } from '../../types/Filter';

type Props = {
  activeTodos: number;
  onFilterChange: (filterType: Filter) => void;
  filter: Filter;
};

const filterOptions: {
  label: string;
  value: Filter;
  href: string;
  dataCy: string;
}[] = [
  { label: 'All', value: 'all', href: '#/', dataCy: 'FilterLinkAll' },
  {
    label: 'Active',
    value: 'active',
    href: '#/active',
    dataCy: 'FilterLinkActive',
  },
  {
    label: 'Completed',
    value: 'completed',
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

export const Footer = ({ activeTodos, onFilterChange, filter }: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      {/* Hide the footer if there are no todos */}

      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterOptions.map(({ label, value, href, dataCy }) => (
          <a
            key={value}
            href={href}
            className={`filter__link ${filter === value ? 'selected' : ''}`}
            data-cy={dataCy}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
