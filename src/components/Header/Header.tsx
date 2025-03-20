import React, { useEffect, useRef, useState } from 'react';

type Props = {
  changeError: (er: string) => void;
};

export const Header: React.FC<Props> = ({ changeError }) => {
  const [title, setTitle] = useState('');
  const inputFocused = useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    inputFocused.current?.focus();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length === 0) {
      changeError('Title should not be empty');
    }
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form onSubmit={onSubmit}>
        <input
          ref={inputFocused}
          data-cy="NewTodoField"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
