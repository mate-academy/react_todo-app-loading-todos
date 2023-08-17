import React, { useState } from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = Todo;

export const TodoItem: React.FC<Props> = ({ title, completed }) => {
  const [currentTitle] = useState(title);

  return (
    <div className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span className="todo__title">{currentTitle}</span>
      <button type="button" className="todo__remove">×</button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
