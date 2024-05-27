import React from 'react';
import { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <header className="todoapp_header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButtons"
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputRef}
        />
      </form>
    </header>
  );
};
