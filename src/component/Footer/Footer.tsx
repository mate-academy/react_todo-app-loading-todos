import React from 'react';
import cn from 'classnames';

type Props = {
  itemLeft: number;
  stateTodo: boolean | undefined;
  setStateTodo: (state: boolean | undefined) => void;
  clearComplete: () => void;
};

export const Footer: React.FC<Props> = ({
  itemLeft,
  stateTodo,
  setStateTodo,
  clearComplete,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {itemLeft} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={cn('filter__link', {
            selected: stateTodo === undefined,
          })}
          data-cy="FilterLinkAll"
          onClick={() => setStateTodo(undefined)}
        >
          All
        </a>

        <a
          href="#/active"
          className={cn('filter__link', {
            selected: stateTodo === false,
          })}
          data-cy="FilterLinkActive"
          onClick={() => setStateTodo(false)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={cn('filter__link', {
            selected: stateTodo === true,
          })}
          data-cy="FilterLinkCompleted"
          onClick={() => setStateTodo(true)}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        // disabled={() => {}}
        onClick={clearComplete}
      >
        Clear completed
      </button>
    </footer>
  );
};
