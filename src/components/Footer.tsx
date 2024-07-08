import React from 'react';
import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

interface FooterProps {
  todos: Todo[];
  selectedStatus: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
  filteringTodosByActiveStatus: number;
  TodoStatusRoutes: Record<TodoStatus, string>;
}

export const Footer: React.FC<FooterProps> = ({
  todos,
  selectedStatus,
  onStatusChange,
  filteringTodosByActiveStatus,
  TodoStatusRoutes,
}) => {
  if (todos.length > 0) {
    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="TodosCounter">
          {filteringTodosByActiveStatus} items left
        </span>

        <nav className="filter" data-cy="Filter">
          {Object.keys(TodoStatusRoutes).map(status => (
            <a
              key={status}
              href={`#${TodoStatusRoutes[status as TodoStatus]}`}
              className={classNames('filter__link', {
                selected: selectedStatus === status,
              })}
              data-cy={`FilterLink${status}`}
              onClick={() => onStatusChange(status as TodoStatus)}
            >
              {status}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
          disabled={todos.map(t => t.completed).length === 0}
        >
          Clear completed
        </button>
      </footer>
    );
  } else {
    return null;
  }
};
