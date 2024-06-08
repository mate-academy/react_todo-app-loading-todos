import React from 'react';
import { Todo } from '../types/Todo';

export const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => (
  <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor={`todo-${todo.id}`} className="todo__status-label">
      <input
        id={`todo-${todo.id}`}
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
