import React from 'react';
import { Completed } from '../../types/Filters';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  onSetParam: (val: Completed) => void;
  filterParam: Completed;
  todos: Todo[];
};

export const Footer: React.FC<Props> = ({ onSetParam, filterParam, todos }) => {
  const activeTodos = todos.filter(todo => !todo.completed).length;

  return (
    <>
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {activeTodos} items left
        </span>

        {/* Active link should have the 'selected' class */}
        <nav className="filter" data-cy="Filter">
          <a
            href="#/"
            className={cn('filter__link', {
              selected: filterParam === Completed.All,
            })}
            data-cy="FilterLinkAll"
            onClick={() => onSetParam(Completed.All)}
          >
            All
          </a>

          <a
            href="#/active"
            className={cn('filter__link', {
              selected: filterParam === Completed.Active,
            })}
            data-cy="FilterLinkActive"
            onClick={() => onSetParam(Completed.Active)}
          >
            Active
          </a>

          <a
            href="#/completed"
            className={cn('filter__link', {
              selected: filterParam === Completed.Completed,
            })}
            data-cy="FilterLinkCompleted"
            onClick={() => onSetParam(Completed.Completed)}
          >
            Completed
          </a>
        </nav>

        {/* this button should be disabled if there are no completed todos */}
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      </footer>
    </>
  );
};
