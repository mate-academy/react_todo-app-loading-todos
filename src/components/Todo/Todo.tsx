/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  isLoading?: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, isLoading = false }) => (
  <div
    data-cy="Todo"
    className={classNames('todo', {
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

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
    </span>

    {/* Remove button appears only on hover */}
    <button type="button" className="todo__remove" data-cy="TodoDelete">
      ×
    </button>
    <div
      data-cy="TodoLoader"
      className={classNames('modal', 'overlay', {
        'is-active': isLoading,
      })}
    >
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
