/* eslint-disable no-console */
import React, { useState } from 'react';
import classNames from 'classnames';
import { TodoType } from '../../types/TodoType';

type Props = {
  todo: TodoType;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const [isEdited, setEdit] = useState(false);

  const handleDblClick = () => {
    setEdit(true);
    console.log('was Clicked');
  };

  return (
    <>
      {isEdited ? (
        <div className="todo">
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
            />
          </label>

          {/* This form is shown instead of the title and remove button */}
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value={todo.title}
            />
          </form>

          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      ) : (
        <div
          className={classNames(
            'todo',
            { completed: todo.completed },
          )}
          onDoubleClick={handleDblClick}
        >
          <label className="todo__status-label">
            <input
              type="checkbox"
              className="todo__status"
              defaultChecked={todo.completed}
            />
          </label>

          <span className="todo__title">{todo.title}</span>

          {/* Remove button appears only on hover */}
          <button type="button" className="todo__remove">×</button>

          {/* overlay will cover the todo while it is being updated */}
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </>
  );
};
