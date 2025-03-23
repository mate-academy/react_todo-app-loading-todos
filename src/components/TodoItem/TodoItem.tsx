/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { completed, title } = todo;
  const [completedTodo, setCompletedTodo] = useState(completed);
  const [titleTodo, setTitleTodo] = useState(title);
  const [editing, setEditing] = useState(false);
  const updating = false;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completedTodo })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          onChange={() => {
            setCompletedTodo(!completedTodo);
          }}
          className="todo__status"
          checked={completedTodo}
        />
      </label>

      {editing ? (
        <form>
          <input
            id="title"
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={titleTodo}
            onChange={e => setTitleTodo(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => setEditing(true)}
          >
            {title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': updating })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
