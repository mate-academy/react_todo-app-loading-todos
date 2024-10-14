import React, { useEffect, useRef } from 'react';

interface Props {}

export const Header: React.FC<Props> = () => {
  const todoInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInputField.current) {
      todoInputField.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {false && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form>
        <input
          ref={todoInputField}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
