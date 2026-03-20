/* eslint-disable @typescript-eslint/indent */
/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo & { loading?: boolean; editing?: boolean };
  handleToggleTodo: (todo: Todo) => void;
  handleDeleteTodo: (id: number) => void;
  handleStartEditing: (id: number) => void;
  handleSubmitRename: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  handleBlurRename: (e: React.FocusEvent<HTMLInputElement>, id: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, id: number) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  handleToggleTodo,
  handleDeleteTodo,
  handleStartEditing,
  handleSubmitRename,
  handleBlurRename,
  handleKeyDown,
}) => {
  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleToggleTodo(todo)}
        />
      </label>

      {todo.editing ? (
        <form onSubmit={e => handleSubmitRename(e, todo.id)}>
          <input
            name="title"
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            defaultValue={todo.title}
            autoFocus
            onBlur={e => handleBlurRename(e, todo.id)}
            onKeyDown={e => handleKeyDown(e, todo.id)}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => handleStartEditing(todo.id)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDeleteTodo(todo.id)}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay ${todo.loading ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
