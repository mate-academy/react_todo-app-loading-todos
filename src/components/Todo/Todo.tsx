/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { deleteTodo } from '../../api/todos';

type Props = {
  todo: Todo;
  toggleStatus: (value: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, toggleStatus }) => {
  const { id, title, completed } = todo;

  const buttonHandler = (todoId: number) => {
    deleteTodo(todoId);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames({
        todo: true,
        completed: completed,
      })}
      data-id={id}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {
            toggleStatus(id);
          }}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => {
          buttonHandler(id);
        }}
      >
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
