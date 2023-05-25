import classNames from 'classnames';
import { useState } from 'react';

type TodoProps = {
  title: string;
  completed?: boolean;
  loading?: boolean;
};

type TodoStatus = 'idle' | 'edited';

export const Todo = ({ completed, title, loading }: TodoProps) => {
  const [status] = useState<TodoStatus>('idle');

  return (
    <div className={
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
        status === 'edited'
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
              <span className="todo__title">{ title }</span>
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
