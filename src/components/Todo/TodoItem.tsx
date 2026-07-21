import cn from 'classnames';
import React from 'react';
import { Todo, TodoId } from '../../types/Todo';

interface Props {
  todo: Todo;
  isDeleting: boolean;
  onDelete: (todoId: TodoId) => Promise<void>;
}

export const TodoItem: React.FC<Props> = ({ todo, isDeleting, onDelete }) => {
  const { completed, id, title } = todo;

  return (
    <li
      data-cy="Todo"
      className={cn('todo', {
        completed: completed,
      })}
    >
      <label className="todo__status-label" htmlFor={`${id}`}>
        <span className="is-sr-only">
          {completed ? 'Mark as incomplete' : 'Mark as complete'}
        </span>
        <input
          id={`${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          onDelete(id);
        }}
      >
        ×
      </button>
      {/* overlay will cover the todo while it is being deleted or updated */}
      {/* "modal overlay" */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', {
          'is-active': isDeleting,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
