import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

export const Header: React.FC<Props> = ({ todos }) => (
  <header className="todoapp__header">
    {/* this button should have `active` class only if all todos are completed */}
    {!!todos.length && (
      <button
        type="button"
        className="todoapp__toggle-all"
        data-cy="ToggleAllButton"
      />
    )}
    {/* Add a todo on form submit */}
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
