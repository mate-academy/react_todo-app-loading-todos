/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../types/Todo';
import React, { FormEvent, useState } from 'react';

type Props = {
  todo: Todo;
  onDelete?: () => Promise<void>;
  onRename?: (title: string) => Promise<void>;
  onToggle?: () => Promise<void>;
};

export const TodoRow: React.FC<Props> = ({
  todo,
  onDelete = () => {},
  onRename = () => {},
  onToggle = () => {},
}) => {
  const [edited, setEdited] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleRemoveClick = () => {
    setEdited(false);
    setTitle('');
    onDelete();
  };

  const handleEditSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title) {
      onRename(title);
    } else {
      onDelete();
    }

    setEdited(false);
  };

  const handleTodoStatusEdit = () => {
    onToggle();
    setEdited(false);
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
          onChange={handleTodoStatusEdit}
        />
      </label>
      {edited ? (
        <form onSubmit={handleEditSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEdited(true)}
          >
            {todo.title}
          </span>

          {/* Remove button appears only on hover */}
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleRemoveClick}
          >
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
