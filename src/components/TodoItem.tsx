import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({
  todo,
}) => {
  const { title } = todo;
  const isCompleted = todo.completed;

  return (
    <div
      className={classNames('todo',
        { completed: isCompleted })}
      data-cy="Todo"
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
        />
      </label>

      <span
        data-cy="TodoTitle"
        className="todo__title"
      >
        {title}
      </span>
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div
        data-cy="TodoLoader"
        className="modal overlay"
      >
        <div
          className="modal-background
           has-background-white-ter"
        />
        <div className="loader" />
      </div>
    </div>
  );
};
