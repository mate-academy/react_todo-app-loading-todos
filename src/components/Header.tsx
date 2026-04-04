import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isAdding: boolean;
  allCompleted: boolean;
  onToggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  value,
  onChange,
  onSubmit,
  inputRef,
  isAdding,
  allCompleted,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        data-cy="ToggleAllButton"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        onClick={onToggleAll}
      />

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={isAdding}
        />
      </form>
    </header>
  );
};
