import React, { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const fieldTitle = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fieldTitle.current?.focus();
  }, []);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form>
        <input
          ref={fieldTitle}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
