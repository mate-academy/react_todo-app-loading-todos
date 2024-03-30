/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext } from 'react';

import cn from 'classnames';
import { TodosContext, TodosControlContext } from '../context/TodosContext';
import { Status } from '../../types/enums';

export const TodoFooter: React.FC = () => {
  const { todos, statusTodo } = useContext(TodosContext);

  const { handleClearAll, setStatusTodo } = useContext(TodosControlContext);

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
        disabled={todos.some(todo => !todo.completed)}
        onClick={handleClearAll}
      >
        Clear completed
      </button>
    </footer>
  );
};
