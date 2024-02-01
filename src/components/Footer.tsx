import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[]
  setSortField: (state:string) => void;
  sortField: string;
};
export const Footer: React.FC <Props> = ({
  todos,
  setSortField,
  sortField,
}) => {
  const newTodos = todos.filter(todo => todo.completed === false);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${newTodos.length} items left`}
      </span>

      {/* Active filter should have a 'selected' class */}
      <nav className="filter" data-cy="Filter">
        <a
          onClick={() => {
            setSortField('All');
          }}
          href="#/"
          className={`filter__link ${classNames({ selected: sortField === 'All' })}`}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          onClick={() => {
            setSortField('Active');
          }}
          href="#/active"
          className={`filter__link ${classNames({ selected: sortField === 'Active' })}`}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          onClick={() => {
            setSortField('Completed');
          }}
          href="#/completed"
          className={`filter__link ${classNames({ selected: sortField === 'Completed' })}`}
          data-cy="FilterLinkCompleted"
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
