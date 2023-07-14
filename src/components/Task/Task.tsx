import React from 'react';
import cn from 'classnames';

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo
  editing?: boolean
  loading?: boolean
};

const Task: React.FC<Props> = React.memo(({
  todo,
  editing = false,
  loading = false,
}) => {
  return (
    <div className={cn('todo', { completed: todo.completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          defaultChecked={todo.completed}
        />
      </label>

      {editing ? (
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
          <span className="todo__title">{todo.title}</span>
          <button type="button" className="todo__remove">×</button>
        </>
      )}

      <div className={cn('modal overlay', {
        'is-active': loading,
      })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});

export { Task };
