import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodos } from '../../api/todos';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isEditing] = useState(false);
  const [isLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const onDeleteHandler = () => {
    deleteTodos(todo.id);
  };

  return (
    <div
      className={classNames(
        'todo',
        { completed: todo.completed },
      )}
      key={todo.id}
      data-cy="Todo"
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={isCompleted}
          onChange={() => setIsCompleted(!isCompleted)}
        />
      </label>

      {!isEditing
        ? (
          <>
            <span
              className="todo__title"
              data-cy="TodoTitle"
            >
              {isLoading
                ? 'Todo is being saved now'
                : todo.title}
            </span>

            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={onDeleteHandler}
            >
              ×
            </button>
          </>
        )
        : (
          <form>
            <input
              type="text"
              className="todo__title-field"
              data-cy="TodoTitleField"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>
        )}

      {/* overlay will cover the todo while it is being updated */}

      <div
        data-cy="TodoLoader"
        className={classNames(
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
