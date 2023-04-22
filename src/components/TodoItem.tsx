import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
  handleClickRemoveTodo:
  (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
};

export const TodoItem: React.FC<Props> = (
  {
    todo,
    handleClickRemoveTodo,
  },
) => {
  const [isTodoCompleted, setIsTodoCompleted] = useState(false);

  return (
    <div className={classNames('todo', {
      completed: isTodoCompleted,
    })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          onClick={(ev) => {
            ev.preventDefault();
            setIsTodoCompleted(!isTodoCompleted);
          }}

        />
      </label>
      <span className="todo__title">{todo.title}</span>
      <button
        type="button"
        className="todo__remove"
        onClick={handleClickRemoveTodo}
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
