import React from 'react';

interface Props {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  hasTodos: boolean;
}

export const Header: React.FC<Props> = ({
  inputValue,
  setInputValue,
  onSubmit,
  hasTodos,
}) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          data-cy="ToggleAllButton"
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
