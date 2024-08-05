import classNames from 'classnames';
import React, { useMemo } from 'react';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[];
  todoStatus: Status;
  setTodoStatus: (status: Status) => void;
};

export const Footer: React.FC<Props> = ({
  todos,
  todoStatus,
  setTodoStatus,
}) => {
  const hasCompleted = useMemo(() => {
    return todos.some(todo => todo.completed);
  }, [todos]);

  const activeTodosCount = useMemo(() => {
    return todos.reduce((sum, todo) => sum + Number(!todo.completed), 0);
  }, [todos]);

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {activeTodosCount} items left
      </span>

      <nav className="filter" data-cy="Filter">
        {['All', 'Active', 'Completed'].map(status => (
          <a
            key={status}
            href={`#/${status}`}
            className={classNames('filter__link', {
              selected: status === todoStatus,
            })}
            data-cy={`FilterLink${status}`}
            onClick={() => setTodoStatus(status as Status)}
          >
            {status}
          </a>
        ))}
      </nav>

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!hasCompleted}
      >
        Clear completed
      </button>
    </footer>
  );
};
