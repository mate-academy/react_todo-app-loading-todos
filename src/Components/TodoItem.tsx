import { Todo } from '../types/Todo';
import cn from 'classnames';

type Props = {
  todo: Todo;
  handleCompleted: (id: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, handleCompleted }) => {
  const { completed, id, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={cn('todo', {
        completed,
      })}
    >
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed === true}
          onChange={() => handleCompleted(id)}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      {/* overlay will cover the todo while it is being deleted or updated */}
      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
