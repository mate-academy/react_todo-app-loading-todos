import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../../../types/Todo';

interface Props {
  todos: Todo[];
  selected: string;
  setStatus: (status: string) => void;
}

export const Footer: React.FC<Props> = ({ todos, selected, setStatus }) => {
  const statuses = ['All', 'Active', 'Completed'];

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="todosCounter">
        {todos.filter(todo => !todo.completed).length}
        {' items left'}
      </span>

      <nav className="filter" data-cy="Filter">
        {statuses.map(status => (
          <a
            key={status}
            data-cy="FilterLinkAll"
            href="#/"
            className={classNames('filter__link', {
              selected: selected === status,
            })}
            onClick={() => setStatus(status)}
          >
            {status}
          </a>
        ))}

      </nav>

      <button
        data-cy="ClearCompletedButton"
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
