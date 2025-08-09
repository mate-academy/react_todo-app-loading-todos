import React from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, onToggle }) => {
  return (
    <>
      {/* This is a completed todo */}
      <div
        data-cy="Todo"
        className={classNames('todo', { completed: todo.completed })}
      >
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
          />
        </label>

        <span data-cy="TodoTitle" className="todo__title">
          {todo.title}
        </span>

        {/* Remove button appears only on hover */}
        <button type="button" className="todo__remove" data-cy="TodoDelete">
          ×
        </button>

        {/* overlay will cover the todo while it is being deleted or updated */}
        <div data-cy="TodoLoader" className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
