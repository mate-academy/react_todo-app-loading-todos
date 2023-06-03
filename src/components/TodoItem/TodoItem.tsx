import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/types';

interface Props {
  todo: Todo;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <>
      <div className={cn('todo', {
        completed,
      })}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
          />
        </label>

        <span className="todo__title">{title}</span>

        <button type="button" className="todo__remove">
          ×
        </button>
      </div>
    </>
  );
};
