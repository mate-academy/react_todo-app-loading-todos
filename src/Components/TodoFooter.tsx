import { useState } from 'react';
import { StatusFilter, Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  setStatusFilter: (value: 'all' | 'active' | 'completed') => void;
  todos: Todo[];
};

export const TodoFooter: React.FC<Props> = ({ setStatusFilter, todos }) => {
  const [status, setStatus] = useState<StatusFilter>('all');

  const handleStatusChange = (e: StatusFilter) => {
    setStatusFilter(e);
    setStatus(e);
  };

  return (
    <>
      {todos.length > 0 && (
        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="TodosCounter">
            {/* {todos} items left */}
            {todos.filter(todo => !todo.completed).length} items left
          </span>

          {/* Active link should have the 'selected' class */}
          <nav className="filter" data-cy="Filter">
            <a
              href="#/"
              className={cn('filter__link', {
                selected: status === 'all',
              })}
              data-cy="FilterLinkAll"
              onClick={() => handleStatusChange('all')}
            >
              All
            </a>

            <a
              href="#/active"
              className={cn('filter__link', {
                selected: status === 'active',
              })}
              data-cy="FilterLinkActive"
              onClick={() => handleStatusChange('active')}
            >
              Active
            </a>

            <a
              href="#/completed"
              className={cn('filter__link', {
                selected: status === 'completed',
              })}
              data-cy="FilterLinkCompleted"
              onClick={() => handleStatusChange('completed')}
            >
              Completed
            </a>
          </nav>

          {/* this button should be disabled if there are no completed todos */}
          <button
            type="button"
            className="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
};
