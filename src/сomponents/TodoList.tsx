import React from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDelete: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  onToggleTodo,
  onDelete,
}) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos.map(({ id, title, completed }) => (
        <li key={id} data-cy="Todo" className={cn('todo', { completed })}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="todo__status-label">
            <input
              data-cy="TodoStatus"
              type="checkbox"
              className="todo__status"
              checked={completed}
              onChange={() => onToggleTodo(id)}
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
            onClick={() => onDelete(id)}
          >
            ×
          </button>

          {/* overlay will cover the todo while it is being deleted or updated */}
          <div data-cy="TodoLoader" className="modal overlay">
            <div className="modal-background has-background-white-ter" />
            <div className="loader" />
          </div>
        </li>
      ))}
    </ul>
  );
};
