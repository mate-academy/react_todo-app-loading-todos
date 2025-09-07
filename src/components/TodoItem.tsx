/* eslint-disable jsx-a11y/label-has-associated-control */

import classNames from 'classnames';
import React, { useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const [editTodoId, setEditTodoId] = useState(0);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (todoId: number) => {
    setEditTodoId(todoId);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { 'todo completed': todo.completed })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onBlur={() => setEditTodoId(0)}
          autoFocus
        />
      </label>

      {todo.id === editTodoId ? (
        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={e => setEditTitle(e.target.value)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleEdit(todo.id)}
          >
            {todo.title}
          </span>

          <button type="button" className="todo__remove" data-cy="TodoDelete">
            ×
          </button>
        </>
      )}

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className={classNames('modal overlay')}>
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
