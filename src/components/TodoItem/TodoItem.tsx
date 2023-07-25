/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Todo } from '../../services/types';

interface Props {
  todo: Todo,
}

export const TodoItem: React.FC<Props> = ({
  todo,
}) => (
  <div
    className={cn('todo', {
      completed: todo.completed,
    })}
  >

    <label className="todo__status-label">
      <input
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        onChange={() => {}}
      />
    </label>

    <span
      className="todo__title"
    >
      {todo.title}
    </span>

    <button
      type="button"
      className="todo__remove"
    >
      ×
    </button>

    <div
      className="modal overlay"
    >
      <div
        className="modal-background has-background-white-ter"
      />
      <div className="loader" />
    </div>
  </div>
);
