import React from 'react';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  handleChangeCompleted: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({ handleChangeCompleted, todo }) => {
  return (
    <>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleChangeCompleted(todo.id)}
        />
      </label>
      <span
        className="todo__title"
      >
        {todo.title}
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
