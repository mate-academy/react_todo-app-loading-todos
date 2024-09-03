import React, { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const inputValue = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputValue.current) {
      inputValue.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={inputValue}
        />
      </form>
    </header>
  );
};
