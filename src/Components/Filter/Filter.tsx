import classNames from 'classnames';
import React from 'react';

import { Filters } from '../../types/Filters';

type Props = {
  filter: Filters;
  changeFilter: (value: Filters) => void;
};

const links = [
  { id: 1, href: '/', type: Filters.All },
  { id: 2, href: '/active', type: Filters.ACTIVE },
  { id: 3, href: '/completed', type: Filters.COMPLETED },
];

const Filter: React.FC<Props> = ({ filter: selectedTodo, changeFilter }) => (
  <nav className="filter">
    {links.map(({ id, href, type }) => (
      <a
        key={id}
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
