import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { Loader } from '../Loader';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;
  const [isBeingEdited] = useState(false);
  const [isLoading] = useState(false);

  return (
    <div className={`todo${completed ? ' completed' : ''}`}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {isBeingEdited
        ? (
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>
        )
        : (
          <>
            <span className="todo__title">{title}</span>
            <button type="button" className="todo__remove">×</button>
          </>
        )}

      {/* overlay will cover the todo while it is being updated */}
      <div className={`modal overlay${isLoading ? 'is-active' : ''}`}>
        <div className="modal-background has-background-white-ter" />
        <Loader />
      </div>
    </div>
  );
};
