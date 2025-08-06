import React from 'react';

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  onAddTodo: (e: React.FormEvent) => void;
  allCompleted: boolean;
  onToggleAll: () => void;
  isAdding: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  showToggleAll: boolean;
}

export const Header: React.FC<Props> = ({
  title,
  setTitle,
  onAddTodo,
  allCompleted,
  onToggleAll,
  isAdding,
  inputRef,
  showToggleAll,
}) => (
  <header className="todoapp__header">
    {showToggleAll && (
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAll}
      />
    )}
    <form onSubmit={onAddTodo}>
      <input
        ref={inputRef}
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoFocus
        disabled={isAdding}
      />
    </form>
  </header>
);
