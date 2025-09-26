import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isEditing: boolean;
  editingTitle: string;
  isLoading: boolean;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onStartEditing: (todo: Todo) => void;
  onSaveEdit: (id: number) => void;
  onCancelEdit: () => void; // ✅ тепер реально використовується
  onEditChange: (value: string) => void;
  onEditKeyPress: (event: React.KeyboardEvent, id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isEditing,
  editingTitle,
  isLoading,
  onToggle,
  onDelete,
  onStartEditing,
  onSaveEdit,
  onCancelEdit,
  onEditChange,
  onEditKeyPress,
}) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
        editing: isEditing,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          disabled={isLoading}
        />
      </label>

      {isEditing ? (
        <form
          onSubmit={e => {
            e.preventDefault();
            onSaveEdit(todo.id);
          }}
          onBlur={() => onSaveEdit(todo.id)}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editingTitle}
            onChange={e => onEditChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                onCancelEdit(); // ✅ тепер викликається
              } else {
                onEditKeyPress(e, todo.id);
              }
            }}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onStartEditing(todo)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
            disabled={isLoading}
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
