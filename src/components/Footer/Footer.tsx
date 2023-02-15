import cn from 'classnames';
import React from 'react';
import { FilterState } from '../../types/FilterState';
import { Todo } from '../../types/Todo';

type Props = {
  filterState: FilterState,
  setFilterBy: (value: FilterState) => void,
  todos: Todo[]
};

export const Footer: React.FC<Props> = ({
  filterState,
  setFilterBy,
  todos,
}) => {
  // const activeTodos = todos.filter(todo => !todo.completed);
  // const activeTodosCount = activeTodos.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            cn('filter__link',
              { selected: filterState === FilterState.All })
          }
          onClick={() => setFilterBy(FilterState.All)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={
            cn('filter__link',
              { selected: filterState === FilterState.Active })
          }
          onClick={() => setFilterBy(FilterState.Active)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={
            cn('filter__link',
              { selected: filterState === FilterState.Completed })
          }
          onClick={() => setFilterBy(FilterState.Completed)}
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
