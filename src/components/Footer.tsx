import { FC, FormEvent, useMemo } from 'react';
import React from 'react';

import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  deleteFinishedTodos: () => void;
};
export const Footer: FC<Props> = ({ todos, filter, setFilter }) => {
  const counter = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handleSetFilter = (newFilter: Filter) => (e: FormEvent) => {
    e.preventDefault();
    setFilter(newFilter);
  };

  if (!todos.length) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={handleSetFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={handleSetFilter('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={handleSetFilter('completed')}
        >
          Completed
        </a>
      </nav>
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!counter}
      >
        Clear completed
      </button>
    </footer>
  );
};
