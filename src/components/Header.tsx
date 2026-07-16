import React from 'react';

type Props = {
  title: string;
  isSubmitting: boolean;
  hasTodos: boolean;
  allCompleted: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onTitleChange: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onToggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  title,
  isSubmitting,
  hasTodos,
  allCompleted,
  inputRef,
  onTitleChange,
  onSubmit,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      {hasTodos && (
        <button
          type="button"
          className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
        />
      )}

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => onTitleChange(e.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};
