import React from 'react';

type Props = {
  todosLength: number;
  filterType: string;
  setFilterType: (filter: 'all' | 'active' | 'completed') => void;
  remainingTodos: number;
};

export const TodoFooter: React.FC<Props> = ({
  todosLength,
  filterType,
  setFilterType,
  remainingTodos,
}) => {
  if (!todosLength) {
    return null;
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {remainingTodos} items left
      </span>
      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={`filter__link ${filterType === 'all' ? 'selected' : ''}`}
          onClick={() => setFilterType('all')}
        >
          All
        </a>
        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={`filter__link ${filterType === 'active' ? 'selected' : ''}`}
          onClick={() => setFilterType('active')}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={`filter__link ${filterType === 'completed' ? 'selected' : ''}`}
          onClick={() => setFilterType('completed')}
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
