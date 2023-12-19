import cn from 'classnames';
import { memo } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = memo(({ todo }) => {
  const { title, id, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: !completed,
      })}
      key={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
});
