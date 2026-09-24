import React from 'react';
import cn from 'classnames';

import { Todo as TodoType } from '../../types/Todo';

type Props = {
  todo: TodoType;
  edit: number | null;
  editTitle: string;
  toggleTodo: (todo: TodoType) => void;
  loadingTodoId: number | null;
  loadingClear: boolean;
  handleEdit: (todo: TodoType) => void;
  setEditTitle: (value: string) => void;
  handleEditClick: (todo: TodoType) => void;
  handleDelete: (todo: TodoType) => void;
};

export const Todo: React.FC<Props> = ({
  todo,
  edit,
  editTitle,
  toggleTodo,
  loadingTodoId,
  loadingClear,
  handleEdit,
  setEditTitle,
  handleEditClick,
  handleDelete,
}) => {
  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: todo.completed,
      })}
    >
      <div className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => toggleTodo(todo)}
          disabled={loadingTodoId !== null || loadingClear}
        />
      </div>
      {edit === todo.id ? (
        <form
          onSubmit={event => {
            event.preventDefault();
            handleEdit(todo);
          }}
        >
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={editTitle}
            onChange={event => setEditTitle(event.target.value)}
            disabled={loadingTodoId === todo.id}
            autoFocus
          />
        </form>
      ) : (
        <>
          <span
            onClick={() => handleEditClick(todo)}
            data-cy="TodoTitle"
            className="todo__title"
          >
            {todo.title}
          </span>
          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => handleDelete(todo)}
            disabled={loadingTodoId !== null || loadingClear}
          >
            ×
          </button>
        </>
      )}

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': loadingTodoId === todo.id,
        })}
      >
        <div className={'modal-background ' + 'has-background-white-ter'} />
        <div className="loader" />
      </div>
    </div>
  );
};
