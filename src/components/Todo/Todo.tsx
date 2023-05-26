import classNames from 'classnames';
import { useState } from 'react';
import { TodoType } from '../../types/Todo';

type TodoProps = {
  todo: TodoType;
  loading?: boolean;
};

export const Todo = ({ todo: { completed, title }, loading }: TodoProps) => {
  const [editing] = useState(false);

  return (
    <div
      className={
        classNames('todo', { completed })
      }
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {
        editing
          ? (
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>
          ) : (
            <>
              <span
                className="todo__title"
              >
                { title }
              </span>
              <button type="button" className="todo__remove">×</button>
            </>
          )
      }

      <div className={
        classNames('modal', 'overlay', { 'is-active': loading })
      }
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
