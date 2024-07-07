import React from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';

interface Props {
  todos: Todo[];
  filterType: FilterType;
  onChangeType: (type: FilterType) => void;
}

export const Footer: React.FC<Props> = ({
  todos,
  filterType,
  onChangeType,
}) => {
  const leftTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterType === FilterType.ALL,
          })}
          data-cy="FilterLinkAll"
          onClick={() => onChangeType(FilterType.ALL)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterType === FilterType.ACTIVE,
          })}
          data-cy="FilterLinkActive"
          onClick={() => onChangeType(FilterType.ACTIVE)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterType === FilterType.COMPLETED,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => onChangeType(FilterType.COMPLETED)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
