import React from 'react';

enum Status {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

interface Props {
  filtered: Status;
  onFiltered: (status: Status) => void;
  countTodo: number;
}

export const Footer: React.FC<Props> = ({
  filtered,
  onFiltered,
  countTodo,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodo} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/" //className="filter__link selected"
          className={`filter__link ${filtered === Status.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => onFiltered(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filtered === Status.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => onFiltered(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filtered === Status.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => onFiltered(Status.Completed)}
        >
          Completed
        </a>
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
