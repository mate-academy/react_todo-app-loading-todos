import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { id, title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={
        classNames('todo',
          {
            completed,
          })
      }
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
