import classNames from 'classnames';
import { useState } from 'react';

type Props = {
  setFilter: (filter?: boolean) => void
};

enum TypeFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const Filter: React.FC<Props> = ({ setFilter }) => {
  const [typeFilter, setTypeFilter] = useState(TypeFilter.ALL);

  const chooseFilter = (type: TypeFilter, filter?: boolean) => {
    setTypeFilter(type);
    setFilter(filter);
  };

  return (
    <nav className="filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: typeFilter === TypeFilter.ALL,
        })}
        onClick={() => chooseFilter(TypeFilter.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: typeFilter === TypeFilter.ACTIVE,
        })}
        onClick={() => chooseFilter(TypeFilter.ACTIVE, false)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: typeFilter === TypeFilter.COMPLETED,
        })}
        onClick={() => chooseFilter(TypeFilter.COMPLETED, true)}
      >
        Completed
      </a>
    </nav>

  );
};
