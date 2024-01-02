import React from 'react';
import { Todo } from '../../types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
interface Props {
  todos: Todo[];
}

export const Header: React.FC<Props> = ({ todos }) => {
  return (
    <header className="todoapp__header">
      {todos.some(todo => !todo.completed) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form>
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
