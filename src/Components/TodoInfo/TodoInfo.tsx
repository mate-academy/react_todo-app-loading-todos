import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/Error';

type Props = {
  todo: Todo,
  isLoading: boolean,
  onError: (isError: Error) => void
};

export const TodoInfo: React.FC<Props> = ({ todo, isLoading, onError }) => {
  return (
    <div className={classNames(
      'todo',
      { completed: todo.completed },
    )}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span
        className="todo__title"
        onDoubleClick={() => onError(Error.UPDATE)}
      >
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        onClick={() => onError(Error.DELETE)}
      >
        ×
      </button>

      <div className={classNames(
        'modal overlay',
        { 'is-active': isLoading },
      )}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
