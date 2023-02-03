import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../../types';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = React.memo(({
  todo,
}) => {
  const [beingEdited] = useState(false); // for the future
  const { title, completed } = todo;

  return (
    <div
      className={classNames(
        'todo',
        { completed },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {}}
        />
      </label>

      {beingEdited
        ? (
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>
        ) : (
          <>
            <span className="todo__title">
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
            >
              ×
            </button>
          </>
        )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
