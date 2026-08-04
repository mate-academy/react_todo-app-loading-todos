import classNames from 'classnames';
import type { FC } from 'react';
import type { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoItem: FC<Props> = ({ todo }) => (
  <div
    data-cy="Todo"
    className={classNames('todo', {
      completed: todo.completed,
    })}
  >
    <div className="todo__status-label">
      <input
        data-cy="TodoStatus"
        type="checkbox"
        className="todo__status"
        checked={todo.completed}
        aria-label={`Todo status: ${todo.title}`}
        readOnly
      />
    </div>

    <span data-cy="TodoTitle" className="todo__title">
      {todo.title}
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
