/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Todo } from '../../types/Todo';
import clsx from 'clsx';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const isEditing = false;
  const isLoading = false;

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={clsx('todo', {
        completed: todo.completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      {isEditing ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value=""
          />
        </form>
      ) : (
        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>
      )}

      <div
        data-cy="TodoLoader"
        className={clsx('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
