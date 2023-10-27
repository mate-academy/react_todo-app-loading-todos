// import { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  todoFilter: (status: string | boolean) => void,
};

export const Footer: React.FC<Props> = ({ todos, todoFilter }) => {
  if (todos.length === 0) {
    return (<div />);
  }

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className="filter__link selected"
          data-cy="FilterLinkAll"
          onClick={() => todoFilter('all')}
        >
          All
        </a>

        <a
          href="#/active"
          className="filter__link"
          data-cy="FilterLinkActive"
          onClick={() => todoFilter(true)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className="filter__link"
          data-cy="FilterLinkCompleted"
          onClick={() => todoFilter(false)}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
