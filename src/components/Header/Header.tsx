import React from 'react';

interface Props {
  onSubmit: (event: React.FormEvent) => void;
  value: string;
  setValue: (str: string) => void;
}

export const Header: React.FC<Props> = React.memo(
  ({ onSubmit, value, setValue }) => {
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
            data-cy="NewTodoField"
            type="text"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
            value={value}
            onChange={event => setValue(event.target.value)}
          />
        </form>
      </header>
    );
  },
);

Header.displayName = 'Header';
