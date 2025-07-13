import { Todo } from '../../types/Todo';
import React from 'react';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  status: TodoStatus;
  onStatusChange: (status: TodoStatus) => void;
};

type TodoStatus = 'all' | 'active' | 'completed';

export const TodoFooter: React.FC<Props> = ({
  todos,
  status,
  onStatusChange,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${todos.filter(todo => !todo.completed).length} items left`}
      </span>

      {/* Active link should have the 'selected' class */}
      <nav className="filter" data-cy="Filter">
        {(['all', 'active', 'completed'] as TodoStatus[]).map(link => (
          <a
            key={link}
            href="#/"
            className={classNames('filter__link', {
              selected: status === link,
            })}
            data-cy={`FilterLink${link.charAt(0).toUpperCase()}${link.slice(1)}`}
            onClick={() => onStatusChange(link)}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!todos.some(todo => todo.completed)}
      >
        Clear completed
      </button>
    </footer>
  );
};
