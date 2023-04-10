import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const toggleIsCompleted = () => setIsCompleted(prev => !prev);

  return (
    <div
      className={classNames(
        'todo',
        { isCompleted },
      )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onClick={toggleIsCompleted}
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      <button type="button" className="todo__remove">x</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
