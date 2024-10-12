import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

type Props = {
  activeTodos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({ activeTodos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {Object.values(Filter).map(filterOption => (
          <a
            key={filterOption}
            href={`#/${filterOption.toLowerCase()}`}
            onClick={() => setFilter(filterOption)}
            className={classNames('filter__link', {
              selected: filter === filterOption,
            })}
            data-cy={`FilterLink${filterOption}`}
          >
            {filterOption}
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
