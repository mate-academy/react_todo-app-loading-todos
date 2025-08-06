import React, { useState, useEffect, useRef } from 'react';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
  onRename: (id: number, newTitle: string) => Promise<void>;
  loading: boolean;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onToggle,
  onRename,
  loading,
}) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [renameError, setRenameError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (renameError && inputRef.current) {
      inputRef.current.focus();
    }
  }, [renameError]);

  const handleDoubleClick = () => {
    setRenameError(false);
    setEditing(true);
    setTitle(todo.title);
  };

  const handleBlur = async () => {
    if (renameError) {
      if (inputRef.current) {
        inputRef.current.focus();
      }

      return;
    }

    const trimmed = title.trim();

    if (!trimmed) {
      setRenameError(false);
      onDelete(todo.id);

      return;
    }

    if (trimmed === todo.title) {
      setEditing(false);
      setTitle(todo.title);

      return;
    }

    try {
      setRenameError(false);
      await onRename(todo.id, trimmed);
      setEditing(false);
    } catch {
      setRenameError(true);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setTitle(todo.title);
      setEditing(false);
      setRenameError(false);

      return;
    }

    if (e.key === 'Enter') {
      const trimmed = title.trim();

      if (trimmed === todo.title) {
        setEditing(false);
        setRenameError(false);

        return;
      }

      if (!trimmed) {
        setRenameError(false);
        setEditing(true);
        onDelete(todo.id);

        return;
      }

      try {
        setRenameError(false);
        await onRename(todo.id, trimmed);
        setEditing(false);
      } catch {
        setRenameError(true);
      }
    }
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`} data-cy="Todo">
      <label className="todo__status-label" aria-label="stat">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          data-cy="TodoStatus"
          disabled={loading}
        />
      </label>

      {editing ? (
        <input
          ref={inputRef}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-input"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          aria-invalid={renameError}
        />
      ) : (
        <span
          className="todo__title"
          data-cy="TodoTitle"
          onDoubleClick={handleDoubleClick}
        >
          {todo.title}
        </span>
      )}

      {!editing && (
        <button
          type="button"
          className="todo__remove"
          onClick={() => onDelete(todo.id)}
          data-cy="TodoDelete"
          disabled={loading}
        >
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay${loading ? ' is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
