/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;
  const edit = false;
  const uptading = false;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
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

      {edit ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      ) : (
        <>
          <span data-cy="TodoTitle" className="todo__title">
            {title}
          </span>
          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': uptading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
