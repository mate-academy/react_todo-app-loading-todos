import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInList: React.FC<Props> = React.memo(({
  todo,
}) => {
  return (
    <>
      <div className={cn('todo', { completed: todo.completed })}>
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
          />
        </label>

        <span
          className="todo__title"
        >
          {todo.title}
        </span>

        <button
          className="todo__remove"
          type="button"
        >
          x
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
});
