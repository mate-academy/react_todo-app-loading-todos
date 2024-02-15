import React from 'react';

interface Props {
  title: string;
  completed: boolean;
  id: number;
}

export const TodoItem: React.FC<Props> = ({ title, completed, id }) => (
  <div
    data-cy="Todo"
    className={`todo ${completed && 'completed'}`}
    key={id}
  >
    <label
      className="todo__status-label"
    >
      <input
        type="checkbox"
        data-cy="TodoStatus"
        className="todo__status"
        defaultChecked={completed}
      />
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
    </label>

    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>

    <div data-cy="TodoLoader" className="modal overlay">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
