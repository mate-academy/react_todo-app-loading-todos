import classNames from 'classnames';
import React from 'react';

import { Filters } from '../../types/Filters';

type Props = {
  filter: Filters;
  changeFilter: (value: Filters) => void;
};

const links = [
  { href: '/', type: Filters.All },
  { href: '/active', type: Filters.ACTIVE },
  { href: '/completed', type: Filters.COMPLETED },
];

const Filter: React.FC<Props> = ({ filter: selectedTodo, changeFilter }) => (
  <nav className="filter">
    {links.map(({ href, type }) => (
      <a
        key={href}
        href={`#${href}`}
        className={classNames(
          'filter__link',
          { selected: selectedTodo === type },
        )}
        onClick={() => changeFilter(type)}
      >
        {type}
      </a>
    ))}
  </nav>
);

export default Filter;
