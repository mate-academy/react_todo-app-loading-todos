import React from 'react';
import { FilterType } from '../utils/filter';
import { Todo } from '../types/Todo';

type Props = {
  shownTodos: Todo[];
  filterType: FilterType;
  setFilterType: (filterType: FilterType) => void;
  counter: number;
};

export const Footer: React.FC<Props> = ({
  shownTodos,
  filterType,
  setFilterType,
  counter,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {counter + ' items left'}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${filterType === FilterType.ALL && 'selected'}`}
          data-cy="FilterLinkAll"
          onClick={() => setFilterType(FilterType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${filterType === FilterType.ACTIVE && 'selected'}`}
          data-cy="FilterLinkActive"
          onClick={() => setFilterType(FilterType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${filterType === FilterType.COMPLETED && 'selected'}`}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterType(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className={`todoapp__clear-completed ${!shownTodos.some(todo => todo.completed) && 'disabled'}`}
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
