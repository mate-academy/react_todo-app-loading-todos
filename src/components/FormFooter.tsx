import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setFilter: (filter: string) => void;
};

export const FormFooter: React.FC<Props> = ({ todos, filter, setFilter }) => {
  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${(todos.filter(todo => !todo.completed)).length} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'all' },
          )}
          onClick={() => {
            setFilter('all');
          }}
        >
          All
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'active' },
          )}
          onClick={() => {
            setFilter('active');
          }}
        >
          Active
        </a>

        <a
          href="#/"
          className={classNames(
            'filter__link',
            { selected: filter === 'completed' },
          )}
          onClick={() => {
            setFilter('completed');
          }}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      {(todos.filter(todo => todo.completed)).length > 0
        ? (
          <button
            type="button"
            className="todoapp__clear-completed"
          >
            Clear completed
          </button>
        )
        : (
          <button
            type="button"
            className="todoapp__clear-completed__no-completed"
          >
            Clear completed
          </button>
        )}

    </footer>
  );
};
