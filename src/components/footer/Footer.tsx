import React from 'react';
import { Todo } from '../../types/Todo';
import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  todos: Todo[];
  currentFilter: FilterOptions;
  setCurrentFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  handleClearCompleted: () => void;
  loading: boolean;
};

export const Footer: React.FC<Props> = ({
  todos,
  currentFilter,
  setCurrentFilter,
  handleClearCompleted,
  loading,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${activeTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${currentFilter === FilterOptions.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setCurrentFilter(FilterOptions.All)}
        >
          All
        </a>
        <a
          href="#/active"
          className={`filter__link ${currentFilter === FilterOptions.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setCurrentFilter(FilterOptions.Active)}
        >
          Active
        </a>
        <a
          href="#/completed"
          className={`filter__link ${currentFilter === FilterOptions.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setCurrentFilter(FilterOptions.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={handleClearCompleted}
        disabled={todos.every(todo => !todo.completed) || loading}
      >
        Clear completed
      </button>
    </footer>
  );
};
