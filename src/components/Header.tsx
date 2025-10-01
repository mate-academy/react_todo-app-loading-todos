import React from 'react';

type Props = {
  newTitle: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  allCompleted: boolean;
};

export const Header: React.FC<Props> = ({
  newTitle,
  onChange,
  onSubmit,
  allCompleted,
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
      data-cy="ToggleAllButton"
    />

    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={newTitle}
        onChange={e => onChange(e.target.value)}
        autoFocus
      />
    </form>
  </header>
);
