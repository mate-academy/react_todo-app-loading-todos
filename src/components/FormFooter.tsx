import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[],
  filter: string,
  setFilter: (filter: string) => void;
  onClearCompleted: () => void,
};

export const FormFooter: React.FC<Props> = ({
  todos, filter, setFilter, onClearCompleted,
}) => {
  const completedTodos = todos.filter(todo => todo.completed);

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
      {completedTodos.length > 0 && (
        <button
          type="button"
          className={classNames(
            'todoapp__clear-completed',
            { 'todoapp__clear-completed__no': completedTodos.length === 0 },
          )}
          onClick={() => onClearCompleted()}
        >
          Clear completed
        </button>
      )}

    </footer>
  );
};
