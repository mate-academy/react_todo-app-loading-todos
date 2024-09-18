import React from 'react';

import { SortBy } from '../../types/SortBy';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  sortFunction: (el: SortBy) => void;
  todos: Todo[];
  howSort: SortBy;
};

export const Footer: React.FC<Props> = ({ sortFunction, todos, howSort }) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: howSort === SortBy.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => sortFunction(SortBy.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: howSort === SortBy.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => sortFunction(SortBy.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: howSort === SortBy.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => sortFunction(SortBy.Completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
