import React, { Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
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

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(currentFilter => (
          <a
            key={currentFilter}
            href={`#/${currentFilter.toLowerCase()}`}
            className={cn('filter__link', {
              selected: filter === currentFilter,
            })}
            data-cy={`FilterLink${currentFilter}`}
            onClick={() => setFilter(currentFilter)}
          >
            {currentFilter}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
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
