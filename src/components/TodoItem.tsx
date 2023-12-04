import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';

type Props = {
  todo: Todo
};

export const TodoItem: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
  },
}) => {
  const [editing, setEditing] = useState(false);
  const [inLoading, setInLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleCompleted = () => {

  };

  const hendleNewTitle = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setInLoading(true);
    setNewTitle(event.target.value);
    setInLoading(false);
  };

  const cancelNewTitle = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setNewTitle(title);
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames(
        { completed },
        'todo',
      )}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          id={id.toString()}
          checked={completed}
          onChange={handleCompleted}
        />
      </label>
      {editing
        ? (
          <form>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={newTitle}
              onChange={event => setNewTitle(event.target.value)}
              onBlur={hendleNewTitle}
              onKeyUp={cancelNewTitle}
            />
          </form>
        ) : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                return setEditing(true);
              }}
            >
              {title}
            </span>

            <button
              aria-label="deleteTodo"
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              ×
            </button>
          </>
        )}
      <div
        data-cy="TodoLoader"
        className={classNames(
          { 'is-active': inLoading },
          'modal',
          'overlay',
        )}

      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
