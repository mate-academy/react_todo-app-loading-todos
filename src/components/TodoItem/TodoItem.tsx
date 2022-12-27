import React from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setShowError: (val: Errors) => void
};

export const TodoItem: React.FC<Props> = ({
  todo,
  setShowError,
}) => {
  return (
    <>
      <div
        data-cy="Todo"
        className={todo.completed ? 'todo completed' : 'todo'}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            defaultChecked
          />
        </label>

        <span
          data-cy="TodoTitle"
          className="todo__title"
          onDoubleClick={() => setShowError(Errors.Update)}
        >
          {todo.title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
          onClick={() => setShowError(Errors.Delete)}
        >
          ×
        </button>

        <div data-cy="TodoLoader" className="modal overlay">
          <div
            className="modal-background has-background-white-ter"
          />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
