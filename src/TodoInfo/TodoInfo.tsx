import cn from 'classnames';
import { memo } from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = memo(({ todo }) => {
  const { title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed: completed === true,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
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
});
