import React from 'react';
import { TodosFilter } from '../types/TodosFilter';

type Props = {
  filter: TodosFilter;
  setFilter: (value: TodosFilter) => void;
};

export const TodoFilter: React.FC<Props> = (
  { filter = TodosFilter.all, setFilter },
) => {
  return (
    <nav className="filter" data-cy="Filter">
      {Object.values(TodosFilter).map(filterId => (
        <a
          key={filterId}
          href={`#/${filterId}`}
          className={`filter__link ${filter === filterId ? 'selected' : ''}`}
          data-cy={`FilterLink${filterId}`}
          onClick={() => setFilter(filterId as TodosFilter)}
        >
          {filterId}
        </a>
      ))}
    </nav>
  );
};
