import React from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  // for later parts; default false keeps tests happy now
  loading?: boolean;
  disableActions?: boolean;
  onToggle?: (t: Todo) => void;
  onDelete?: (t: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  loading = false,
  disableActions = true, // part 1: actions disabled
}) => {
  const statusId = `todo-status-${todo.id}`;

  return (
    <li className={cn('todo', { completed: todo.completed })} data-cy="Todo">
      {/* Status (checkbox) */}
      <label className="todo__status-label" htmlFor={statusId}>
        <input
          id={statusId}
          type="checkbox"
          className="todo__status"
          data-cy="TodoStatus"
          checked={todo.completed}
          readOnly
          // in parts 2–3 you’ll enable and call onToggle?.(todo)
          disabled={disableActions}
        />
        <span className="visually-hidden">
          Mark todo as {todo.completed ? 'incomplete' : 'complete'}
        </span>
      </label>

      {/* Title */}
      <span className="todo__title" data-cy="TodoTitle">
        {todo.title}
      </span>

      {/* Delete button */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        aria-label="Delete todo"
        disabled={disableActions}
        // onClick={() => onDelete?.(todo)}
      />

      {/* Loader placeholder — must always exist */}
      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': loading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </li>
  );
};
