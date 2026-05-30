import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo as TodoType } from '../types/Todo';

interface TodoProps {
  todo: TodoType;
}

export const Todo: React.FC<TodoProps> = ({ todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const inputId = `todo-${todo.id}`;

  const handleDelete = () => {
    setIsLoading(true);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <input
        id={inputId}
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        aria-labelledby={`todo-title-${todo.id}`}
        readOnly
      />

      <span
        id={`todo-title-${todo.id}`}
        data-cy="TodoTitle"
        className="todo__title"
      >
        {todo.title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={handleDelete}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
