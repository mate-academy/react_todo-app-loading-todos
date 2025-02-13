import { FC, memo } from 'react';
import { ActiveFilter } from '../types';
import classNames from 'classnames';

type NavLink = {
  title: Capitalize<ActiveFilter>;
  href: Extract<ActiveFilter, 'active' | 'completed'> | '';
  filter: ActiveFilter;
  dataCy: `FilterLink${Capitalize<ActiveFilter>}`;
};

const navLink: NavLink[] = [
  {
    title: 'All',
    href: '',
    dataCy: 'FilterLinkAll',
    filter: 'all',
  },
  {
    title: 'Active',
    href: 'active',
    dataCy: 'FilterLinkActive',
    filter: 'active',
  },
  {
    title: 'Completed',
    href: 'completed',
    dataCy: 'FilterLinkCompleted',
    filter: 'completed',
  },
];

type Props = {
  activeFilter: ActiveFilter;
  onFilterClick: (todo: ActiveFilter) => void;
};
export const Navigation: FC<Props> = memo(({ activeFilter, onFilterClick }) => (
  <nav className="filter" data-cy="Filter">
    {navLink.map(({ title, href, filter, dataCy }) => (
      <a
        href={`#/${href}`}
        data-cy={dataCy}
        key={title}
        className={classNames('filter__link ', {
          selected: activeFilter === filter,
        })}
        onClick={() => onFilterClick(filter)}
      >
        {title}
      </a>
    ))}
  </nav>
));

Navigation.displayName = 'NavigationMemo';
