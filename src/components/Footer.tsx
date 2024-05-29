import React from 'react';
import { FILTERS } from '../types/FILTERS';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { getActiveTodosLength } from '../utils/getFilterTodos';

type Props = {
  filter: FILTERS;
  onFilter: (filter: FILTERS) => void;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ filter, onFilter, todos }) => {
  const filterOptions = Object.values(FILTERS);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${getActiveTodosLength(todos)} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        {filterOptions.map(filterOption => (
          <a
            key={filterOption}
            href="#/"
            className={classNames('filter__link', {
              selected: filter === filterOption,
            })}
            data-cy={`FilterLink${filterOption}`}
            onClick={() => onFilter(filterOption)}
          >
            {filterOption}
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
