import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleChangeCompleted: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({ handleChangeCompleted, todo }) => {
  const { id, title, completed } = todo;

  return (
    <>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => handleChangeCompleted(id)}
        />
      </label>
      <span
        className="todo__title"
      >
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </>
  );
};
