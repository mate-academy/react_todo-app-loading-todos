import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  deleteUncompletedtodos: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  activeFilter,
  onFilterChange,
  deleteUncompletedtodos,
}) => {
  const completedTodos = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <span className="todo-count" data-cy="TodosCounter">
        {`${completedTodos} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: activeFilter === 'all' })}
          data-cy="FilterLinkAll"
          onClick={() => onFilterChange('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link',
            { selected: activeFilter === 'active' })}
          data-cy="FilterLinkActive"
          onClick={() => onFilterChange('active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link',
            { selected: activeFilter === 'completed' })}
          data-cy="FilterLinkCompleted"
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={deleteUncompletedtodos}
      >
        Clear completed
      </button>
    </>
  );
};
