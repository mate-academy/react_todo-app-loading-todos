import React, { useState } from 'react';
import classNames from 'classnames';

interface Props {
  title: string;
  status?: boolean;
}

export const TodoItem: React.FC<Props> = ({ status = false, title }) => {
  const [value, setValue] = useState(title);

  return (
    <div data-cy="Todo" className={classNames('todo', { completed: status })}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          value={value}
          checked={status}
          onChange={event => setValue(event.target.value)}
          aria-label="Todo input field"
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {value}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
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
