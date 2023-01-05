import cn from 'classnames';
import { FilterEnum } from '../../app.constants';

interface Props {
  selectedFilter: FilterEnum,
  onFilterChange: (filter: FilterEnum) => void;
}

export const Filter: React.FC<Props> = ({ selectedFilter, onFilterChange }) => {
  const filterOptions = [
    {
      value: FilterEnum.All,
      label: 'All',
      dataCy: 'FilterLinkAll',
      href: '#/',
    },
    {
      value: FilterEnum.Active,
      label: 'Active',
      dataCy: 'FilterLinkActive',
      href: '#/active',
    },
    {
      value: FilterEnum.Completed,
      label: 'Completed',
      dataCy: 'FilterLinkCompleted',
      href: '#/completed',
    },
  ];

  return (
    <nav className="filter" data-cy="Filter">
      {filterOptions.map(({
        value, label, dataCy, href,
      }) => (
        <a
          data-cy={dataCy}
          href={href}
          className={cn('filter__link', {
            selected: value === selectedFilter,
          })}
          key={value}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </a>
      ))}
    </nav>
  );
};
