import React, { useState } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  setVisibleTodos: (todos: Todo[]) => void;
  clearCompletedTodos: () => void;
};

enum Status {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const Footer: React.FC<Props> = ({
  todos,
  setVisibleTodos = () => { },
  clearCompletedTodos = () => { },
}) => {
  const [filter, setFilter] = useState<Status>(Status.All);
  const completedTodos = todos.filter(todo => todo.completed);
  const activeTodos = todos.filter(todo => !todo.completed);

  const handlerFilterChange = (status: Status) => {
    setFilter(status);
    switch (status) {
      case Status.Active:
        setVisibleTodos(activeTodos);
        break;
      case Status.Completed:
        setVisibleTodos(completedTodos);
        break;
      default:
        setVisibleTodos(todos);
    }
  };

  const leftTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {leftTodos === 1 ? (
          '1 items left'
        ) : (
          `${leftTodos} items left`
        )}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', { selected: filter === Status.All })}
          data-cy="FilterLinkAll"
          onClick={() => handlerFilterChange(Status.All)}
        >
          {Status.All}
        </a>

        <a
          href="#/active"
          className={cn('filter__link', { selected: filter === Status.Active })}
          data-cy="FilterLinkActive"
          onClick={() => handlerFilterChange(Status.Active)}
        >
          {Status.Active}
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: filter === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => handlerFilterChange(Status.Completed)}
        >
          {Status.Completed}
        </a>
      </nav>

      {completedTodos.length !== 0 && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          onClick={() => clearCompletedTodos}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
