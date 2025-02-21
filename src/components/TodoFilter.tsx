import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  handleStatusChange: (value: 'all' | 'active' | 'completed') => void;
  status: 'all' | 'active' | 'completed';
  todos: Todo[];
  deleteThisTodo: (todoId: number) => void;
};

export const TodoFilter: React.FC<Props> = ({
  todos,
  handleStatusChange,
  status,
  deleteThisTodo,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: 'all' | 'active' | 'completed',
  ) => {
    e.preventDefault();
    handleStatusChange(value);
  };

  const clearCompletedTodos = () => {
    todos
      .filter(todo => todo.completed) // Only completed todos
      .forEach(todo => deleteThisTodo(todo.id)); // Delete each completed todo
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todos.filter(todo => !todo.completed).length} items left
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          className={`filter__link ${status === 'all' ? 'selected' : ''}`}
          data-cy="FilterLinkAll"
          onClick={e => handleClick(e, 'all')}
        >
          All
        </a>

        <a
          href="#/active"
          className={`filter__link ${status === 'active' ? 'selected' : ''}`}
          data-cy="FilterLinkActive"
          onClick={e => handleClick(e, 'active')}
        >
          Active
        </a>

        <a
          href="#/completed"
          className={`filter__link ${status === 'completed' ? 'selected' : ''}`}
          data-cy="FilterLinkCompleted"
          onClick={e => handleClick(e, 'completed')}
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clearCompletedTodos}
        style={{
          visibility: todos.some(todo => todo.completed) ? 'visible' : 'hidden',
        }}
      >
        Clear completed
      </button>
    </footer>
  );
};
