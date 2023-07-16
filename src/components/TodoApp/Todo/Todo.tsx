import React from 'react';
import classNames from 'classnames';

type Props = {
  title: string,
  id: number,
  completed: boolean,
};

export const Todo: React.FC<Props> = ({
  title,
  id,
  completed,
}) => {
  return (
    <div
      className={classNames(
        'todo',
        {
          completed,
        },
      )}
      key={id}
    >
      <label
        className="todo__status-label"
      >
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
      >
        ×
      </button>

      <div className="modal overlay">
        <div
          className="modal-background has-background-white-ter"
        />

        <div className="loader" />
      </div>
    </div>
  );
};
