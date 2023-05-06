import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { Error } from '../../types/Error';

type Props = {
  todo: Todo,
  onChangeIsError: (e: Error) => void
};

export const TodoInfo: React.FC<Props> = ({ todo, onChangeIsError }) => {
  const deleteTodoHandler = () => {
    onChangeIsError(Error.DELETE);
  };

  const handleTodoUpdate = () => {
    onChangeIsError(Error.UPDATE);
  };

  return (
    <div
      className={classNames(
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
        onDoubleClick={() => handleTodoUpdate()}
      >
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        onClick={() => deleteTodoHandler()}
      >
        ×
      </button>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
