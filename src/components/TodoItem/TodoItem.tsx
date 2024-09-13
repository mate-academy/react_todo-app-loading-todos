import React from 'react';

import { Todo } from '../../types/Todo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
  updateTodo: (updatedTodo: Todo) => void;
  deleteTodo: (todoId: number) => void;
};

export const TodoItem: React.FC<Props> = ({ todo, updateTodo, deleteTodo }) => {
  const { title, completed, id } = todo;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed: completed })}
    >
      <label className="todo__status-label" htmlFor={`${id}`}>
        <input
          id={`${id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          onClick={() => updateTodo({ ...todo, completed: !completed })}
          defaultChecked={completed}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>

      {/* Remove button appears only on hover */}
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => deleteTodo(id)}
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
