import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  isLoading: boolean;
  isEditing: boolean;
  onUpdate: (id: number, data: Partial<Omit<Todo, 'id'>>) => void;
  onDelete: (id: number) => void;
  onSetEditingId: (id: number | null) => void;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading,
  isEditing,
  onUpdate,
  onDelete,
  onSetEditingId,
}) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const editFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editFieldRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedTitle = editedTitle.trim();

    onSetEditingId(null);

    if (!trimmedTitle) {
      onDelete(todo.id);

      return;
    }

    if (trimmedTitle === todo.title) {
      return;
    }

    onUpdate(todo.id, { title: trimmedTitle });
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onSetEditingId(null);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate(todo.id, { completed: !todo.completed })}
          // #FIX: Dodano aria-label, aby nadać polu dostępną nazwę
          aria-label={`Toggle status for ${todo.title}`}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            ref={editFieldRef}
            value={editedTitle}
            onChange={e => setEditedTitle(e.target.value)}
            onBlur={handleSave}
            onKeyUp={handleKeyUp}
            aria-label="Edit todo title"
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onSetEditingId(todo.id)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
            aria-label={`Delete ${todo.title}`}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
