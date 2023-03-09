import React from 'react';
import classNames from 'classnames';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input type="checkbox" className="todo__status" checked={completed} />
      </label>

      <span className="todo__title">{title}</span>

      <button type="button" className="todo__remove">
        {'\u00d7'}
      </button>
    </div>
  );
};
