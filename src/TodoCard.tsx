import { useState } from 'react';
import { Todo } from './types/Todo';

interface TodoCardProps {
  todo: Todo;
  key: number;
}

export const TodoCard = ({ todo, key }: TodoCardProps) => {
  const isCompleted = todo.completed === true;
  const [isShown, setIsShown] = useState(false);

  return (
    <div
      className={`todo ${isCompleted ? 'completed' : ''}`}
      key={key}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={!!isCompleted}
        />
      </label>

      <span
        className="todo__title"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        {todo.title}
      </span>

      {/* Remove button appears only on hover */}
      {isShown
        && (
          <button
            type="button"
            className="todo__remove"
          >
            ×
          </button>
        )}

      <form>
        <input
          type="text"
          className="todo__title-field"
        // placeholder="Empty todo will be deleted"
        // value="Todo is being edited now"
        />
      </form>

      {/* overlay will cover the todo while it is being updated */}
      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
