import cn from 'classnames';

import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';
import { TodoEditing } from './TodoEditing';

export const TodoTask: React.FC<{ todo: Todo }> = ({ todo }) => {
  const { title, completed } = todo;
  const [isEditing] = useState(false);
  const [isLoading] = useState(false);

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        [TodoStatus.Editing]: isEditing,
        [TodoStatus.Completed]: completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {isEditing
        ? <TodoEditing />
        : (
          <>
            <span data-cy="TodoTitle" className="todo__title">
              {title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
            >
              x
            </button>

          </>
        )}

      <div
        data-cy="TodoLoader"
        className={cn(
          'modal',
          'overlay',
          { 'is-active': isLoading },
        )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
