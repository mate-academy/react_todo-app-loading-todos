import React, { useState } from 'react';
import cn from 'classnames';

import './Todo.scss';
import { TodoType } from '../../types/TodoType';

type Props = {
  todo: TodoType;
};

export const Todo: React.FC<Props> = ({ todo }) => {
  const [completed, setCompleted] = useState(todo.completed);

  return (
    <div className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={() => setCompleted(!completed)}
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
    </div>
  );
};
