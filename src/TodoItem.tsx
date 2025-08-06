import React, { useState } from 'react';
import { Todo } from './types/Todo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
  isLoading?: boolean;
  loadingTodo: number | null;
  setError: (error: string | null) => void;
  onDelete: (id: number) => void;
  onToggle: (id: number, newStatus: boolean) => void;
  onRename: (id: number, newTitle: string) => void;
}

/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

export const TodoItem: React.FC<Props> = ({
  todo,
  isLoading,
  // setError,
  loadingTodo,
  onDelete,
  onToggle,
  onRename,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  // const handleRename = () => {
  //   const trimmedTitle = editedTitle.trim();

  //   if (trimmedTitle && trimmedTitle !== todo.title) {
  //     onRename(todo.id, trimmedTitle);
  //   }

  //   setIsEditing(false);
  // };

  const cancelEditing = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  const finishEditing = () => {
    const trimmedTitle = editedTitle.trim();

    if (trimmedTitle === '') {
      return;
    }

    if (trimmedTitle !== todo.title) {
      onRename(todo.id, trimmedTitle);
    }

    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      finishEditing();
    }

    if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  return (
    <div
      key={todo.id}
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
      data-cy="Todo"
    >
      <label className="todo__status-label" htmlFor={`todo-status-${todo.id}`}>
        <input
          id={`todo-status-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          disabled={isLoading}
          onChange={() => onToggle(todo.id, !todo.completed)}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          type="text"
          className="todo__title-field"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
          disabled={isLoading}
        >
          {loadingTodo === todo.id ? <span className="loader is-small" /> : '×'}
        </button>
      )}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay ', {
          'is-active': loadingTodo === todo.id || isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
