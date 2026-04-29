import React from 'react';

type Props = {
  newTitle: string;
  setNewTitle: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  disabled: boolean;
};

export const Header: React.FC<Props> = ({
  newTitle,
  setNewTitle,
  onSubmit,
  inputRef,
  disabled,
}) => (
  <header className="todoapp__header">
    <form onSubmit={onSubmit}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
        disabled={disabled}
      />
    </form>
  </header>
);
