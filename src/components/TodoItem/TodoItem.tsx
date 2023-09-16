import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
};

export const TodoItem: React.FC<Props> = ({ todo, deleteTodo }) => {
  const { id, completed, title } = todo;

  return (
    <>
      <div className={classNames(
        'todo',
        { completed },
      )}
      >
        <label className="todo__status-label">
          <input
            type="checkbox"
            className="todo__status"
            checked={completed}
          />
        </label>

        <span className="todo__title">{title}</span>

        <button
          type="button"
          className="todo__remove"
          onClick={() => deleteTodo(id)}
        >
          ×
        </button>

        <div className="modal overlay">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      </div>
    </>
  );
};
