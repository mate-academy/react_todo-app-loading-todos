import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setFilter: (filter: Filters) => void;
  onClearCompleted: () => void,
};

enum Filters {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}

export const Footer: React.FC<Props> = ({
  todos, filter, setFilter, onClearCompleted,
}) => {
  const unCompletedTodos = todos.filter(todo => !todo.completed).length;
  const showClearButton = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${unCompletedTodos} items left`}
      </span>

      <nav className="filter">
        <button
          type="button"
          className={filter === 'all'
            ? 'filter__link selected' : 'filter__link'}
          onClick={() => setFilter(Filters.All)}
        >
          All
        </button>

        <button
          type="button"
          className={filter === 'active'
            ? 'filter__link selected' : 'filter__link'}
          onClick={() => setFilter(Filters.Active)}
        >
          Active
        </button>

        <button
          type="button"
          className={filter === 'completed'
            ? 'filter__link selected' : 'filter__link'}
          onClick={() => setFilter(Filters.Completed)}
        >
          Completed
        </button>
      </nav>

      {showClearButton && (
        <button
          type="button"
          className="todoapp__clear-completed"
          onClick={() => onClearCompleted()}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
