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
          <button type="button" className="todo__remove">×</button>
          <div className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </div>
      )}
    </>
  );
};
