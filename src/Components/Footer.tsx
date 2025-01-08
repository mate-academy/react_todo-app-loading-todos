import React, { Dispatch, SetStateAction } from 'react';
import { Filter } from '../types/Filter';

type Props = {
  filter: Filter;
  setFilter: Dispatch<SetStateAction<Filter>>;
  todosLeft: number;
};

export const Footer: React.FC<Props> = ({ filter, setFilter, todosLeft }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(currentFilter => (
          <a
            key={currentFilter}
            href={`#/${currentFilter.toLowerCase()}`}
            className={`filter__link ${filter === currentFilter ? 'selected' : ''}`}
            data-cy={`FilterLink${currentFilter}`}
            onClick={() => setFilter(currentFilter)}
          >
            {currentFilter}
          </a>
        ))}
      </nav>

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
