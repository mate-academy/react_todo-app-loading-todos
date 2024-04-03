import classNames from 'classnames';
import React from 'react';
import { StatusFilterValue } from '../../types/Todo';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  setStatusFilter: (value: StatusFilterValue) => void;
  statusFilter: StatusFilterValue;
};

export const Footer: React.FC<Props> = ({
  todos,
  setStatusFilter,
  statusFilter,
}) => {
  const filterValues: StatusFilterValue[] = ['all', 'completed', 'active'];
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodos.length} items left
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {filterValues.map(value => {
          const label = `${value[0].toUpperCase()}${value.slice(1)}`;

          return (
            <a
              key={value}
              href="#/"
              onClick={e => {
                e.preventDefault();
                setStatusFilter(value);
              }}
              className={classNames('filter__link', {
                selected: statusFilter === value,
              })}
              data-cy={`FilterLink${label}`}
            >
              {label}
            </a>
          );
        })}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos.length}
      >
        Clear completed
      </button>
    </footer>
  );
};
