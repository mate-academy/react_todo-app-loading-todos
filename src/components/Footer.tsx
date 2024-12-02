import React from 'react';
import classNames from 'classnames';
import { TodoStatus } from '../App';
import { Todo } from '../types/Todo';

interface FooterProps {
  todos: Todo[];
  statusFilter: TodoStatus;
  setStatusFilter: (status: TodoStatus) => void;
  filteredTodos: Todo[];
}

const Footer: React.FC<FooterProps> = ({
  todos,
  statusFilter,
  setStatusFilter,
  filteredTodos,
}) => (
  <footer className="todoapp__footer" data-cy="Footer">
    <span className="todo-count" data-cy="TodosCounter">
      {todos.filter(todo => !todo.completed).length} items left
    </span>

    <nav className="filter" data-cy="Filter">
      {Object.values(TodoStatus).map(status => (
        <a
          key={status}
          href={`#/${status.toLowerCase()}`}
          className={classNames('filter__link', {
            selected: statusFilter === status,
          })}
          data-cy={`FilterLink${status}`}
          onClick={() => setStatusFilter(status)}
        >
          {status}
        </a>
      ))}
    </nav>

    <button
      type="button"
      className="todoapp__clear-completed"
      data-cy="ClearCompletedButton"
      disabled={filteredTodos.filter(todo => todo.completed).length === 0}
    >
      Clear completed
    </button>
  </footer>
);

export default Footer;
