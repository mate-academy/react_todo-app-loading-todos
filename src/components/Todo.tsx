/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useState } from 'react';
import { TodoData } from '../types/Todo';

interface TodoFieldProps {
  todo: TodoData
}

export const Todo = ({ todo }: TodoFieldProps) => {
  const { completed, title } = todo;
  const [editTodo, setEditTodo] = useState(false);

  return (
    <>
      <div className={classNames('todo', { completed })}>
        <label className="todo__status-label">
          <input type="checkbox" className="todo__status" checked />
        </label>
        {editTodo ? (
          <form>
            <input
              type="text"
              className="todo__title-field"
              placeholder="Empty todo will be deleted"
              value="Todo is being edited now"
            />
          </form>
        ) : (
          <span
            className="todo__title"
            onClick={() => setEditTodo(true)}
          >
            {title}

          </span>
        )}

        <button type="button" className="todo__remove">×</button>
      </div>

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </>
  );
};
