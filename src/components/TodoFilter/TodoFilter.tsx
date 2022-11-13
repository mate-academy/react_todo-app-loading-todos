import React, { SetStateAction } from 'react';
import { Types } from '../../types/Types';

type Props = {
  setFilter: React.Dispatch<SetStateAction<string>>;
  filters: Types;
  activeTodosLength: number;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter,
  filters,
  activeTodosLength,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosLength} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className="filter__link selected"
          onClick={() => setFilter(filters.all)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className="filter__link"
          onClick={() => setFilter(filters.active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className="filter__link"
          onClick={() => setFilter(filters.completed)}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
