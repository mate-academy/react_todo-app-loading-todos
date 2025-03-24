/* eslint-disable jsx-a11y/label-has-associated-control */

import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem = ({ todo }: Props) => {
  const { title, completed } = todo;

  return (
    <div data-cy="Todo" className={`todo ${completed ? 'completed' : ''}`}>
      <label className="todo__status-label" htmlFor="status">
        <input
          id="status"
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
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
  );
};
