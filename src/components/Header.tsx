import React, { useEffect, useRef } from 'react';

export const Header: React.FC = () => {
  const newTodo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodo.current) {
      newTodo.current.focus();
    }
  }, []);

  return (
    <header className="todoapp__header">
      <button
        data-cy="ToggleAllButton"
        type="button"
        className="todoapp__toggle-all active"
        aria-label="switch"
      />

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
};
