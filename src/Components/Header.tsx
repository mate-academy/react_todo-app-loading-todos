import React from 'react';
import { Todo } from '../types/Todo';

type HeaderProps = {
  todos: Todo[];
  title: string;
  setTitle: (value: string) => void;
  setError: (value: string | null) => void;
  onToggleAll: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  todos,
  title,
  setTitle,
  setError,
  handleSubmit,
  onToggleAll,
  loading,
}) => {
  const areAllTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all ${areAllTodosCompleted ? 'active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={onToggleAll}
          disabled={loading}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          autoFocus
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setError(null);
          }}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={loading}
        />
      </form>
    </header>
  );
};
