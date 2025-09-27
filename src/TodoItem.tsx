import React from 'react';
import { Todo } from './types/Todo';

type Props = {
  todo: Todo;
  // onDelete: (todoId: number) => void;
  // loading: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const handleDelete = () => {
    console.log(`Delete clicked for todo ID: ${todo.id}`);
  };

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          readOnly
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
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

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
