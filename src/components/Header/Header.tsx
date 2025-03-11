import React from 'react';

interface Props {
  isLoading: boolean;
}

export const Header: React.FC<Props> = ({ isLoading }) => (
  <header className="todoapp__header">
    <button
      type="button"
      className="todoapp__toggle-all"
      data-cy="ToggleAllButton"
      disabled={isLoading}
    />

    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        autoFocus
        disabled={isLoading}
      />
    </form>
  </header>
);
