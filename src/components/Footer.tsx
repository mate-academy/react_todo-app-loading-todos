import classNames from 'classnames';
import React from 'react';

import { FILTER, Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter;
  onFilterChange: (newFilter: Filter) => void;
};

export const Footer: React.FC<Props> = ({ todos, filter, onFilterChange }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>
      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FILTER.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange(FILTER.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FILTER.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange(FILTER.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FILTER.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange(FILTER.COMPLETED)}
        >
          Completed
        </a>
      </nav>
      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
