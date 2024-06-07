import cn from 'classnames';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
  todoLoading: boolean;
};

export const TodoItem: React.FC<Props> = ({
  todo: { title, completed },
  todoLoading,
}) => {
  return (
    <div data-cy="Todo" className={cn('todo', { completed: completed })}>
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
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

      <div
        data-cy="TodoLoader"
        className={cn('modal overlay', { 'is-active': todoLoading })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
