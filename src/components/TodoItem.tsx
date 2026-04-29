import React from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  isTemp: boolean;
  isLoading: boolean;
  onDelete: (id: number) => void;
  onToggle: (todo: Todo) => void;
};

export const TodoItem: React.FC<Props> = ({
  todo,
  isTemp,
  isLoading,
  onDelete,
  onToggle,
}) => (
  <div
    data-cy="Todo"
    className={classNames('todo', {
      completed: todo.completed,
    })}
  >
    <input
      data-cy="TodoStatus"
      type="checkbox"
      className="todo__status"
      checked={todo.completed}
      onChange={() => onToggle(todo)}
      disabled={isLoading}
    />

    <span data-cy="TodoTitle">{todo.title}</span>

    <button
      data-cy="TodoDelete"
      className="todo__remove"
      onClick={() => onDelete(todo.id)}
      disabled={isLoading}
    >
      ×
    </button>

    <div
      data-cy="TodoLoader"
      className={classNames('modal overlay', {
        'is-active': isTemp || isLoading,
      })}
    >
      <div className="modal-background" />
      <div className="loader" />
    </div>
  </div>
);
