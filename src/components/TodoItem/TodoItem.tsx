import cn from 'classnames';
import React from 'react';

interface Props {
  title: string;
  isCompleted: boolean;
}

export const TodoItem: React.FC<Props> = React.memo(({
  title,
  isCompleted,
}) => (
  <div
    data-cy="Todo"
    className={cn('todo', {
      completed: isCompleted,
    })}
  >
    <label className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        defaultChecked
      />
    </label>

    <span data-cy="TodoTitle" className="todo__title">
      {title}
    </span>

    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDeleteButton"
    >
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
));
