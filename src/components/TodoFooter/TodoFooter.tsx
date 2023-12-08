import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  todos: Todo[];
  todoFilter: Status;
  setTodoFilter: (todoFilter: Status) => void;
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  todoFilter,
  setTodoFilter,
}) => {
  const activeTodos = (
    todos.filter(todo => !todo.completed)
  );

  const hasCompletedTodos = todos.some(todo => todo.completed);

  return (
    <footer
      className="todoapp__footer"
      data-cy="Footer"
    >
      <span
        className="todo-count"
        data-cy="TodosCounter"
      >
        {`${activeTodos.length} items left`}
      </span>

      <nav
        className="filter"
        data-cy="Filter"
      >
        <a
          href="#/"
          className={cn('filter__link', {
            selected: todoFilter === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setTodoFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: todoFilter === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setTodoFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: todoFilter === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setTodoFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {hasCompletedTodos && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
