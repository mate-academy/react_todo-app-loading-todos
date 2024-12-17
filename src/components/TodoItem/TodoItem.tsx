import React from 'react';
import cn from 'classnames';

type Props = {
  title: string;
  id: number;
  completed: boolean;
};

export const TodoItem: React.FC<Props> = ({ title, id, completed }) => {
  return (
    <li
      key={id}
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
      // eslint-disable-next-line react/jsx-no-comment-textnodes
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
