import React from 'react';
import classNames from 'classnames';
import { FILTERS, Filter } from '../constants/filter';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  onClearCompleted: (todos: Todo[]) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filter,
  onFilterChange,
  onClearCompleted,
}) => {
  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={classNames('filter__link', {
            selected: filter === FILTERS.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => {
            if (filter !== FILTERS.all) {
              onFilterChange(FILTERS.all);
            }
          }}
        >
          All
        </a>

        <a
          href="#/active"
          className={classNames('filter__link', {
            selected: filter === FILTERS.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => {
            if (filter !== FILTERS.active) {
              onFilterChange(FILTERS.active);
            }
          }}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={classNames('filter__link', {
            selected: filter === FILTERS.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => {
            if (filter !== FILTERS.completed) {
              onFilterChange(FILTERS.completed);
            }
          }}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompletedTodos}
        onClick={() => onClearCompleted(todos)}
      >
        Clear completed
      </button>
    </footer>
  );
};
