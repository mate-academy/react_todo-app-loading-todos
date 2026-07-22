import React from 'react';

interface Props {
  todosCount: number;
  activeCount: number;
  title: string;
  isSubmitting: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  setTitle: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const Header: React.FC<Props> = ({
  todosCount,
  activeCount,
  title,
  isSubmitting,
  inputRef,
  setTitle,
  onSubmit,
}) => {
  return (
    <header className="todoapp__header">
      {todosCount > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${
            activeCount === 0 ? 'active' : ''
          }`}
          data-cy="ToggleAllButton"
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
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
      </form>
    </header>
  );
};