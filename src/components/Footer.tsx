import React from 'react';
import { Status } from '../types/Statuses';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[],
  filter: Status,
  setFilter: (value: Status) => void,
}

export const Footer: React.FC<Props> = ({ todos, filter, setFilter }) => {
  const leftTodos = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        { /* eslint-disable-next-line */ }
        {leftTodos} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={filter === Status.All
            ? 'filter__link selected' : 'filter__link'}
          data-cy="FilterLinkAll"
          onClick={() => setFilter(Status.All)}
        >
          All
        </a>

        <a
          href="#/active"
          className={filter === Status.Active
            ? 'filter__link selected' : 'filter__link'}
          data-cy="FilterLinkActive"
          onClick={() => setFilter(Status.Active)}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={filter === Status.Completed
            ? 'filter__link selected' : 'filter__link'}
          data-cy="FilterLinkCompleted"
          onClick={() => setFilter(Status.Completed)}
        >
          Completed
        </a>
      </nav>

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
