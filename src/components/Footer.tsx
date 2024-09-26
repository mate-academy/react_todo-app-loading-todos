import React from 'react';
import { Todo } from '../types/Todo';
import { StatusTodos } from '../App';

interface FooterProps {
  status: StatusTodos;
  onChangeStatus: (status: StatusTodos) => void;
  counterOfActiveTodos: number;
  todos: Todo[];
}

export const Footer: React.FC<FooterProps> = ({
  status,
  onChangeStatus,
  counterOfActiveTodos,
  todos,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${counterOfActiveTodos} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${status === StatusTodos.ALL ? 'selected' : ''}`}
          onClick={() => onChangeStatus(StatusTodos.ALL)}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === StatusTodos.ACTIVE ? 'selected' : ''}`}
          onClick={() => onChangeStatus(StatusTodos.ACTIVE)}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === StatusTodos.COMPLETED ? 'selected' : ''}`}
          onClick={() => onChangeStatus(StatusTodos.COMPLETED)}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
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
