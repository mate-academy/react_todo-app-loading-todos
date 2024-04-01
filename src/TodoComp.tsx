/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cn from 'classnames';

interface Props {
  completed: boolean;
  title: string;
  id: number;
}

export const TodoComp: React.FC<Props> = ({ completed, id, title }) => (
  <div data-cy="Todo" className={cn('todo', { completed: completed })} key={id}>
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
  </div>
);
