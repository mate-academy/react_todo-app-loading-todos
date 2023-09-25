import React from 'react';

type SortTypes = 'All' | 'Completed' | 'Active';

type Props = {
  handleSort: (type: SortTypes) => void;
  sortType: SortTypes;
};

const types: SortTypes[] = ['All', 'Active', 'Completed'];

export const TodoFilter: React.FC<Props> = ({ handleSort, sortType }) => {
  return (
    <nav className="filter" data-cy="Filter">
      {types.map((type: SortTypes) => (
        <a
          key={type}
          href="#/"
          className={`filter__link ${type === sortType ? 'selected' : ''}`}
          data-cy={`FilterLink${type}`}
          onClick={() => handleSort(type)}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </a>
      ))}
    </nav>
  );
};
