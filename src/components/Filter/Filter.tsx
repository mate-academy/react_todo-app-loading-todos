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
  const filters = [TypeFilter.ALL, TypeFilter.ACTIVE, TypeFilter.COMPLETED];

  const typeFunc = (type: TypeFilter) => {
    switch (type) {
      case TypeFilter.ALL:
        setTypeFilter(type);
        setFilter(undefined);
        break;
      case TypeFilter.ACTIVE:
        setTypeFilter(type);
        setFilter(false);
        break;
      case TypeFilter.COMPLETED:
        setTypeFilter(type);
        setFilter(true);
        break;
      default:
        break;
    }
  };

  return (
    <nav className="filter">
      {filters.map((type) => (
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: typeFilter === type,
          })}
          onClick={() => typeFunc(type)}
        >
          {`${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}
        </a>
      ))}
    </nav>
  );
};
