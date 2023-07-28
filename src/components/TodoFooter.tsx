import React from 'react';
import cn from 'classnames';
import { Filter, Todo } from '../types/Todo';

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
  const itemsLeftTodo = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${itemsLeftTodo} items left`}
      </span>

      <nav className="filter">
        <a
          href="#/"
          onClick={() => {
            setFilterTodos(Filter.ALL);
          }}
          className={cn('filter__link', {
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
          className={cn('filter__link', {
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
          className={cn('filter__link', {
            selected: filterTodos === Filter.COMPLETED,
          })}
        >
          Completed
        </a>
      </nav>

      {/* don't show this button if there are no completed todos */}
      <button type="button" className="todoapp__clear-completed">
        Clear completed
      </button>
    </footer>
  );
};
