import React, { Dispatch, SetStateAction } from 'react';
import { Todo } from '../types/Todo';
import { Filters } from '../types/Filtres';

type Props = {
  currentFilter: Filters;
  setCurrentFilter: Dispatch<SetStateAction<Filters>>;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export const Footer: React.FC<Props> = ({
  todos,
  setTodos,
  currentFilter,
  setCurrentFilter,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed);

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${currentFilter === Filters.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setCurrentFilter(Filters.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${currentFilter === Filters.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setCurrentFilter(Filters.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${currentFilter === Filters.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setCurrentFilter(Filters.Completed)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
        onClick={handleClearCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
