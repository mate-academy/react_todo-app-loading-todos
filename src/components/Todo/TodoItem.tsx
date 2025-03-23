/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  showErrorMessage: (message: string, delay?: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, showErrorMessage }) => {
  const [isLoading] = useState(false);
  const [isEditing] = useState(false);

  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handlerDelete = () => {
    showErrorMessage('Unable to delete a todo');
  };

  const handlerEdit = () => {
    showErrorMessage('Unable to update a todo');
  };

  const handlerCompleteToggle = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: isCompleted })}
    >
      {!isEditing && (
        <>
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              defaultChecked={isCompleted}
              onClick={handlerCompleteToggle}
            />
          </label>

          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={handlerEdit}
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={handlerDelete}
            data-cy="TodoDelete"
          >
            ×
          </button>
        </>
      )}

      {isEditing && (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
