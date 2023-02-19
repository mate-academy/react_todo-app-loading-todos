import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const { title, completed } = todo;

  return (
    <div className={cn('todo', { completed })}>
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      <span className="todo__title">
        {title}
      </span>

      {/* This form is shown instead of the title and remove button */}
      {/* <form>
        <input
          type="text"
          className="todo__title-field"
          placeholder="Empty todo will be deleted"
          value="Todo is being edited now"
        />
      </form> */}

      <button type="button" className="todo__remove">×</button>

      {/* overlay will cover the todo while it is being updated */}
      {/* 'is-active' class puts this modal on top of the todo - next str below */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
