import React from 'react';
import classNames from 'classnames';

interface Props {
  id: number,
  completed: boolean,
  title: string,
}

export const TodoItem: React.FC<Props> = ({
  id,
  completed,
  title,
}) => {
  return (
    <div
      className={classNames(
        'todo',
        { completed },
      )}
      key={id}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">{title}</span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove">×</button>

      {/* overlay will cover the todo while it is being updated */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
