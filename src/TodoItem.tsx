/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from './types/Todo';
import React, { useEffect } from 'react';

type Props = {
  todo: Todo;
  loading?: boolean;
  onDelete?: () => void;
  onToggle?: () => void;
  onRename?: (newTitle: string) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  loading = false,
  onDelete = () => {},
  onToggle = () => {},
  onRename = () => Promise.resolve(),
}) => {
  const [editing, setEditing] = React.useState(false);
  const [title, setTitle] = React.useState(todo.title);

  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    if (normalizedTitle === todo.title) {
      setEditing(false);

      return;
    }

    if (!normalizedTitle) {
      onDelete();

      return;
    }

    try {
      await onRename(normalizedTitle);

      setEditing(false);
    } catch (error) {
      inputRef.current?.focus();
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
          onChange={onToggle}
        />
      </label>

      {editing ? (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onBlur={handleSubmit}
            onKeyUp={event => {
              if (event.key === 'Escape') {
                setEditing(false);
                setTitle(todo.title);
              }
            }}
            ref={inputRef}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setEditing(true);
              setTitle(todo.title);
            }}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={onDelete}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': loading,
        })}
      >
        <div
          className="
            modal-background has-background-white-ter
          "
        />
        <div className="loader" />
      </div>
    </div>
  );
};
