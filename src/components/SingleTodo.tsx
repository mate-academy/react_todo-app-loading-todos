import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo,
}

export const SingleTodo: React.FC<Props> = ({ todo }) => {
  const [isComplited, setComplited] = useState(todo.completed);

  const changeCheck = () => {
    setComplited(prev => !prev);
  };

  return (
    <div
      key={todo.id}
      className={classNames(
        'todo',
        { completed: isComplited },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={isComplited}
          onChange={changeCheck}
        />
      </label>

      <span className="todo__title">{todo.title}</span>

      <button type="button" className="todo__remove">
        x
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
