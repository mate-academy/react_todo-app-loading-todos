import { Todo } from '../types/Todo';
import cn from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const { title, completed } = todo;

  return (
    <div
      data-cy="Todo"
      // eslint-disable-next-line prettier/prettier
      className={cn('todo', { 'completed': completed })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
        {/* <div className="modal-background has-background-white-ter" /> */}
        <div className="loader" />
      </div>
    </div>
  );
};
