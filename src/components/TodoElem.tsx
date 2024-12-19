/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { USER_ID } from '../api/todos';

interface Props {
  todo: Todo;
  onUpdate: (v: Todo) => void;
  onDelete: (n: number) => void;
}

export const TodoElem: React.FC<Props> = ({
  todo: { id, title, completed },
  onUpdate,
  onDelete,
}) => {
  const handleChangeCheckbox = () => {
    onUpdate({
      id,
      userId: USER_ID,
      title,
      completed: !completed,
    });
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleChangeCheckbox}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(id)}
      >
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
