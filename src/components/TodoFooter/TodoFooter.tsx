import React from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';

type Props = {
  todosArray: Todo[];
  setFilter: (value: Filter) => void;
  filter: Filter;
};

export const Footer: React.FC<Props> = ({
  todosArray,
  setFilter,
  filter,
}) => {
  const completedTodos = todosArray.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${completedTodos} ${completedTodos > 1 ? 'items' : 'item'} left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav
        className="filter"
        data-cy="Filter"
      >
        <a
          href="#/"
          className={`filter__link ${filter === Filter.All ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Filter.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filter === Filter.Active ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Filter.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filter === Filter.Completed ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Filter.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={() => setFilter(Filter.All)}
      >
        Clear completed
      </button>
    </footer>
  );
};
