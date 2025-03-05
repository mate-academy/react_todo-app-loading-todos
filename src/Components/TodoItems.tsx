import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type ExtendedTodo = Todo & {
  pendingToggle?: boolean;
  pendingDelete?: boolean;
};

type TodoItemProps = {
  todo: ExtendedTodo;
  onDelete: (id: Todo['id']) => void;
  onToggle: (id: number) => void;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggle,
}) => {
  const { id, title, completed } = todo;
  const isPending = id < 0 || todo.pendingDelete || todo.pendingToggle;

  return (
    <div data-cy="Todo" className={classNames('todo', { completed })}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-checkbox-${id}`}>
        <input
          id={`todo-checkbox-${id}`} // Ensures proper association
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onToggle(id)}
          disabled={isPending}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => onDelete(id)}
        disabled={isPending}
      >
        {/* Button without text */}
      </button>
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isPending })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
