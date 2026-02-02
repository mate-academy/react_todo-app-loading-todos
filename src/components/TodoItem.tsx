import classNames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onDelete: (id: number) => void;
  onUpdate: (todo: Todo) => void;
  onRename: (todo: Todo, title: string) => Promise<void>;
}

export const TodoItem: React.FC<Props> = ({
  todo,
  onDelete,
  onUpdate,
  onRename,
}) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempTitle, setTempTitle] = useState(todo.title);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingId === todo.id) {
      editInputRef.current?.focus();
    }
  }, [editingId, todo.id]);

  const handleBlur = () => {
  if (!tempTitle.trim()) {
    onDelete(todo.id); 
    return;
  }

  onRename(todo, tempTitle)
    .then(() => setEditingId(null))
    .catch(() => setEditingId(todo.id));
};

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
   if (event.key === 'Enter') {
    if (!tempTitle.trim()) {
      onDelete(todo.id); 
      return;
    }

    onRename(todo, tempTitle)
      .then(() => setEditingId(null))
      .catch(() => setEditingId(todo.id));
  }

  if (event.key === 'Escape') {
    setTempTitle(todo.title);
    setEditingId(null);
  }
};

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
    >
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
      />

      {editingId === todo.id ? (
        <input
          ref={editInputRef}
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={tempTitle}
          onChange={event => setTempTitle(event.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditingId(todo.id)}
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
        className={classNames('modal overlay', { 'is-active': todo.isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};