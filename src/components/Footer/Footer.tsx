import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

type Props = {
  todos: Todo[];
  filterBy: FilterType;
  onFilterSelect: (filterType: FilterType) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  filterBy,
  onFilterSelect: onFilter,
}) => {
  const hasCompletedTodo = todos.some(todo => todo.completed);
  const todosLeft = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todosLeft} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          data-cy="FilterLinkAll"
          href="#/"
          className={cn('filter__link', {
            selected: filterBy === FilterType.ALL,
          })}
          onClick={() => {
            onFilter(FilterType.ALL);
          }}
        >
          All
        </a>

        <a
          data-cy="FilterLinkActive"
          href="#/active"
          className={cn('filter__link', {
            selected: filterBy === FilterType.ACTIVE,
          })}
          onClick={() => {
            onFilter(FilterType.ACTIVE);
          }}
        >
          Active
        </a>
        <a
          data-cy="FilterLinkCompleted"
          href="#/completed"
          className={cn('filter__link', {
            selected: filterBy === FilterType.COMPLETED,
          })}
          onClick={() => {
            onFilter(FilterType.COMPLETED);
          }}
        >
          Completed
        </a>
      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
        style={{ visibility: hasCompletedTodo ? 'visible' : 'hidden' }}
      >
        Clear completed
      </button>
    </footer>
  );
};
