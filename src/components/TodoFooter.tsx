import React from 'react';
import classnames from 'classnames';
import { Todo } from '../types/Todo';

enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

type Props = {
  todos: Todo[]
  filterTodos: string,
  setFilterTodos: (value: Filter) => void,
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterTodos,
  setFilterTodos,
}) => {
  const itemsNeedTodo = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsNeedTodo} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          onClick={() => {
            setFilterTodos(Filter.ALL);
          }}
          className={classnames('filter__link', {
            selected: filterTodos === Filter.ALL,
          })}
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => {
            setFilterTodos(Filter.ACTIVE);
          }}
          className={classnames('filter__link', {
            selected: filterTodos === Filter.ACTIVE,
          })}
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => {
            setFilterTodos(Filter.COMPLETED);
          }}
          className={classnames('filter__link', {
            selected: filterTodos === Filter.COMPLETED,
          })}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
};
