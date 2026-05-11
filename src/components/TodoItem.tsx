import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isEditing: boolean;
  editTitle: string;
  isLoading: boolean;
  onToggle: (todo: Todo) => void;
  onDelete: (todoId: number) => void;
  onStartEdit: (todo: Todo) => void;
  onEditTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  onSaveEdit: (event: React.FormEvent, todo: Todo) => void;
  onCancelEdit: () => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isEditing,
  editTitle,
  isLoading,
  onToggle,
  onDelete,
  onStartEdit,
  onEditTitleChange,
  onSaveEdit,
  onCancelEdit,
}) => {
  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
      </label>

      {!isEditing ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => onStartEdit(todo)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDelete(todo.id)}
          >
            x
          </button>
        </>
      ) : (
        <form onSubmit={event => onSaveEdit(event, todo)}>
          <input
            autoFocus
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={onEditTitleChange}
            onBlur={event => onSaveEdit(event, todo)}
            onKeyUp={event => {
              if (event.key === 'Enter') {
                onCancelEdit();
              }
            }}
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          hidden: !isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
