import classNames from 'classnames';
import React from 'react';
import { Todo } from '../../types/Todo';

interface TodoProps {
  todo: Todo,
}

export const TodoItem: React.FC<TodoProps> = ({ todo }) => {
  const {
    completed,
    title,
  } = todo;

  return (
    <div
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          aria-label="Enter to do"
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{title}</span>
      <button type="button" className="todo__remove">×</button>
    </div>
  );
};
