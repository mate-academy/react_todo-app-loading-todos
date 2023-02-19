import React, { useState } from 'react';
import classNames from 'classnames';

import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const { title, completed } = todo;
  const [editTodo] = useState(false);
  const [uploadTodo] = useState(false);

  return (
    <div
      className={classNames('todo', {
        completed,
      })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      {editTodo ? (
        <form>
          <input
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={todo.title}
          />
        </form>
      ) : (
        <>
          <span className="todo__title">
            {title}
          </span>

          <button type="button" className="todo__remove">
            {'\u00d7'}
          </button>
        </>
      )}

      <div
        className={classNames('modal', 'overlay', {
          'is-active': uploadTodo,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
