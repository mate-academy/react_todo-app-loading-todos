/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  isDeleting: boolean;
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo, data: Partial<Todo>) => void;
}

// eslint-disable-next-line max-len
export const TodoItem: React.FC<Props> = ({
  todo,
  isDeleting,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const editFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editFieldRef.current) {
      editFieldRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle === todo.title) {
      setIsEditing(false);

      return;
    }

    if (!trimmedTitle) {
      onDelete(todo.id);

      return;
    }

    onUpdate(todo, { title: trimmedTitle });
    setIsEditing(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(todo.title);
    }
  };

  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onUpdate(todo, { completed: !todo.completed })}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            ref={editFieldRef}
            className="todo__title-field"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            onBlur={handleSubmit}
            onKeyUp={handleKeyUp}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': isDeleting })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
