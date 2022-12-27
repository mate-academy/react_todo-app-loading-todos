import React from 'react';
import { Errors } from '../../types/Errors';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  setShowError: (str: string) => void
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
          onDoubleClick={(e) => {
            e.preventDefault();
            setShowError(Errors.Update);
          }}
        >
          {todo.title}
        </span>

        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDeleteButton"
          onClick={() => setShowError('delete')}
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
