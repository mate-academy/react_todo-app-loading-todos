import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;

  return (
    <div className={cn('todo', {
      completed,
    })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          // checked={completed}
        />
      </label>

      {/* This form is shown instead of the title and remove button */}

      {false && (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      )}

      <span className="todo__title">{title}</span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove">×</button>

      {/* overlay will cover the todo while it is being updated */}
      {/* 'is-active' class for modal puts this modal on top of the todo */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
