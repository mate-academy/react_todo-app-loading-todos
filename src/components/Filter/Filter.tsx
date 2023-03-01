import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  setFilter: (filter?: boolean) => void
};

export const Filter: React.FC<Props> = ({ setFilter }) => {
  const [typeFilter, setTypeFilter] = useState('all');

  const hcooseFilter = (type: string, filter?: boolean) => {
    setFilter(filter);
    setTypeFilter(type);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: typeFilter === 'all',
        })}
        onClick={() => hcooseFilter('all')}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: typeFilter === 'active',
        })}
        onClick={() => hcooseFilter('active', false)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: typeFilter === 'completed',
        })}
        onClick={() => hcooseFilter('completed', true)}
      >
        Completed
      </a>
    </nav>

  );
};
