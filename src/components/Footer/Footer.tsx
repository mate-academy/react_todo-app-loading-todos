import React from 'react';
import { Filter, Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  filterStatus: Filter;
  setFilterStatus: (filter: Filter) => void;
};

export const Footer: React.FC<Props> = ({
  setFilterStatus,
  todos,
  filterStatus,
}) => {
  const todosLeft = todos.filter(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosLeft.length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: filterStatus === Filter.all,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setFilterStatus(Filter.all)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: filterStatus === Filter.active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setFilterStatus(Filter.active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filterStatus === Filter.completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilterStatus(Filter.completed)}
        >
          Completed
        </a>
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={todos.every(todo => !todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
