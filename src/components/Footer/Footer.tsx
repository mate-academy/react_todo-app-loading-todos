import cn from 'classnames';
import React from 'react';
import { FilterState } from '../../types/FilterState';
import { Todo } from '../../types/Todo';

type Props = {
  filterState: FilterState,
  onSetFilterState: (value: FilterState) => void,
  todos: Todo[]
};

export const Footer: React.FC<Props> = ({
  filterState,
  onSetFilterState,
  todos,
}) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const activeTodosCount = activeTodos.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${activeTodosCount} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={
            cn('filter__link',
              { selected: filterState === FilterState.All })
          }
          onClick={() => onSetFilterState(FilterState.All)}
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
          onClick={() => onSetFilterState(FilterState.Active)}
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
          onClick={() => onSetFilterState(FilterState.Completed)}
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
