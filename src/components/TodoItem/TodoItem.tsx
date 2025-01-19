/* eslint-disable jsx-a11y/label-has-associated-control */
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import React from 'react';

type Props = {
  todo: Todo;
  onDelete: (todoId: number) => void;
  isTodoLoading: boolean;
  isTodoDeleting: boolean;
  isProcessed: boolean;
};

export const TodoItem: React.FC<Props> = props => {
  const { todo, onDelete, isTodoLoading, isTodoDeleting, isProcessed } = props;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: todo.completed })}
      key={todo.id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onClick={() => {}}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}:{todo.id}
      </span>
      {!isTodoDeleting && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          disabled={isTodoLoading || isProcessed}
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}
      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', { 'is-active': isTodoLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
