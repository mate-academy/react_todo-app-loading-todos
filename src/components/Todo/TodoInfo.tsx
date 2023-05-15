import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';

interface Props{
  todo: Todo;
}

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const [isHovered, setHover] = useState(false);

  return (
    <div
      className={cn('todo', { completed: todo.completed })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
        />
      </label>

      <span className="todo__title">{todo.title}</span>
      {isHovered && (
        <button type="button" className="todo__remove">
          ×
        </button>
      )}

      <div className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
