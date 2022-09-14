import React from 'react';
import { Todo } from '../../../types/Todo';

type Props = {
  newTodo: React.RefObject<HTMLInputElement>;
  todos: Todo[];
};

export const Header: React.FC<Props> = ({ newTodo, todos }) => (
  <header className="todoapp__header">
    {todos.length > 0 && (
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="ToggleAll"
      />
    )}

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodo}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  </header>
);
