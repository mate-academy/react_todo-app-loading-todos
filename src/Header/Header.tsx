// components/Header.tsx
import React, { FormEvent, ChangeEvent } from 'react';

type Props = {
  title: string;
  titleError: boolean;
  allCompleted: boolean;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setTitleError: (value: boolean) => void;
  setErrorNone: () => void;
  onToggleAll: () => void;
};

export const Header: React.FC<Props> = ({
  title,
  titleError,
  allCompleted,
  handleSubmit,
  handleChange,
  setTitleError,
  setErrorNone,
  onToggleAll,
}) => (
  <header className="todoapp__header">
    <button
      type="button"
      className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
      data-cy="ToggleAllButton"
      aria-label={
        allCompleted ? 'Unmark all todos' : 'Mark all todos as completed'
      }
      onClick={onToggleAll}
    />

    <form onSubmit={handleSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        value={title}
        placeholder="What needs to be done?"
        className={`todoapp__new-todo ${titleError ? 'error' : ''}`}
        onChange={e => {
          handleChange(e);
          if (titleError && e.target.value.trim()) {
            setTitleError(false);
            setErrorNone();
          }
        }}
        aria-invalid={titleError}
        aria-describedby={titleError ? 'title-error' : undefined}
      />
    </form>
  </header>
);
