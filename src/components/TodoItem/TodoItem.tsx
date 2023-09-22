import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => (
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

    <span className="todo__title" data-cy="TodoTitle">{todo.title}</span>

    {/* Remove button appears only on hover */}
    <button
      type="button"
      className="todo__remove"
      data-cy="TodoDelete"
    >
      ×
    </button>

    {/* overlay will cover the todo while it is being updated */}
    <div className="modal overlay" data-cy="TodoLoader">
      <div className="modal-background has-background-white-ter" />
      <div className="loader" />
    </div>
  </div>
);
