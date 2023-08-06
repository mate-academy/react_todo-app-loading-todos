import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { Filter } from '../utils/Enum';

type Props = {
  todos: Todo[]
  filterTodos: string,
  setFilterTodos: (value: Filter) => void,
  clearButton: boolean,
};

export const TodoFooter: React.FC<Props> = ({
  todos,
  filterTodos,
  setFilterTodos,
  clearButton,
}) => {
  const activeItems = todos.filter(todo => !todo.completed).length;

  return (
    <footer className="todoapp__footer">
      <span className="todo-count">
        {`${activeItems} items left`}
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

      <button
        type="button"
        className="todoapp__clear-completed"
        disabled={!clearButton}
        style={!clearButton ? { visibility: 'hidden' } : {}}
      >
        Clear completed
      </button>
    </footer>
  );
};
