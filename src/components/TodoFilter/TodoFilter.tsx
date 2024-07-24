import React from 'react';
import { Filter } from '../../types/Filter';

interface Props {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  activeTodosCount: number;
  areThereCompletedTodos: boolean;
}

export const TodoFilter: React.FC<Props> = ({
  filter,
  setFilter,
  activeTodosCount,
  areThereCompletedTodos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filter === Filter.all ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === Filter.active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === Filter.completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!areThereCompletedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
