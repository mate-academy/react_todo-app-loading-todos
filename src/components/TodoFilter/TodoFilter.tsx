import React, { useMemo } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

interface Props {
  todos: Todo[],
  filterType: FilterType,
  setFilterType: (type: FilterType) => void,
}

export const TodoFilter: React.FC<Props> = ({
  todos,
  filterType,
  setFilterType,
}) => {
  const leftTodos = useMemo(() => (
    todos.filter(todo => !todo.completed)
  ), [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${leftTodos.length} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={classNames('filter__link', {
            selected: filterType === FilterType.ALL,
          })}
          onClick={() => setFilterType(FilterType.ALL)}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={classNames('filter__link', {
            selected: filterType === FilterType.ACTIVE,
          })}
          onClick={() => setFilterType(FilterType.ACTIVE)}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={classNames('filter__link', {
            selected: filterType === FilterType.COMPLETED,
          })}
          onClick={() => setFilterType(FilterType.COMPLETED)}
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
