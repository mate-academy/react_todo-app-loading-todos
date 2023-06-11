import React, { useContext, memo } from 'react';
import classNames from 'classnames';
import { TodoAppContext } from '../../TodoAppContext';

type Props = {
  id: number;
  title: string;
  completed: boolean,
};

export const TodoItem: React.FC<Props> = memo(({ id, title, completed }) => {
  const { loading } = useContext(TodoAppContext);

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed,
      })}
      key={id}
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
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDeleteButton"
      >
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay">
        <div
          className="modal-background has-background-white-ter"
        />
        {loading && <div className="loader" />}
      </div>
    </div>
  );
});
