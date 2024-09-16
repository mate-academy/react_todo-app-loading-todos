import React from 'react';

type Props = {
  title: string;
  setTitle: (newTitle: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
};

export const Header: React.FC<Props> = ({ title, setTitle, handleSubmit }) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={event => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
