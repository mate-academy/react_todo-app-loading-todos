import React from 'react';

type Props = {
  newTodo: React.RefObject<HTMLInputElement>;
  isTodo: boolean;
};

export const Header: React.FC<Props> = ({ newTodo, isTodo }) => (
  <header className="todoapp__header">
    {isTodo && (
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
