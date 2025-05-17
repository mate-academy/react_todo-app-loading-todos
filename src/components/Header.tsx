import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  todos: Todo[];
  completedTodos: number;
};

export const Header: React.FC<Props> = ({ todos, completedTodos }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${todos.length === completedTodos ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={event => event.preventDefault()}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
