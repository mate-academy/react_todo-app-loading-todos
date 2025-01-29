import React from 'react';

interface HeaderProps {
  loading: boolean;
  todosLeft: number;
  newTodo: string;
  setNewTodo: (value: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  onToggleAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  loading,
  todosLeft,
  newTodo,
  setNewTodo,
  inputRef,
  onToggleAll,
}) => {
  return (
    <header className="todoapp__header">
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        disabled={loading || todosLeft === 0}
        onClick={onToggleAll}
      />

      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          ref={inputRef}
        />
      </form>
    </header>
  );
};
