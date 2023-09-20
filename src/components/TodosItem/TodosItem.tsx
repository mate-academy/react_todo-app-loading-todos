import React from 'react';
import classnames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
};

export const TodosItem: React.FC<Props> = ({ todo }) => {
  const { title, completed } = todo;

  return (
    <div
      className={classnames('todo', {
        completed,
      })}
      data-cy="Todo"
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">{title}</span>
      <button
        data-cy="TodoDelete"
        type="button"
        className="todo__remove"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
