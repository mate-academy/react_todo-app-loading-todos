/* eslint-disable quote-props */
import classNames from 'classnames';
import { Todo } from '../../types';

type Props = {
  todo: Todo,
};

export const TodoItem = ({ todo } : Props) => {
  const { completed, title } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        'completed': completed,
      })}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className={classNames('todo__status', {
            'checked': completed,
          })}
          checked={completed}
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
};
