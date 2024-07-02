/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div data-cy="Todo" className={cn('todo', { completed: todo.completed })}>
      <label htmlFor={`todoCheckbox-${todo.id}`} className="todo__status-label">
        <input
          id={`todoCheckbox-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {todo.title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
