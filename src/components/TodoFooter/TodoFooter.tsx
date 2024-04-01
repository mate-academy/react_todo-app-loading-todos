/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import cn from 'classnames';
import { useTodos } from '../context/TodosContext';
import { Status } from '../../types/enums';

export const TodoFooter: React.FC = () => {
  const { todos, statusTodo, handleClearAll, setStatusTodo } = useTodos();

  const disabledTodos = todos.some(todo => !todo.completed);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {Object.values(Status).map(statusValue => {
          return (
            <a
              key={statusValue}
              href={`#/${statusValue === Status.All ? '' : statusValue}`}
              className={cn('filter__link', {
                selected: statusTodo === statusValue,
              })}
              data-cy={`FilterLink${statusValue}`}
              onClick={() => setStatusTodo(statusValue)}
            >
              {statusValue}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={disabledTodos}
        onClick={handleClearAll}
      >
        Clear completed
      </button>
    </footer>
  );
};
