import React, { useEffect, useRef, useState } from 'react';
export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  const textField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (textField.current) {
      textField.current.focus();
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
          ref={textField}
          data-cy="NewTodoField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
