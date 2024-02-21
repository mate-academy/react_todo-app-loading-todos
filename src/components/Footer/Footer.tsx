import React from 'react';
import cn from 'classnames';
import { Status } from '../../types/enums';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  selected: Status;
  setSelected: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({ todos, selected, setSelected }) => {
  const uncompletedTodosAmount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {uncompletedTodosAmount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: selected === Status.All,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setSelected(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: selected === Status.Active,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setSelected(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: selected === Status.Completed,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setSelected(Status.Completed)}
        >
          Completed
        </a>
      </nav>

      {hasCompleted && (
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
